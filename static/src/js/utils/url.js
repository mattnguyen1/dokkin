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
const CARD_URL_PATH = '/card';

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

function getThumbnailPath(cardId) {
  // Awakened cards just increment the id by one, but share the same image thumbnail
  cardId = Math.floor(cardId / 10) * 10;
  return `/card_${cardId}_thumb.png`;
}

function getThumbnailBGPath(element, rarity) {
  // Take into account that alliances add 10/20 to the elements
  element = element % 10;
  element = padZeroes(element, 2);
  rarity = padZeroes(rarity, 2);
  return `/cha_base_${element}_${rarity}.png`;
}

function getRarityIconPath(rarityStr) {
  return `/cha_rare_sm_${rarityStr}.png`;
}

function getElementIconPath(element) {
  element = padZeroes(element, 2);
  return `/cha_type_icon_${element}.png`;
}

function getCharacterImagePath(id) {
  id = Math.floor(id / 10) * 10;
  return `/${id}/card_${id}_character.png`;
}

function getCharacterBGImagePath(id) {
  id = Math.floor(id / 10) * 10;
  return `/${id}/card_${id}_bg.png`;
}

function getCharacterEffectImagePath(id) {
  id = Math.floor(id / 10) * 10;
  return `/${id}/card_${id}_effect.png`;
}

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

export function getThumbnailUrl(cardId) {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_URL_PATH + getThumbnailPath(cardId);
};

export function getFallbackThumbnailUrl() {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_URL_PATH + '/card_0000000_thumb.png';
};

export function getThumbnailBGUrl(element, rarity) {
  return DOKKIN_S3_BASE_URL + THUMBNAIL_BG_URL_PATH + getThumbnailBGPath(element, rarity);
}

export function getRarityIconUrl(rarityStr) {
  return DOKKIN_S3_BASE_URL + RARITY_ICON_URL_PATH + `/cha_rare_sm_${rarityStr}.png`;
}

export function getLargeRarityIconUrl(rarityStr) {
  return DOKKIN_S3_BASE_URL + RARITY_ICON_URL_PATH + `/cha_rare_${rarityStr}.png`;
}

export function getElementIconUrl(element) {
  return DOKKIN_S3_BASE_URL + ELEMENT_ICON_URL_PATH + getElementIconPath(element);
}

export function getCharacterImageUrl(id) {
  return DOKKIN_S3_BASE_URL + CARD_URL_PATH + getCharacterImagePath(id);
}

export function getCharacterBGUrl(id) {
  return DOKKIN_S3_BASE_URL + CARD_URL_PATH + getCharacterBGImagePath(id);
}

export function getCharacterEffectUrl(id) {
  return DOKKIN_S3_BASE_URL + CARD_URL_PATH + getCharacterEffectImagePath(id);
}

export function getSlugFromName(id, name) {
  name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  name = getUrlFriendlyString(name);
  name = name.split(/ +/).join("-").toLowerCase();
  return `${id}-${name}`;
}

export function getUrlFriendlyString(str) {
  return str.replace(/[^a-zA-Z0-9-_\(\)~ ]/g, '');
}

export function getMappedQueryParams(paramStr) {
  const queryParams = {};
  paramStr.substring(1).split("&").forEach(param => {
    const [key, value] = param.split("=");
    queryParams[key] = value;
  });
  return queryParams;
}