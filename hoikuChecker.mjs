const VOWELS = 'eyuioaаоуеиіяюєїёыэꙇꙗѥѵѢ'.split('');

/**
 * It aint perfect, but it`s good enough
 * @param {string} text
 * @return {number} - Amount of vowels in text.
 */
function syllCount(text) {
  return text.toLowerCase()
      .split('')
      .filter((letter) => VOWELS.some((vowel) => letter === vowel))
      .length;
}

/**
 * @param {string} text
 * @return {string} - Validation with formatted hoiku or denial if it wasn`t one.
 */
export function hoikuCheck(text) {
  if (syllCount(text) === 17) {
    const wordArr = text.split(/\s|\n/);

    let hoiku = '';
    let line = 1;
    let syllableCount = 0;

    for (const word of wordArr) {
      syllableCount += syllCount(word);

      if (
        line === 1 && syllableCount <= 5 ||
        line === 2 && syllableCount <= 7 ||
        line === 3 && syllableCount <= 5
      ) {
        // still going
        hoiku += `${word} `;

        if (
          line === 1 && syllableCount === 5 ||
          line === 2 && syllableCount === 7
        ) {
          // this line is a valid hoiku line, lets move on to the next
          hoiku += '\n';
          line++;
          syllableCount = 0;
        }
      } else {
        return 'Це не хоку (';
      }
    }
    return `Так, це хоку:\n\n${hoiku}`;
  } else {
    return 'Це не хоку (';
  }
};
