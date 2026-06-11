// Ensure the `autocorrect-node` native binding is loadable so `pnpm lint`/`fix`
// (the `autocorrect` CLI) and prettier-plugin-autocorrect work on this machine.
// Upstream publishes prebuilt binaries for win32-x64, darwin-x64/arm64 and
// linux-x64 (gnu/musl) only — on linux-arm64 the install lands with no binding
// at all. The napi-rs loader, however, prefers a *local* `autocorrect-node.
// <triple>.node` file inside the package directory over the per-platform npm
// sub-packages, so this prestep repairs the install by dropping one in:
//
//   1. If `require("autocorrect-node")` already works, exit silently — every
//      platform with an upstream binary (CI, Vercel, macOS) takes this path.
//   2. Otherwise copy a previously built binding from the per-version cache
//      (~/.cache/autocorrect-node/<version>/) into the package directory.
//   3. On a cache miss, build it from the pinned upstream tag with the local
//      Rust toolchain (`napi build`), then cache + install it.
//
// Fail-open by design (exit 0 with a warning): a machine without cargo or
// network still installs fine — only `autocorrect`/prettier will error later,
// at which point the warning explains why. Idempotent: after one successful
// build the cache makes every reinstall a copy. Delete the postinstall hook
// once upstream ships linux-arm64 binaries (https://github.com/huacnlee/autocorrect).
//
// Dataflow: the clone URL is a fixed constant, all child processes use argv
// arrays (no shell), and nothing written here is attacker-influenced beyond
// the upstream repo itself — which is already this dependency's supply chain.
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const UPSTREAM = "https://github.com/huacnlee/autocorrect";

/** The binding loads in a clean child process (the parent's failed-load state
 *  can't linger there), so this is the one source of truth for "is it fixed". */
function bindingLoads() {
  try {
    execFileSync(process.execPath, ["-e", 'require("autocorrect-node")'], {
      cwd: projectRoot,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function installFromDir(srcDir, pkgDir) {
  const nodeFiles = existsSync(srcDir)
    ? readdirSync(srcDir).filter((f) => f.endsWith(".node"))
    : [];
  for (const f of nodeFiles) copyFileSync(join(srcDir, f), join(pkgDir, f));
  return nodeFiles.length > 0;
}

if (bindingLoads()) process.exit(0);

const pkgDir = dirname(require.resolve("autocorrect-node/package.json"));
const { version } = require("autocorrect-node/package.json");
const cacheDir = join(homedir(), ".cache", "autocorrect-node", version);

// Fast path: a binding built on a previous install is cached for this version.
if (installFromDir(cacheDir, pkgDir) && bindingLoads()) {
  console.log(`✓ autocorrect-node ${version}: restored native binding from cache`);
  process.exit(0);
}

// Slow path: build from source. Requires cargo + git + network; ~30s once.
let buildDir;
try {
  execFileSync("cargo", ["--version"], { stdio: "ignore" });
  buildDir = await mkdtemp(join(tmpdir(), "autocorrect-build-"));
  execFileSync(
    "git",
    ["clone", "--quiet", "--depth", "1", "--branch", `v${version}`, UPSTREAM, buildDir],
    {
      stdio: "inherit",
    },
  );
  const crateDir = join(buildDir, "autocorrect-node");
  // `--platform` names the artifact after the host triple — the same name the
  // napi loader looks for — so no triple detection is needed here.
  execFileSync("npx", ["-y", "@napi-rs/cli@2", "build", "--platform", "--release"], {
    cwd: crateDir,
    stdio: "inherit",
  });
  for (const f of readdirSync(crateDir).filter((f) => f.endsWith(".node"))) {
    try {
      execFileSync("strip", [join(crateDir, f)], { stdio: "ignore" });
    } catch {
      // unstripped is fine, just bigger
    }
    mkdirSync(cacheDir, { recursive: true });
    copyFileSync(join(crateDir, f), join(cacheDir, f));
    copyFileSync(join(crateDir, f), join(pkgDir, f));
  }
  if (!bindingLoads()) throw new Error("built binding still fails to load");
  console.log(`✓ autocorrect-node ${version}: built native binding from source (cached for reuse)`);
} catch (err) {
  const reason = err instanceof Error ? err.message : String(err);
  console.warn(
    `⚠ autocorrect-node has no prebuilt binding for ${process.platform}-${process.arch} and ` +
      `repairing it failed (${reason}); install continues, but \`autocorrect\` and ` +
      `prettier-plugin-autocorrect won't run until this is fixed (needs cargo, git and network)`,
  );
} finally {
  if (buildDir) await rm(buildDir, { recursive: true, force: true });
}
process.exit(0);
