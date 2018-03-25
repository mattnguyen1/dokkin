/**
 * @fileoverview Utilities for creating URLs
 * @author mattnguyen1
 */

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DOKKIN_S3_BASE_URL = 'https://dokkin.s3.amazonaws.com';
const THUMBNAIL_URL_PATH = '/thumb';
const THUMBNAIL_BG_URL_PATH = '/thumb_bg';
const RARITY_ICON_URL_PATH = '/rarity';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Return the path of the thumbnail
 * @param {int} cardId 
 * @returns {string}
 */
function getThumbnailPath(cardId) {
  // Awakened cards just increment the id by one, but share the same image thumbnail
  cardId = Math.floor(cardId / 10) * 10;
  return `/card_${cardId}_thumb.png`;
}

/**
 * Return the path of the thumbnail's bg
 * @param {int} element 
 * @param {int} rarity 
 */
function getThumbnailBGPath(element, rarity) {
  // Take into account that alliances add 10/20 to the elements
  element = element % 10;
  return `/cha_base_0${element}_0${rarity}.png`;
}

/**
 * Returns the path of the card's rarity icon
 * @param {string} rarityStr - rarity in string format
 */
function getRarityIconPath(rarityStr) {
  return `/cha_rare_sm_${rarityStr}.png`
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

/**
 * Return the url for a card's thumbnail
 * @param {int} cardId - id of the card
 * @returns {string}
 */
export function getThumbnailUrl(cardId) {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_URL_PATH + getThumbnailPath(cardId);
};

/**
 * Return the url for a card's background
 * @param {int} element - type of card element (ex: str, teq, etc.)
 * @param {int} rarity  - rarity of the card (ex: r, ssr, lr, etc.)
 */
export function getThumbnailBGUrl(element, rarity) {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_BG_URL_PATH + getThumbnailBGPath(element, rarity);
}

/**
 * Return the url for a card's rarity icon
 * @param {string} rarityStr - rarity of the card in string format
 */
export function getRarityIconUrl(rarityStr) {
  return DOKKIN_S3_BASE_URL + RARITY_ICON_URL_PATH + getRarityIconPath(rarityStr);
}