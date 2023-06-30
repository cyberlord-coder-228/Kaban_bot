'use strict';

import translate from 'translate';
translate.engine = 'google';
translate.key = process.env.GOOGLE_KEY;

/**
 * @param {Array.<string>} targetLanguages - ISO codes.
 * @param {string} fromLanguage - ISO code.
 * @param {string} word - Could be phrase, btw.
 * @return {string}
 */
export async function translateToAll(targetLanguages, fromLanguage, word) {
  if (!word) return 'r u sure u havn\'t forgor anything?';

  let result = '';
  for (const lang of targetLanguages) {
    result += `${lang}: ${await translate(word, {to: lang, from: fromLanguage})}\n`;
  }
  return result;
}
