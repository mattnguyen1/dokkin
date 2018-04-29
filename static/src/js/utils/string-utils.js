/**
 * @fileoverview Utilities for strings
 * @author mattnguyen1
 */

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const JAPANESE_CHAR_REGEX = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

export function doesStringContainJapaneseCharacters(str) {
  return !!str.match(JAPANESE_CHAR_REGEX);
};