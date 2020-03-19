/**
 * Returns a specified amount of random hex colors
 * @param {length} of array for amount of random colours to get
 */
export function randomColorGenerator() {
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
}

/**
 * Formats a number (i.e. adds commas)
 * @param {*} number 
 */
export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}