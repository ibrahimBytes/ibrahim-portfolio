// decoder-utils.js
import { GLYPHS } from './scripts';

export const CharType = {
  Glyph: 'glyph',
  Value: 'value',
};

export function generateFrame(content, prev, pos) {
  return content.map((char, i) => {
    if (i < pos) return { type: CharType.Value, value: char };

    // pick random glyph
    const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    return {
      type: CharType.Glyph,
      value: pos % 1 < 0.5 ? randomGlyph : prev[i]?.value ?? randomGlyph,
    };
  });
}
