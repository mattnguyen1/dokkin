/**
 * @fileoverview Utilities for creating URLs
 * @author mattnguyen1
 */

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DOKKIN_S3_BASE_URL = 'https://static.dokk.in';
const THUMBNAIL_URL_PATH = '/thumb';
const THUMBNAIL_BG_URL_PATH = '/thumb_bg';
const RARITY_ICON_URL_PATH = '/rarity';
const ELEMENT_ICON_URL_PATH = '/element';

// ------------------------------------------------------------------------------
// Private
// ------------------------------------------------------------------------------

/**
 * Returns the num as a string padded in the front with zeroes
 * @param {int} num 
 * @param {int} digits 
 * @returns {string}
 */
function padZeroes(num, digits) {
  num = num + '';
  return num.padStart(digits, 0);
}

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
 * @returns {string}
 */
function getThumbnailBGPath(element, rarity) {
  // Take into account that alliances add 10/20 to the elements
  element = element % 10;
  element = padZeroes(element, 2);
  rarity = padZeroes(rarity, 2);
  return `/cha_base_${element}_${rarity}.png`;
}

/**
 * Returns the path of the card's rarity icon
 * @param {string} rarityStr - rarity in string format
 * @returns {string}
 */
function getRarityIconPath(rarityStr) {
  return `/cha_rare_sm_${rarityStr}.png`;
}

/**
 * Returns the path of the card's element icon
 * @param {int} element 
 * @returns {string}
 */
function getElementIconPath(element) {
  element = padZeroes(element, 2);
  return `/cha_type_icon_${element}.png`;
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
 * Return the url for a card's fallback image
 * @returns {string}
 */
export function getFallbackThumbnailUrl() {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_URL_PATH + '/card_0000000_thumb.png';
};

/**
 * Return the url for a card's background
 * @param {int} element - type of card element (ex: str, teq, etc.)
 * @param {int} rarity  - rarity of the card (ex: r, ssr, lr, etc.)
 * @returns {string}
 */
export function getThumbnailBGUrl(element, rarity) {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_BG_URL_PATH + getThumbnailBGPath(element, rarity);
}

/**
 * Return the url for a card's rarity icon
 * @param {string} rarityStr - rarity of the card in string format
 * @returns {string}
 */
export function getRarityIconUrl(rarityStr) {
  return DOKKIN_S3_BASE_URL + RARITY_ICON_URL_PATH + getRarityIconPath(rarityStr);
}

/**
 * Return the url for a card's element icon
 * @param {int} element
 * @returns {string}
 */
export function getElementIconUrl(element) {
  return DOKKIN_S3_BASE_URL + ELEMENT_ICON_URL_PATH + getElementIconPath(element);
}