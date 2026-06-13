---
name: note-craft
description: >-
  The canonical method for authoring or revising a published explainer NOTE for
  this site — the MDX notes under `_notes/**` (and `_posts/**`), and the
  `/note-from-issue` pipeline. Use it whenever you are researching a topic and
  writing it up as a standalone, teach-a-first-timer note, or reviewing note /
  article prose here. It is the deep-dive teaching method adapted for a
  non-interactive published artifact (prerequisites folded into prose, the note
  never asks the reader anything), with an investigative-journalism storytelling
  overlay for the parts that carry a real story, reader calibration for one
  known reader (first-time, curious, non-specialist, mobile-first), visualization
  via this repo's SVG / Canvas / React component stack, bilingual term &
  typography conventions, and hard fabrication / citation guardrails. Do NOT use
  it for live interactive teaching (that is the global `deep-dive` skill) or for
  quick factual lookups.
---

# Note-Craft — writing a published explainer note for xdanger.com

This skill turns a researched topic into a **published note**: a standalone, mobile-first explainer that
teaches a curious first-timer a real working model of the subject. It is the **deep-dive** teaching method
— prerequisite mapping, layered exposition, mechanism-accurate memory hooks, a "where to go next"
trailhead — re-pointed from a live tutoring session to a **finished artifact a stranger reads on their
phone**. Where the material genuinely carries a story (real people, the history of a discovery,
connecting several threads), a secondary **storytelling** layer applies the craft of explanatory /
investigative journalism — built from sources, with hard anti-fabrication guardrails.

> Scope: use this when drafting, structuring, or reviewing note / article prose for this repo
> (`_notes/**`, `_posts/**`, the `/note-from-issue` pipeline). For live, back-and-forth teaching in a
> chat, the global `deep-dive` skill is the right tool; for a one-line factual answer, neither is.

This file is the **single spec source** for note writing here — `REVIEW.md` §B reviews against it.

## Two things that make a note different from live teaching

The deep-dive method assumes a learner you can talk to. A note has neither a back-channel nor a known
prior level, so two rules override the live-teaching defaults everywhere below:

1. **Non-interactive.** The note never restates a prompt and **never asks the reader a question** to
   calibrate. There is no one to answer. Any prerequisite check is **folded into prose** and supplied on
   the spot (see §2). No "you've probably seen…", no Socratic quizzing, no rephrase-the-user opener.
2. **The repo, not the generic playbook, owns delivery.** Visualization, foreign-term handling, Chinese
   typography, and mobile-first layout follow this repo's design system + `AGENTS.md` (see §5, §6, and
   the self-check) — overriding the generic chat-environment guidance the deep-dive method ships with.
   Keep only the method's *judgment* principles (a visual must beat prose; one figure, one takeaway; a
   memory hook must share the real mechanism).

## The reader — model once, then write only the artifact

You write for **one** reader. Model them once; never put the modeling on the page.

```
first-time 科普 reader (published note)
Reads how: skims on mobile first; reads closely only if the opening earns it
Knows: smart and curious, but a first-time, non-specialist reader of this topic
Doesn't: the jargon, the prerequisites, why this matters to them — assume none of it
Cares about: "why should I care" and "will I actually understand this" — being let in, not impressed
Sensitive to: jargon dumps, undefined acronyms, being talked down to, walls of unbroken text, manufactured drama
Default register: clear and confident; one idea per sentence; warm but not chatty
Leave unsaid: the research journey, hedging, meta-notes (（已校正）/（待核实）), "hope this helps" closers
```

Two disciplines fall out of this card and apply to every section:

- **Ship only the finished artifact.** Omission is a craft tool, not a gap — cut the scaffolding the
  reader can infer (some cuts are load-bearing) and everything that betrays the writing process: no
  process meta-notes (`（已校正）`/`（补充）`/`（待核实）`), no visible research journey, no
  hedging-as-self-protection, no "hope this helps" / "let me know" closers.
- **Earn the next paragraph.** The reader is one thumb-swipe from leaving. The opening has to earn the
  read; each section has to earn the next. That is what the storytelling moves in §4 buy you — not
  decoration, but momentum.

## The method (deep-dive, written as a standalone note)

Treat these as **elements that must appear somewhere**, not a rigid template. Order and weight follow the
topic: a history note foregrounds the timeline; a mechanism note foregrounds how it works; a "why now"
note foregrounds the stakes. Use judgment.

### 1. Big picture — situate it (with the real people and history)

Open by placing the topic. Two or three sentences: **what family it belongs to**, **what problem it was
invented to solve**, and **who / when** — name the real people and the era. Historical context and the
human story (人物故事) make a concept stick, but never manufacture drama: mention the actual humans and
the actual moment, nothing invented. → When that human / historical story genuinely carries the topic,
narrate it with the craft in [references/storytelling.md](references/storytelling.md).

### 2. Prerequisites — folded into prose, never a question

Name the 2–5 concepts whose comfort level changes how the topic reads — then **supply them on the spot in
prose**, because a note can't ask. Fold the calibration into a short self-serve on-ramp, then continue.
Shape:

