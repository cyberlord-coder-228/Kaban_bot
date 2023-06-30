'use strict';

import {replaceAll} from './collateralStuff.mjs';

const REF = {
  'Q': 'Й',
  'W': 'Ц',
  'E': 'У',
  'R': 'К',
  'T': 'Е',
  'Y': 'Н',
  'U': 'Г',
  'I': 'Ш',
  'O': 'Щ',
  'P': 'З',
  '[': 'Х',
  ']': 'Ї',
  '\\': 'Ґ',
  'A': 'Ф',
  'S': 'І',
  'D': 'В',
  'F': 'А',
  'G': 'П',
  'H': 'Р',
  'J': 'О',
  'K': 'Л',
  'L': 'Д',
  ';': 'Ж',
  '\'': 'Є',
  'Z': 'Я',
  'X': 'Ч',
  'C': 'С',
  'V': 'М',
  'B': 'И',
  'N': 'Т',
  'M': 'Ь',
  ',': 'б',
  '/': '.',
  '.': 'ю',
};

/**
 * Modifies text to fix layout from Ukr to Eng and vise versa
 * assuming QWERTY layout
 * @param {string} text
 * @return {string}
 */
export function transkeyboard(text) {
  let newTxt = text;
  if ((/[a-z]/i).test(text)) {
    for (const key in REF) {
      newTxt = replaceAll(newTxt, key, REF[key]);
      newTxt = replaceAll(newTxt, key.toLowerCase(), REF[key].toLowerCase());
    }
    return newTxt;
  } else if ((/[а-їґ]/i).test(text)) {
    for (const key in REF) {
      newTxt = replaceAll(newTxt, REF[key], key);
      newTxt = replaceAll(newTxt, REF[key].toLowerCase(), key.toLowerCase(),);
    }
    return newTxt;
  } else {
    return text;
  }
};
