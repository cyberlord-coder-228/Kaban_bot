// to anyone who reads it, you`d better stop right now, save your sanity
'use strict';

import dotenv from 'dotenv';
dotenv.config();

import {Telegraf} from 'telegraf';

import * as myArrs from './myArrs_kaban.mjs';
import {sudoers} from './sudoers.mjs';

import {getRandElement, makeSureNotVoid} from './collateralStuff.mjs';
import {sendJoke} from './kabanJoke.mjs';
import {customEval as sendEvalResult} from './kabanEval.mjs';
import {wikiSearch} from './wikiFetcher.mjs';
import {morse as interpretateMorse} from './morseInterpretator.mjs';
import {twbw as transliterate} from './transliterate.mjs';
import {transkeyboard} from './transkeyboard.mjs';
import {hoikuCheck} from './hoikuChecker.mjs';
import {evalApl} from './aplFetcher.mjs';
import {translateToAll} from './translate.mjs';

const BOT = new Telegraf(process.env.TOCKEN);

const START_MESSAGE = 'У зв`язку з моєю лінню, сервер може не працювати';
const HELP_MESSAGE = 'Хай Бог помагає';

BOT.start((ctx) => ctx.reply(START_MESSAGE));

BOT.help((ctx) => ctx.reply(HELP_MESSAGE));

BOT.command('joke', (ctx) => sendJoke(ctx));

BOT.command('quote', (ctx) => ctx.reply(getRandElement(myArrs.quotesArr)));

