// scripts.js

// Primary visual script (clean, consistent, cyber aesthetic)
const katakana = [
  'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ',
  'サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト',
  'ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ',
  'マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ー',
  'ラ','リ','ル','レ','ロ','ワ','ヰ','ヱ','ヲ','ン',
  'ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ',
  'ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ',
  'パ','ピ','プ','ペ','ポ',
];

// Curated Arabic (no diacritics, no forms, visually consistent)
const arabic = [
  'ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز',
  'س','ش','ص','ض','ط','ظ','ع','غ',
  'ف','ق','ك','ل','م','ن','ه','و','ي',
];

// Weighted pool: Katakana dominates to keep animation clean.
// Katakana ×3 gives better balance.
export const glyphSets = {
  katakana,
  arabic,
};

// Flatten + weight
export const GLYPHS = [
  ...katakana,
  ...katakana,
  ...katakana, // weighted
  ...arabic,
];
