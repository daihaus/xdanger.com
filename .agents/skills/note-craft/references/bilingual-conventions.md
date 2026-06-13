# Bilingual Conventions (Chinese / English)

Notes here are bilingual: Chinese narrative with English for technical terms and proper nouns. This file
pins the exact format so notes read consistently. The reader is a Chinese-native, first-time reader of
the topic — pair and gloss for *their* reading speed, not exhaustively.

Default to Chinese for narrative and explanation; switch to English for technical terms, quotes, and
proper nouns. Mixing freely within a paragraph is fine and matches how bilingual readers think.

```
我们看一下 attention mechanism（注意力机制）是怎么算的。给定 query Q、key K、value V，
公式是 softmax(QK^T / √d_k) V。这里 √d_k 是为了把 dot product 的方差控制住，
避免 softmax 进入 saturated（饱和）区域。
```

## 1. Proper nouns — keep the native form

Products, brands, people, and technology keep their original form; don't force-translate.

- **English proper nouns stay English**: GitHub, Astro, oklch.
- **Exception ① — Chinese-native companies / orgs** stay Chinese, with English in parens on **first
  mention**: `台积电（TSMC）`、`联发科（MediaTek）`、`华大九天（Empyrean）`. Subsequent mentions: Chinese
  alone.
- **Exception ② — people with an established Chinese transliteration** stay Chinese: 马斯克、库克、图灵.
  Don't convert them back to English.

## 2. Technical terms — pair both languages on first mention

When a technical term (math, physics, CS, biology, engineering, finance) first appears, give both
languages once:

```
反向传播（backpropagation） …
gradient descent（梯度下降） …
```

- First mention: both languages in parens. Subsequent mentions in the same note: either language,
  whichever flows.
- Acronyms: keep the acronym, gloss once — `CNN（convolutional neural network, 卷积神经网络）`.
- Don't over-pair. Everyday words (computer, data, code) and terms already common in Chinese tech-speak
  (API, SDK, framework) don't need pairing.

## 3. Unfamiliar English vocabulary — Chinese gloss, in reading order

When an English word a first-time reader might not know first appears, append a short Chinese gloss right
there:

```
这套架构是个 chimera（奇美拉，嵌合体）。
吞吐受限于 throughput（吞吐量），不是延迟。
```

- Gloss at the **earliest** appearance in reading order — **including a visual's caption** if that's
  where the word first shows up. Don't gloss at a later occurrence and leave the first bare.
- One or two characters / a short phrase — recognition speed, not a dictionary entry. Don't re-gloss in
  later occurrences.
- Skip the gloss for the term the note is *about* (don't gloss "entropy" every time when teaching
  entropy) and for words already common in Chinese tech-speak.
- Threshold: "would a B2-English Chinese reader have to stop and look this up?" — only then gloss.

## 4. Don't nest same-width parentheses

Avoid `（…（…）…）` — same-character full-width nesting is hard to read. When the surrounding context is
already inside full-width parens, use a parallel form (`联电 UMC`) or a dash to introduce the gloss
instead.

## 5. Code, math, identifiers — never translate

Code, mathematical symbols, file paths, library names, function names, and proper nouns stay verbatim.
Use code blocks for code and LaTeX (`$…$` inline, `$$…$$` block) for math — don't smuggle math into prose
with unicode hacks.

## 6. Typography (mechanically enforced, but write it right)

- Space between CJK and ASCII / numbers — `使用 Astro 6` — except before `°` and `%`.
- Chinese paragraphs use full-width punctuation; English paragraphs use half-width.
- AutoCorrect enforces most of this on `pnpm fix`; write it correctly and respect its fixes, don't fight
  them.

## Quick self-check

1. Proper nouns in the right form (English kept; Chinese-native orgs / transliterated people kept Chinese
   with English in parens on first mention)? ✓
2. First-mention technical terms paired? ✓
3. Unfamiliar English glossed at its earliest appearance (captions included), not over-glossed? ✓
4. No nested full-width parens? ✓
5. CJK / ASCII spacing and full-width punctuation correct? ✓
