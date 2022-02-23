// to anyone who reads it, you`d better stop right now, save your sanity
'use strict';

import dotenv from 'dotenv';
dotenv.config();

import {Telegraf} from 'telegraf';
import {stripHtml} from 'string-strip-html';
import fetch from 'node-fetch';
import safeEval from 'safe-eval';

import myArrs from './myArrs_kaban.mjs';
import {sudoers} from './sudoers.mjs';

const bot = new Telegraf(process.env.TOCKEN);

let NEVER_JOKED_BEFORE = true;

/**
 * @param {*} smth - Something that may on may not be some kind of void.
 * @return {*|string} smth - If it was legit, else the name of kind of void
 */
function clarifyVoid(smth) {
  if (smth === undefined) {
    smth = 'undefined';
  } else if (smth === null) {
    smth = 'null';
  } else if (smth === '') {
    smth = 'empty string';
  } else if (smth.toString().match(/^[\s]*$/)) {
    smth = 'whitespace';
  }
  return smth;
};

const getRandElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const elephantReply = (text) => {
  return `Всі кажуть "${text.replaceAll('"', '')}", а ти купи слона`;
};


bot.start(
    (ctx) => ctx.reply('I`m once again asking for your humouristical support'),
);

bot.help(
    (ctx) => ctx.reply('103 - швидка медична допомога'),
);

bot.command('elephant', (ctx) => {
  const msg = ctx.message;
  const input = msg.reply_to_message ? msg.reply_to_message.text : msg.text;

  ctx.reply(
      elephantReply(input),
      {reply_to_message_id: ctx.message.message_id},
  );
});

bot.command('joke', (ctx) => {
  if (NEVER_JOKED_BEFORE) {
    ctx.reply('Ніхто не казав, що жарти будуть смішними',
        {reply_to_message_id: ctx.message.message_id});
    NEVER_JOKED_BEFORE = false;
    return;
  }

  if (Math.random() < 0.1) {
    ctx.reply(
        getRandElement(myArrs.subjectsArr) + ' ' +
      getRandElement(myArrs.actionsArr) +
      (Math.random() < 0.1 ? '. Ось така хуйня, малята.' : ''),
    );
  } else if (Math.random() < 0.25) {
    ctx.replyWithPhoto({url: getRandElement(myArrs.funnyPicturesArr)});
  } else {
    ctx.reply(getRandElement(myArrs.punsArr));
  }
});

bot.command('quote', (ctx) => {
  ctx.reply(getRandElement(myArrs.quotesArr));
});

bot.command('e', (ctx) => {
  if (process.uptime() <= 10) return; // lets bot relax for 10 freaking seconds

  let input = ctx.message.text.substring(3);

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) {
    if (reply.text.includes('=') || input === 'ascode') {
      input = reply.text;
    } else {
      input = `("${reply.text}")${input}`;
    }
  } else {
    input = input.includes('=') ? input : `"${input}"`;
  }
  console.log('input', input, typeof(input));

  if (!input) {
    ctx.reply(
        'Так а вхідні дані не задано :/',
        {reply_to_message_id: ctx.message.message_id},
    );
    return;
  }

  /**
   * @param {string} text
   * @return {string|bool} Forbidden word if found, else false.
   */
  function containsForbiddenWords(text) {
    const blackList = [
      'process', 'require', 'exit', 'import', '/*', '*/', 'eval', 'for', 'ctx',
      'while', 'request', 'Array', 'repeat', 'open', 'close', 'this', 'JSON',
      'bot', 'ping', 'prototype', 'console',
    ];

    for (const el of blackList) {
      if (text.includes(el)) {
        return el;
      }
    }
    return false;
  };

  try {
    const isForbidden = containsForbiddenWords(input);
    let result = isForbidden ?
      `${isForbidden} is forbidden` : safeEval(input);
    result = clarifyVoid(result);

    ctx.reply(
        result,
        {reply_to_message_id: ctx.message.message_id},
    );
  } catch (e) {
    console.log(e.message);
    ctx.reply(e.message);
  }
});

