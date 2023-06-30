import safeEval from 'safe-eval';
import {getRandElement, makeSureNotVoid} from './collateralStuff.mjs';

const BLACKLIST = [
  'process', 'require', 'exit', 'import', '/*', '*/', 'eval', 'for', 'ctx',
  'while', 'request', 'Array', 'repeat', 'open', 'close', 'this', 'JSON',
  'bot', 'ping', 'prototype', 'console',
];

/**
 * @param {string} input
 * @param {Array} blacklist - All strings that input cannot contain.
 * @return {string|bool} - Forbidden word if found, else false.
 */
function containsForbiddenWords(input, blacklist) {
  for (const el of blacklist) {
    if (input.includes(el)) {
      return el;
    }
  }
  return false;
};

/**
 * 
 */
export function customEval(tgctx, input) {
  try {
    const isForbidden = containsForbiddenWords(input, BLACKLIST);
    let result = isForbidden ?
      `${isForbidden} is forbidden` : safeEval(input);
    result = makeSureNotVoid(result);

    tgctx.reply(
        result,
        {reply_to_message_id: tgctx.message.message_id},
    );
  } catch (e) {
    console.log(e.message);
    tgctx.reply(e.message);
  }
}; 