> 这部分默认你对 **A**、**B** 有点感觉；没有也不要紧，三句话补上：A 是 …；B 是 …；有这两点就够往下读了。

If the topic genuinely has no prerequisites, skip this — don't manufacture them.

### 3. Main exposition — three layers

Walk the concept in three layers, in this order:

- **Intuition** — the cleanest mental model in one sentence, then unpacked. No formalism yet.
  ("Backpropagation is just the chain rule applied to a computation graph, working right-to-left.")
- **Mechanism** — *how* it actually works, with enough detail that the reader could predict its behavior
  in a new situation. This is where formalism, equations, code, or the step-by-step process lives.
- **Edge / limits** — where it breaks, what it doesn't cover, and which next concept handles the gap.

### 4. Memory hooks — mechanism-accurate

Give at least one analogy, mnemonic, story, or concrete-number anchor that makes the core mechanism
stick. **A bad hook is worse than none** — verify the analogy shares the actual causal mechanism, not
just the visible outcome; if you have to caveat it in three places, find a better one. Pick the flavor
that fits the concept's shape:

- **Analogies** — for mechanisms with a familiar mechanical twin
- **Mnemonics / 口诀** — for ordered lists or named entities with no derivable order
- **Stories** — for processes that unfold over time. → When the story is real history or people, narrate
  it with the craft in [references/storytelling.md](references/storytelling.md).
- **Concrete numbers** — for scales that defy intuition

See [references/memory-hooks-patterns.md](references/memory-hooks-patterns.md) for worked examples, the
mechanism-accuracy test, and the common traps.

### 5. Visualization — build it from the repo's component stack

A visual must carry information **more efficiently than prose**: if a sentence does the job, don't draw.
**One figure, one takeaway.** When a visual does earn its place, build it as a real component following
this repo's contract — *not* as an ephemeral chat artifact. Pick the **lightest layer that does the job**
(JS cost rises down the list):

| Layer            | Where                                       | Use when                                                            |
| ---------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| **animated-SVG** | `src/components/viz/*.astro`                | Geometric / coordinate figures, limited element count. Zero JS.     |
| **Canvas + JS**  | `src/components/viz/*.astro` + `<script>`   | Many points / continuous curves / per-frame recompute.              |
| **React 19**     | `src/components/interactive/*.tsx`          | State linkage across inputs, chart libraries, deep component trees. |

Every visual must honor the repo contract — colors from role-based **design-system tokens** (never
hardcoded), dark mode via `data-theme`, `prefers-reduced-motion` at every animated layer, `role="img"` +
label / `<title>` / `<desc>`, wrapped in `not-prose`, and **mobile-first** (no horizontal overflow, large
touch targets, no hover-only interaction). The canonical spec is `AGENTS.md` → "Interactive component
layers" and the `/design-system` page; the living style guide is `_notes/2026/0605-interactive-notes.mdx`
plus `src/components/viz/*` and `src/components/interactive/*` — copy their patterns.

See [references/visualization-playbook.md](references/visualization-playbook.md) for the
layer-decision matrix, when a visual beats prose, and the anti-patterns.

### 6. Connect the dots

One short paragraph: what *adjacent* topics does this unlock or relate to, and where does it sit on the
broader map? Surface 2–4 neighbors so the reader sees what's nearby — the "I don't know what I don't
know" remedy. → When connecting the dots becomes a narrative that ties several threads into one picture,
narrate it with the craft in [references/storytelling.md](references/storytelling.md).

### 7. Trailhead — concrete next steps

End with two to four concrete, *checkable* next steps: a specific paper / chapter / post to **read**, a
small experiment or calculation to **try**, a known-good video / demo to **watch**. Every citation must
be real and retrievable — if you're unsure, say so. Don't pad.

## Storytelling — only where the material carries a real story

Most of a note is plain exposition. Reach for the storytelling layer **on a section, not the whole
piece**, and only when that part is genuinely story-shaped — a real human story, the historical arc of a
discovery, or a connect-the-dots that links several threads. Forcing a story onto a definitional
explainer or a how-to manufactures false stakes.

The one principle: **keep the journalism skeleton, swap the camera for the citation.** The grip comes
from the architecture of the explanation and from real disagreements between people and ideas — never
from invented atmosphere. Prefer the safe leads (a surprising sourced fact, an intuition-reframe, a real
conflict-of-ideas) and end on a genuine, attributed **open question the field itself hasn't answered**.

This layer has **hard guardrails** that double as the blocking review lines (see the self-check and
`REVIEW.md` §0): no invented scenes / sensory color / 五感白描, no reconstructed dialogue or inner
monologue, no composite "everyman" characters, no manufactured cliffhanger that withholds a known answer,
and total citation integrity. The full palette, structural templates, sourcing tiers, and the
publish-blocking self-audit live in [references/storytelling.md](references/storytelling.md).

## Bilingual prose & terminology

Notes are bilingual (Chinese narrative, English for technical terms and proper nouns). Default to Chinese
for explanation; switch to English for terms, quotes, and proper nouns. Mixing within a paragraph is
fine and natural.

