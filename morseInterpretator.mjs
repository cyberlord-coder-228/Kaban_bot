import {getKeyByValue} from './collateralStuff.mjs';

const REF = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

/**
 * This function converts latin letters to theirs corresponding morse code,
 * and vice versa.
 * Letters in morse must be separated by 1 space, words by 3 spaces.
 * @param {string} input
 * @return {string} result
 */
export function morse(input) {
  let result = 'Smth went wrong/';

  if (!(/[^\.\-\#\!\s]+/.test(input))) {
    // form morse to latin
    result = input
        .split(/\s{3}|\n/g) // splits by three spaces or a newline
        .map((a) => a.split(' ').map((b) => REF[b]).join(''))
        .join(' ');
  } else if ((/[a-z]+/i).test(input)) {
    // from latin to morse
    const words = input
        .toLowerCase()
        .split(/\s|\n/g);
    result = '';
    for (const word of words) {
      for (const letter of word.split('')) {
        result += `${getKeyByValue(REF, letter)} `;
      }
      result += '   ';
    }
  } else {
    result = 'Khz :/';
  }

  return result.split('undefined').join('#');
}
