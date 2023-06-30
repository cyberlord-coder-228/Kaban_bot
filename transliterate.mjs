'use strict';

import {replaceAll} from './collateralStuff.mjs';

const UKR_2_ENG_REF = {
  // at the start of the word
  ' Я': ' Ya',
  ' Ю': ' Yu',
  ' Є': ' Ye',
  ' Ї': ' Yi',
  // after the apostrophy
  '\'Я': '\'Ya',
  '\'Ю': '\'Yu',
  '\'Є': '\'Ye',
  '\'Ї': '\'Yi',
  // between other letters
  'Я': 'Ia',
  'Ю': 'Iu',
  'Є': 'Ie',
  'Ї': 'Yi',
  // post-yotation
  'Ай': 'Ai',
  'Ой': 'Oi',
  'Уй': 'Ui',
  'Ей': 'Ei',
  'Ий': 'Yi',
  'Ій': 'Ii',
  // vanilla vowels
  'А': 'A',
  'О': 'O',
  'У': 'U',
  'Е': 'E',
  'И': 'Y',
  'І': 'I',
  // get rid of apostrophy
  '\'': '',
  // special substitutions
  'Зг': 'Zgh',
  // vanilla consonants
  'Б': 'B',
  'В': 'V',
  'Г': 'H',
  'Ґ': 'G',
  'Д': 'D',
  'Ж': 'Zh',
  'З': 'Z',
  'Й': 'Y',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'Ф': 'F',
  'Х': 'Kh',
  'Ц': 'Ts',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Shch',
  'Ь': '\'',
};

const ENG_2_UKR_REF = {
  // vowels
  ' Ya': ' Я',
  ' Yo': 'Йо',
  ' Yu': ' Ю',
  ' Ye': ' Є',
  ' Yi': ' Ї',
  'Ia': 'Я',
  'Io': 'Ьо',
  'Iu': 'Ю',
  'Ie': 'Є',
  'Ai': 'Ай',
  'Oi': 'Ой',
  'Ui': 'Уй',
  'Ei': 'Ей',
  'Yi': 'Ий',
  'Ii': 'Ій',
  'A': 'А',
  'O': 'О',
  'U': 'У',
  'E': 'Е',
  'Y': 'И',
  'I': 'І',
  // special substitutions
  'Shch': 'Щ',
  'Sh': 'Ш',
  'Ch': 'Ч',
  'Ts': 'Ц',
  'Kh': 'Х',
  'Zh': 'Ж',
  'Zgh': 'Зг',
  'Th': 'Т',
  'Ph': 'Ф',
  // vanilla stuff
  'B': 'Б',
  'C': 'Ц',
  'D': 'Д',
  'F': 'Ф',
  'G': 'Ґ',
  'H': 'Г',
  'J': 'Дж',
  'K': 'К',
  'L': 'Л',
  'M': 'М',
  'N': 'Н',
  'P': 'П',
  'Q': 'К',
  'R': 'Р',
  'S': 'С',
  'T': 'Т',
  'V': 'В',
  'W': 'В',
  'X': 'Кс',
  'Z': 'З',
  '\'': 'Ь',
};

/**
 * Transliterates from Ukr to Eng, and vise-versa
 * @param {string} text
 * @return {string}
 */
function transliterate(text) {
  let newTxt = text;
  if ((/[a-z]/i).test(text)) {
    for (const key in ENG_2_UKR_REF) {
      newTxt = replaceAll(newTxt, key, ENG_2_UKR_REF[key]);
      newTxt = replaceAll(
          newTxt,
          key.toLowerCase(),
          ENG_2_UKR_REF[key].toLowerCase(),
      );
    }
    return newTxt;
  } else if ((/[а-їґ]/i).test(text)) {
    for (const key in UKR_2_ENG_REF) {
      newTxt = replaceAll(newTxt, key, UKR_2_ENG_REF[key]);
      newTxt = replaceAll(
          newTxt,
          key.toLowerCase(),
          UKR_2_ENG_REF[key].toLowerCase(),
      );
    }
    return newTxt;
  } else {
    return text;
  }
};


/**
 * Transliterates text word by word
 * @param {string} text
 * @return {string}
 */
export function twbw(text) {
  const newTxt = text;

  const lineArr = newTxt.split('\n');
  const MLA = []; // modified lineArray
  for (const line of lineArr) {
    const wordArr = line.split(' ');
    const MWA = []; // modified wordArray
    for (const word of wordArr) {
      MWA.push(transliterate(` ${word}`).trimStart());
    }
    MLA.push(MWA.join(' '));
  }
  return MLA.join('\n');
};