bot.command('sudo', async (ctx) => {
  if (process.uptime() <= 10) return;

  const input = ctx.message.text.substring(6);

  try {
    for (const key in sudoers) {
      if (ctx.message.from.id === sudoers[key]) {
        ctx.reply(
            eval(input),
            {reply_to_message_id: ctx.message.message_id},
        );
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

bot.command('dmytr', (ctx) => {
  const v = () => getRandElement('аоуеиі'); // v for vowel
  const c = () => getRandElement('цкнгшщзхфвпрлджчсмтб'); // c for consonant
  ctx.reply('Ре' + c() + v() + c() + v() + 'нський');
});

bot.command('answer', (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (!input) {
    ctx.reply(
        'Нема питання - нема відповіді',
        {reply_to_message_id: ctx.message.message_id},
    );
  } else if (input === '?') {
    ctx.reply(
      Math.random() < 0.5 ? '!' : '¿',
      {reply_to_message_id: ctx.message.message_id},
    );
  } else if (input.toString().includes('?')) {
    ctx.reply(
        getRandElement(myArrs.answerssArr),
        {reply_to_message_id: ctx.message.message_id},
    );
  } else {
    ctx.reply(
        'По-нормальному запитай',
        {reply_to_message_id: ctx.message.message_id},
    );
  }
});

bot.command('rand', (ctx) => {
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

bot.command('wiki', async (ctx) => {
  // shout out to nocommas555, the boi is  a genius
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (input && /[\w, ]+/.test(input)) {
    try {
      /**
       * Function sends all found (parts of) wiki articles as tg messages.
       * @param {string} searchTerm - Alphanumeric word or phrase.
       */
      async function wikiSearch(searchTerm) {
        const response = await fetch(
            'https://en.wikipedia.org/w/api.php?' +
            'action=query' +
            '&list=search' +
            '&prop=info' +
            '&inprop=url' +
            '&utf8=' +
            '&format=json' +
            '&srlimit=5' +
            `&srsearch=${searchTerm}`,
        ).then(async (resp) => await resp.json());

        for (const res of response.query.search) {
          ctx.reply(`${res.title} - ${stripHtml(res.snippet).result}\n`);
        }
      }
      try {
        wikiSearch(input);
      } catch (e) {
        console.log(e.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
    ctx.reply('Incorrect input, bruh');
  }
});

// SUM should be available at @MrPaschenko_bot any soon

bot.command('transliterate', (ctx) => {
  let input = ctx.message.text.split(' ').slice(1).join(' ');

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) input = reply.text;

  input = clarifyVoid(input);

  // this is cringe, but it works. I should probably rewrite all of this
  // don`t touch this mess, it`s either readable or working, unfortunately

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

  // had to implement this cause this string method didn`t work on phone
  const replaceAll = (orgnlStr, search, replacement) => {
    if (orgnlStr.includes(search)) {
      return orgnlStr.split(search).join(replacement);
    } else return orgnlStr;
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

bot.command('hoiku', (ctx) => {
  let input = ctx.message.text.split(' ').slice(1).join(' ');

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) input = reply.text;

  if (!input) {
    ctx.reply(
        'Сімнадцять складів,\n' +
        'п\'ять - сім - п\'ять в групах вони.\n' +
        'Таке є хоку.',
        {reply_to_message_id: ctx.message.message_id},
    );
    return;
  };

  const syllCount = (text) =>
    text.toLowerCase()
        .split('')
        .filter(
            (letter) => 'eyuioaаоуеиіяюєїёыэꙇꙗѥѵѢ'
                .split('')
                .some((el) => el === letter),
        ).join('').length;

  const hoikuCheck = (x) => {
    if (syllCount(x) === 17) {
      const wordArr = x.split('\n').join(' ').split(' ');

      let hoiku = '';
      let sc = 0;
      let lnCount = 1;

      for (const word of wordArr) {
        sc += syllCount(word);
        if (
          sc <= 5 && (lnCount === 1 || lnCount === 3) ||
          sc <= 7 && lnCount === 2
        ) {
          hoiku += word + ' ';
          if (
            sc === 5 && lnCount !== 2 ||
            sc === 7 && lnCount === 2
          ) {
            hoiku += '\n';
            lnCount++;
            sc = 0;
          }
        } else return 'Це не хоку (';
      }
      return 'Так, це хоку:\n\n' + hoiku;
    } else return 'Це не хоку (';
  };

  ctx.reply(hoikuCheck(input), {reply_to_message_id: ctx.message.message_id});
});

bot.command('gib', (ctx) => {
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

bot.command('giveinfo', async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  console.log('input:', input);
  console.log('Chat_ID:', ctx.chat.id);
  console.log('User_ID:', ctx.message.from.id);
  console.log('from.username:', ctx.message.from.username);
  console.log('Name:', ctx.message.from.first_name, ctx.message.from.last_name);
  console.log(' ');

  ctx.reply('Chat_ID: ' + ctx.chat.id +
    '\nUser_ID: ' + ctx.message.from.id +
    '\nUsername: ' + ctx.message.from.username +
    '\nName: ' + ctx.message.from.first_name + ' ' + ctx.message.from.last_name,
  {reply_to_message_id: ctx.message.message_id});
});

bot.command('morse', async (ctx) => {
  let input;

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) input = reply.text;
  else input = ctx.message.text.split(' ').slice(1).join(' ');

  const ref = {
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

  const getKeyByValue = (object, value) =>
    Object.keys(object).find((key) => object[key] === value);

  let result = 'Smth went wrong/';
  if (!/[^\.\-\#\!\s]/.test(input)) {
    result = input
        .split('\n')
        .join('   ')
        .split('   ')
        .map(
            (a) => a
                .split(' ')
                .map(
                    (b) => ref[b],
                ).join(''),
        ).join(' ');
  } else if (/[a-z]/i.test(input)) {
    const words = input
        .toLowerCase()
        .split('\n')
        .join(' ')
        .split(' ');
    result = '';
    for (const word of words) {
      for (const letter of word.split('')) {
        result += getKeyByValue(ref, letter) + ' ';
      }
      result += '   ';
    }
  } else result = 'Khz :/';

  try {
    if (result) {
      ctx.reply(
          result.split('undefined').join('#'),
          {reply_to_message_id: ctx.message.message_id});
    }
  } catch (e) {
    ctx.reply('khui');
  };
});

bot.command('card', (ctx) => {
  const signArr = ['♠', '♣', '♥', '♦'];
  const valueArr = '2 3 4 5 6 7 8 9 10 J Q K A'.split(' ');

  ctx.reply(getRandElement(valueArr) + getRandElement(signArr),
      {reply_to_message_id: ctx.message.message_id});
});

bot.hears('слон', (ctx) => ctx.reply(
    'А го зіграєм)',
    {reply_to_message_id: ctx.message.message_id},
));

bot.on('message', (ctx) => {
  if (!((/^[а-їґ.,'"?\- ]+$/i).test(ctx.message.text))) {
    return;
  }

  const syllCount = (text) =>
    text
        .toLowerCase()
        .split('')
        .filter(
            (letter) => 'аоуеиіяюєї'
                .split('')
                .some((el) => el === letter))
        .join('')
        .length;

  if (ctx.message.text && syllCount(ctx.message.text) === 17) {
    const hoikuCheck = (x) => {
      const wordArr = x.split('\n').join(' ').split(' ');

      let hoiku = `Ось твоє хоку, майстре хоку:\n\n`;
      let sc = 0;
      let lnCount = 1;

      for (const word of wordArr) {
        sc += syllCount(word);
        if (sc <= 5 && (lnCount === 1 || lnCount === 3) ||
            sc <= 7 && lnCount === 2) {
          hoiku += word + ` `;
          if (sc === 5 && lnCount !== 2 ||
            sc === 7 && lnCount === 2) {
            hoiku += '\n';
            lnCount++;
            sc = 0;
          }
        } else return;
      }
      return hoiku;
    };

    try {
      const hoiku = hoikuCheck(ctx.message.text);
      if (hoiku) {
        ctx.reply(
            hoiku,
            {reply_to_message_id: ctx.message.message_id},
        );
      }
    } catch (e) {
      ctx.reply(
          e.message,
          {reply_to_message_id: ctx.message.message_id},
      );
    };
  };
});

bot.launch().then(() => console.log('Bot has successfully started!'));