BOT.command('elephant', (ctx) => {
  const msg = ctx.message;
  const input = msg.reply_to_message ? msg.reply_to_message.text : msg.text;

  ctx.reply(
      `Всі кажуть "${input.replaceAll('"', '')}", а ти купи слона`,
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.command('e', (ctx) => {
  if (process.uptime() <= 10) return; // lets bot relax for 10 freaking seconds

  const mainMessage = ctx.message.text.substring(2); // cut '/e'
  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    `(${reply.text})${mainMessage}` : mainMessage;

  sendEvalResult(ctx, input);
});

BOT.command('et', (ctx) => {
  const mainMessage = ctx.message.text.substring(3); // cut '/et'
  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    `("${reply.text}")${mainMessage}` : `"${mainMessage}"`;

  sendEvalResult(ctx, input);
});

BOT.command('sudo', async (ctx) => {
  if (process.uptime() <= 10) return;

  const input = ctx.message.text.substring(5);

  try {
    for (const key in sudoers) {
      if (ctx.message.from.id === sudoers[key]) {
        // user verified, input should be processed
        ctx.reply(eval(input), {reply_to_message_id: ctx.message.message_id});
        return;
      }
    }
    // user isn`t in sudoers
    ctx.reply('Nah, try /e');
  } catch (e) {
    console.log(e.message);
    ctx.reply(e.message);
  }
});

BOT.command('apl', async (ctx) => {
  const input = ctx.message.text.substring(4); // cut '/apl'
  ctx.reply(
      makeSureNotVoid(await evalApl(input)),
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.command('dmytr', (ctx) => {
  const v = () => getRandElement('аоуеиі'); // v for vowel
  const c = () => getRandElement('цкнгшщзхфвпрлджчсмтб'); // c for consonant
  ctx.reply('Ре' + c() + v() + c() + v() + 'нський');
});

BOT.command('answer', (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (!input) {
    ctx.reply('Нема... нічого?', {reply_to_message_id: ctx.message.message_id});
  } else if (input === '?') {
    ctx.reply(
        getRandElement('!¿'),
        {reply_to_message_id: ctx.message.message_id},
    );
  } else {
    ctx.reply(
        getRandElement(myArrs.answerssArr),
        {reply_to_message_id: ctx.message.message_id},
    );
  }
});

BOT.command('rand', (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (!input) {
    ctx.reply(
        Math.random(),
        {reply_to_message_id: ctx.message.message_id},
    );
  } else if (input === 'int') {
    ctx.reply(
        Math.round(Math.random() / (Math.random() * Math.random())),
        {reply_to_message_id: ctx.message.message_id},
    );
  } else if (isNaN(parseInt(input, 10)) && input !== undefined) {
    ctx.reply(
        getRandElement(input),
        {reply_to_message_id: ctx.message.message_id},
    );
  } else {
    ctx.reply(
        Math.random() * input,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
});

BOT.command('wiki', async (ctx) => {
  // shout out to nocommas555, the boi is a genius
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (/[\w, ]+/.test(input)) {
    try {
      for (const article of await wikiSearch(input)) {
        ctx.reply(article);
      }
    } catch (e) {
      ctx.reply(e.message);
    }
  } else {
    ctx.reply('Incorrect input, bruh');
  }
});

// SUM should be available at @MrPaschenko_bot any soon

BOT.command('transliterate', (ctx) => {
  //let input = ctx.message.text.split(' ').slice(1).join(' ');
  //if (reply && reply.text) input = reply.text;
  //input = clarifyVoid(input);

  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    reply.text : makeSureNotVoid(ctx.message.text.substring(14));

  // this is cringe, but it works. I should probably rewrite all of this

  // I have 2 arrays with corresponding letters (or groups of letters)
  // cyrilic to latin meant to work from start to end ([0] to [-1]),
  // latin to cyrilic meant to work from end to start ([-1] to [0])
  const Uk = [
    ' Я', ' Йо', ' Ю', ' Є', ' Ї',
    'Я', 'Йо', 'Ю', 'Є',
    'Ай', 'Ой', 'Уй', 'Ей', 'Ий', 'Ій',
    'А', 'О', 'У', 'Е', 'И', 'І',
    'Щ', 'Ш', 'Ч', 'Ц', 'Х', 'Ж', 'Зг',
    'Б', 'Ц', 'Д', 'Ф', 'Ґ', 'Г',
    'Дж', 'К', 'Л', 'М', 'Н', 'П',
    'К', 'Р', 'С', 'Т', 'В', 'В', 'Кс',
    'З', 'Ї', 'Й', `Ь`,
  ];
  const En = [
    ' Ya', ' Yo', ' Yu', ' Ye', ' Yi',
    'Ia', 'Io', 'Iu', 'Ie',
    'Ai', 'Oi', 'Ui', 'Ei', 'Yi', 'Ii',
    'A', 'O', 'U', 'E', 'Y', 'I',
    'Shch', 'Sh', 'Ch', 'Ts', 'Kh', 'Zh', 'Zgh',
    'B', 'C', 'D', 'F', 'G', 'H',
    'J', 'K', 'L', 'M', 'N', 'P',
    'Q', 'R', 'S', 'T', 'V', 'W', 'X',
    'Z', 'I', 'I', `' `,
  ];

  // had to implement this cause this string method didn`t work on android
  const replaceAll = (orgnlStr, search, replacement) => {
    if (orgnlStr.includes(search)) {
      return orgnlStr.split(search).join(replacement);
    } else {
      return orgnlStr;
    }
  };

  const transliterate = (text) => {
    let newTxt = ' ' + text;
    if ((/[a-z]/i).test(text)) {
      // have to replce these letters by hand, cause otherwise it`s complicated
      newTxt = newTxt.split('Th').join('Т')
          .split('Ph').join('Ф')
          .split('th').join('т')
          .split('ph').join('ф');
      for (let i = 0; i < En.length - 2; i++) {
        newTxt = replaceAll(newTxt, En[i], Uk[i]);
        newTxt = replaceAll(newTxt, En[i].toLowerCase(), Uk[i].toLowerCase());
      }
      return newTxt;
    } else if ((/[а-їґ]/i).test(text)) {
      for (let i = 0; i < Uk.length; i++) {
        newTxt = replaceAll(newTxt, Uk[i], En[i]);
        newTxt = replaceAll(newTxt, Uk[i].toLowerCase(), En[i].toLowerCase());
      }
      return newTxt;
    } else if (text) {
      return text;
    } else {
      return 'Некоректні вхідні дані.\nIncorrect input.';
    }
  };

  const trcew = (input) => { // Translit Regarding Case Every Word
    input = input
        .split(`"`).join(`" `)
        .split(`'`).join(`' `);
    const lineArr = input.split('\n');
    const MLA = []; // modified LineArray
    for (let line of lineArr) {
      const wordArr = line.split(' ');
      const MWA = []; // modified WordArray
      for (let word of wordArr) {
        if (word === word.toUpperCase() && word.length !== 1) {
          word = transliterate(' ' + word.toLowerCase())
              .trimStart()
              .toUpperCase();
        } else word = transliterate(' ' + word).trimStart();
        MWA.push(word);
      }
      line = MWA.join(' ');
      MLA.push(line);
    }
    // let result = MLA.join('\n');
    const result = MLA.join('\n')
        .split(`" `).join(`"`)
        .split(`' `).join(`'`);
    return result;
  };

  ctx.reply(trcew(input));
});

BOT.command('transkeyboard', (ctx) => {
  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    reply.text : ctx.message.text.split(' ').slice(1).join(' ');

  ctx.reply(makeSureNotVoid(transkeyboard(input)));
});

BOT.command('translate', async (ctx) => {
  //const reply = ctx.message.reply_to_message;
  const input = ctx.message.text.split(' ').slice(1);

  const allSlovicLangs = [ // not actually all
    'uk', 'be', 'pl', 'sk', 'cs', 'sl', 'hr', 'bs', 'sr', 'bg', 'mk',
  ];

  const targetLangs = /^[a-z]{2}(,[a-z]{2})*$/.test(input[0]) ?
    input.shift().split(',') : allSlovicLangs;
  const sourceLang = /^[a-z]{2}$/.test(input[0]) ? input.shift() : 'uk';
  const phrase = input.join(' ');

  ctx.reply(
      await translateToAll(targetLangs, sourceLang, phrase),
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.command('hoiku', (ctx) => {
  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    reply.text : ctx.message.text.split(' ').slice(1).join(' ');

  if (!input) {
    ctx.reply(
        'Сімнадцять складів,\n' +
        'п\'ять - сім - п\'ять в групах вони.\n' +
        'Таке є хоку.',
        {reply_to_message_id: ctx.message.message_id},
    );
    return;
  } else if (/[^а-щьюяєіѣїґ\s\,\.\-\'\"]/i.test(input)) {
    ctx.reply('Перевірка хоку не працює з даною системою письма');
  } else {
    ctx.reply(hoikuCheck(input), {reply_to_message_id: ctx.message.message_id});
  }
});

BOT.command('gib', (ctx) => {
  const conson = 'йцкнгшщзхґфвпрлджчсмтб';
  const vowels = 'аоуеиіяюєїь';

  const randWords = () => {
    let result = '';
    for (let i = 0; i < Math.random() * 6; i++) {
      let word = '';
      for (let j = 0; j < Math.random() * 10; j++) {
        word += getRandElement(conson) + getRandElement(vowels);
      }
      result += word + ' ';
    }
    return result;
  };

  const gibberish = (sentences) => {
    let result = '';
    for (let i = 0; i < sentences; i++) {
      result += getRandElement(conson + vowels).toUpperCase() + randWords();
      result = result.trim() + `${Math.random() < 0.5 ? '.\n' : '. ' }`;
    }
    return result;
  };

  ctx.reply(
      gibberish(Math.random() * 7),
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.command('giveinfo', (ctx) => {
  ctx.reply(
      `Chat_ID: ${ctx.chat.id}\n` +
      `User_ID: ${ctx.message.from.id}\n` +
      `Username: ${ctx.message.from.username}\n` +
      `Name: ${ctx.message.from.first_name} ${ctx.message.from.last_name}`,
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.command('morse', (ctx) => {
  const reply = ctx.message.reply_to_message;
  const input = reply && reply.text ?
    reply.text : ctx.message.text.split(' ').slice(1).join(' ');

  try {
    const result = interpretateMorse(input);
    if (result) {
      ctx.reply(result, {reply_to_message_id: ctx.message.message_id});
    }
  } catch (e) {
    ctx.reply('Mistakes were made. Errors occured.');
  };
});

BOT.command('card', (ctx) => {
  const signArr = ['♠', '♣', '♥', '♦'];
  const valueArr = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
  ];

  ctx.reply(
      getRandElement(valueArr) + getRandElement(signArr),
      {reply_to_message_id: ctx.message.message_id},
  );
});

BOT.on('message', (ctx) => {
  const input = ctx.message.text;

  if (/[^а-щьюяєіѣїґ\s\,\.\-\'\"]/i.test(input)) {
    // unfunny (non-ukrainian) symbolls were used
    return;
  }

  let checkResult = hoikuCheck(input);
  checkResult = checkResult.substring(0, 3) === 'Так' ? checkResult : false;
  if (checkResult) {
    ctx.reply(
        checkResult,
        {reply_to_message_id: ctx.message.message_id},
    );
  }
});

BOT.launch().then(() => console.log('BOT has successfully started!'));
