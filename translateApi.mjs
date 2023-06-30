'use strict';

import fetch from 'node-fetch';

async function getTranslation(text, langCode) {
  const apiLink = 'https://libretranslate.com/translate';
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      source: 'auto',
      target: langCode,
      //format: 'text',
      //api_key: '',
    }),
    headers: {'Content-Type': 'application/json'},
  };
  const res = await fetch(apiLink, fetchParams)
      .then(async (resp) => await resp.json());

  return res;
}

console.log(await getTranslation('fuck', 'uk'));
