/**
 * @fileOverview Module for preloading common static images used across site
 * @author mattnguyen1
 */

/* global Image */

import {
  getThumbnailBGUrl,
  getElementIconUrl,
  getRarityIconUrl,
  getLargeRarityIconUrl
} from "dokkin/js/utils/url";

const NUM_RARITIES = 6;
const NUM_ELEMENTS = 5;
const RARITIES = ["n", "r", "sr", "ssr", "ur", "lr"];

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

export default function preload() {
  // Load all possible thumbnail BG types
  for (let rarity = 0; rarity < NUM_RARITIES; rarity++) {
    for (let element = 0; element < NUM_ELEMENTS; element++) {
      const image = new Image();
      image.src = getThumbnailBGUrl(element, rarity);
    }
  }

  // Load all element icons
  for (let element = 0; element < NUM_ELEMENTS; element++) {
    const image = new Image();
    image.src = getElementIconUrl(element);
  }

  // Load all rarity icons
  for (let rarity = 0; rarity < NUM_RARITIES; rarity++) {
    const rarity_str = RARITIES[rarity];
    const image = new Image();
    image.src = getRarityIconUrl(rarity_str);

    const image2 = new Image();
    image2.src = getLargeRarityIconUrl(rarity_str);
  }
}
