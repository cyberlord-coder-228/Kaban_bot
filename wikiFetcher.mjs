import fetch from 'node-fetch';
import {stripHtml} from 'string-strip-html';

/**
 * @param {string} searchTerm - Alphanumeric word or phrase.
 * @return {Array.<string>} result
 */
export async function wikiSearch(searchTerm) {
  const numberOfArticles = 5;
  const result = [];

  const response = await fetch(
      'https://en.wikipedia.org/w/api.php?' +
      'action=query' +
      '&list=search' +
      '&prop=info' +
      '&inprop=url' +
      '&utf8=' +
      '&format=json' +
      `&srlimit=${numberOfArticles}` +
      `&srsearch=${searchTerm}`,
  ).then(async (resp) => await resp.json());

  for (const res of response.query.search) {
    result.push(`${res.title} - ${stripHtml(res.snippet).result}\n`);
  }

  return result;
}
