import fetch from 'node-fetch';

/**
 * @param {string} code - Input.
 * @return {string} - Result.
 */
export async function evalApl(code) {
  const apiLink = 'https://tryapl.org/Exec';
  const fetchParams = {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(['', 0, '', code]),
  };
  return fetch(apiLink, fetchParams)
      .then(async (resp) => await resp.json())
      .then(async (arr) => await arr[3])
      .then(async (maybeArr) => await maybeArr.join('\n'));
}
