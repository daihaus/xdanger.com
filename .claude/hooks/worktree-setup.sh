#!/usr/bin/env bash
# Install dependencies when a Claude Code session starts inside a git worktree.
# Fresh worktrees have no node_modules (it's gitignored), so deps must be linked
# before any work begins. Wired to the SessionStart hook in .claude/settings.json.
# Defensive: bails quietly so the hook never errors outside of a worktree.
set -uo pipefail

# SessionStart hooks receive a JSON payload on stdin; pull out the session cwd.
CWD=$(cat | jq -r '.cwd // empty' 2>/dev/null)

# Only act inside a worktree; do nothing for the main checkout.
case "$CWD" in
  */.claude/worktrees/*) ;;
  *) exit 0 ;;
esac

# Need pnpm available; bail quietly otherwise so the hook never errors.
command -v pnpm >/dev/null 2>&1 || exit 0
cd "$CWD" 2>/dev/null || exit 0

# Install against the committed lockfile so the worktree matches the repo state.
# Send pnpm's output to stderr so it reaches the user without polluting model context.
pnpm install --frozen-lockfile >&2
