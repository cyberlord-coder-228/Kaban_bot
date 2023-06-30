/**
 * @param {Array} arr
 * @return {*} - Random element.
 */
export function getRandElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * @param {Object} object
 * @param {*} value
 * @return {*} - The key of the value.
 */
export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
};

/**
 * @param {*} smth - Something that may on may not be some kind of void.
 * @return {*|string} smth - Itself if it`s legit, else the name of kind of void.
 */
export function makeSureNotVoid(smth) {
  if (smth === undefined) {
    return 'undefined';
  } else if (smth === null) {
    return 'null';
  } else if (smth === '') {
    return 'empty string';
  } else if (smth.toString().match(/^[\s]*$/)) {
    return 'whitespace';
  }
  return smth;
};

/**
 * Had to implement this cause this string method didn`t work on android.
 * @param {string} orgnlStr - Main string.
 * @param {string} search - Sequence that needs to be replaced.
 * @param {string} replacement - Sequence to replace with.
 * @return {string} - Main string with replaced parts.
 */
export function replaceAll (orgnlStr, search, replacement) {
  if (!orgnlStr.includes(search)) {
    return orgnlStr;
  }

  return orgnlStr.split(search).join(replacement);
};