- **Proper nouns stay in their native form.** Products / brands / people / tech keep their English
  (GitHub, Astro, oklch) — don't force-translate. Two exceptions: ① Chinese-native companies / orgs stay
  Chinese with English in parens on first mention — `台积电（TSMC）`, `联发科（MediaTek）`; ② people with
  an established Chinese transliteration stay Chinese (马斯克, 库克).
- **First-mention term pairing.** Give both languages the first time a technical term appears —
  `反向传播 (backpropagation)`; subsequent mentions can use either. Gloss an acronym once: `CNN
  (convolutional neural network, 卷积神经网络)`.
- **Gloss unfamiliar English in reading order.** When an English word a reader might not know first
  appears — including in a visual's caption — append a short Chinese gloss there, e.g.
  `throughput（吞吐量）`. Gloss at the **earliest** appearance, not a later one; don't re-gloss; skip
  words already common in Chinese tech-speak.
- **Don't nest same-width parentheses.** Avoid `（…（…）…）`. Inside a full-width-paren context, use a
  parallel form (`联电 UMC`) or a dash instead.
- **Never translate** code, math symbols, file paths, library / function names.

See [references/bilingual-conventions.md](references/bilingual-conventions.md) for the full format rules
and worked examples.

## What to cut

A note built this way runs long. Keep it from sprawling — ruthlessly cut:

- Any restatement of the topic prompt or the issue it came from
- Hedging and throat-clearing ("this is a great question", "as you may know")
- The same point restated two ways for emphasis
- Process meta-notes and visible research journey (`（已校正）` / `（待核实）` / `（补充）`)
- "Hope this helps! Let me know…" closers
- Markdown overhead that adds no structure (don't bold every other word; don't bullet single sentences)
- Heading nesting deeper than H3 — use H2 for the note's main sections, H3 only for clearly separable
  subsections

## Self-check before opening the PR

This list mirrors `REVIEW.md` §0/§B — the same bar a reviewer will apply. A **blocking** hit must be
fixed before merge.

**Blocking**

- **Citation integrity.** Every fact, number, and quote traces to a real, retrievable source actually
  consulted — no invented or guessed DOIs, dates, authors, titles, or statistics. Quotes are verbatim; a
  translated quote keeps the original-language text alongside. Every body figure maps to a source (a
  来源/Methods entry or inline citation) — no orphans.
- **No fabricated narrative.** No invented scenes / sensory color / 五感白描 over unsourced detail; no
  reconstructed dialogue or inner monologue; no composite "everyman" characters; no manufactured
  cliffhanger withholding a known answer. Drama comes from real sourced facts and real disagreements.

**Meaningful**

- **Structure** present and in standalone form: situated big picture (with real people/history) →
  prerequisites folded into prose (never a question) → intuition → mechanism → edge/limits → ≥1
  mechanism-accurate memory hook → visualization only where it beats prose (one figure, one takeaway) →
  connect-the-dots → trailhead of concrete next steps.
- **Sourcing depth.** Tier evidence (peer-reviewed > preprint > reputable outlet > press release); prefer
  reviews / meta-analyses for "consensus" claims; flag preliminary / single-study / industry-funded
  claims; when sources conflict, report the spread and attribute each side; for any scale comparison,
  show the arithmetic and sanity-check the order of magnitude.
- **Reader calibration.** No jargon dumps, no undefined acronyms, no talking down, no walls of unbroken
  text, no manufactured drama. A clean finished artifact — no process meta-notes, no visible research
  journey, no closers.
- **Bilingual / terminology & typography.** Per the rules above; plus space between CJK and ASCII /
  numbers (except before `°`/`%`), full-width punctuation in Chinese paragraphs and half-width in
  English. Respect AutoCorrect's fixes.
- **Delivery.** Visuals follow the repo's design-system / theme / a11y / motion contract — role-based
  color tokens only (no hardcoded color), Canvas reads only literal-oklch tokens — and are mobile-first
  (no horizontal overflow, large touch targets, no hover-only); frontmatter valid (`title` ≤ 60,
  `publishDate` ISO-8601 with offset) and the filename → URL convention holds; `pnpm build:site` passes.

## Reference files

- [references/storytelling.md](references/storytelling.md) — the narrative-craft layer for story-shaped
  parts (人物 / 历史 / connect-the-dots): investigative / explanatory-journalism moves for a writer
  working from sources, with the publish-blocking fabrication guardrails.
- [references/memory-hooks-patterns.md](references/memory-hooks-patterns.md) — analogies, mnemonics,
  stories, numbers: when to use which, the mechanism-accuracy test, and the common traps.
- [references/visualization-playbook.md](references/visualization-playbook.md) — choosing among the
  repo's SVG / Canvas / React layers, when a visual beats prose, the design-system / a11y / motion
  contract, and the anti-patterns.
- [references/bilingual-conventions.md](references/bilingual-conventions.md) — Chinese / English term
  pairing, glossing, proper-noun handling, and typography format rules.
