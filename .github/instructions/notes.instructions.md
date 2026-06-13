---
applyTo: "_notes/**,_posts/**"
---

# Note / article review (Copilot)

These files are bilingual (Chinese + English) science-popularization notes. Review writing quality, not
just code. Full criteria: `/REVIEW.md` §B (keep in sync). A note should teach a first-time,
curious-but-unfamiliar reader.

## Blocking

- **Citation integrity.** Every fact, number, and quote traces to a real, retrievable source. No
  invented/guessed DOIs, dates, authors, study titles, or statistics. Quotes verbatim; a translated
  quote keeps the original-language text alongside. Every body figure → a source (no orphans).
- **No fabricated narrative.** No invented scenes, sensory color, or 五感白描 over unsourced detail; no
  reconstructed dialogue or inner monologue; no composite / "everyman" characters; no manufactured
  cliffhanger that withholds a known answer. Drama from real sourced facts, not invented atmosphere.

## Meaningful (P2)

- **Deep-dive structure** (standalone, non-interactive): situate the topic incl. real people/history →
  prerequisites folded into prose (never ask the reader) → intuition → mechanism → edge/limits → at
  least one **mechanism-accurate** memory hook (shares the real mechanism, not just the outcome) →
  visualization only where it beats prose (one figure = one takeaway) → connect-the-dots → trailhead of
  concrete next steps.
- **Storytelling** only where the material carries a real story (history/people/connect-the-dots):
  prefer a surprising sourced fact, an intuition-reframe, or a real conflict-of-ideas as the lead; end
  on a genuine, attributed open question rather than a forced moral or false summary.
- **Sourcing depth:** tier evidence (peer-reviewed > preprint > reputable outlet > press release); prefer
  reviews/meta-analyses for "consensus" claims; flag preliminary / single-study / industry-funded claims;
  when sources conflict, report the spread and attribute; for scale comparisons, show the arithmetic and
  sanity-check the order of magnitude.
- **Reader calibration:** no jargon dumps, no undefined acronyms, no talking down, no walls of text, no
  manufactured drama. Clean finished artifact — no process meta-notes (（已校正）/（补充）/（待核实）), no
  "hope this helps" closers, no visible research journey.
- **Bilingual / terminology:** keep English proper nouns in English; Chinese-native company names stay
  Chinese with English in parens on first mention (台积电（TSMC）); gloss unfamiliar English at first
  appearance (`throughput（吞吐量）`); don't nest full-width parens (use `联电 UMC` or a dash).
- **Typography:** space between CJK and ASCII/numbers except before `°`/`%`; full-width punctuation in
  Chinese paragraphs.
- **Delivery:** mobile-first visuals (no horizontal overflow, large touch targets, no hover-only);
  frontmatter valid (`title` ≤ 60, `publishDate` ISO-8601 + offset); `pnpm build:site` passes.
