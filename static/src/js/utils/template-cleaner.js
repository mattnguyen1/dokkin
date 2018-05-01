/**
 * @fileOverview Module for cleaning up the base template on post load
 * @author mattnguyen1
 */

/* global document */

// ------------------------------------------------------------------------------
// Public
// ------------------------------------------------------------------------------

export default function cleanup() {
  [
    "og:site",
    "og:type",
    "og:description",
    "og:title",
    "og:image",
    "og:url"
  ].forEach(property => {
    const element = document.querySelector(`[property="${property}"]`);
    element.remove();
  });
}
