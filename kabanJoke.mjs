import {subjectsArr, actionsArr, funnyPicturesArr, punsArr} from './myArrs_kaban.mjs';
import {getRandElement} from './collateralStuff.mjs';

const STUPID_JOKE_PROB = 0.1;
const MEME_PROB = 0.225;
const PUN_PROB = 0.675;

/**
 * @param {Object.<string, number>} probDict - Probability dictionary.
 * @return {string} - Some random key.
 */
function weightedRandom(probDict) {
  let sum = 0;
  const r = Math.random();

  for (const i in probDict) {
    if (probDict.hasOwnProperty(i)) {
      sum += probDict[i];
      if (r <= sum) return i;
    }
  }
}

/**
 * Sends telegram message with some kind of joke.
 * @param {Context} tgctx - Telegraf Context instance.
 */
export function sendJoke(tgctx) {
  const jokeType = weightedRandom(
      {
        'sj': STUPID_JOKE_PROB,
        'm': MEME_PROB,
        'p': PUN_PROB,
      },
  );

  switch (jokeType) {
    case 'sj':
      // stupid joke
      const subject = getRandElement(subjectsArr);
      const action = getRandElement(actionsArr);
      const ending = Math.random() < 0.1 ? '. Ось така хуйня, малята.' : '';
      tgctx.reply(`${subject} ${action}${ending}`);
      break;
    case 'm':
      // meme/picture
      tgctx.replyWithPhoto({url: getRandElement(funnyPicturesArr)});
      break;
    case 'p':
      // simple pun
      tgctx.reply(getRandElement(punsArr));
      break;
  }
}
