/**
 * Returns a specified amount of random hex colors
 * @param {length} of array for amount of random colours to get
 */
export function randomColorGenerator() {
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Formats a number (i.e. adds commas)
 * @param {*} number
 */
export function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

export const default_colors = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC'
];
