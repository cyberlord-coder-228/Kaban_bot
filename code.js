'use strict';

const { Telegraf } = require('telegraf');
//const { google } = require('googleapis');
const { stripHtml }= require("string-strip-html");
const fetch = require('node-fetch');
const safeEval = require('safe-eval');
const myArrs = require('./MyArrs_kaban.js');

const bot = new Telegraf('1642862707:AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
//const gApi = new GoogleAPI(process.env.google);

const ClarifyVoid = smth => {
  if (smth === undefined) smth = 'undefined';
  else if (smth === null) smth = 'null';
  else if (smth === '') smth = 'empty string';
  else if (smth.toString().match(/^[\s]*$/)) smth = 'whitespace';
  return smth;
};

const getRandElement = arr => arr[Math.floor(Math.random() * arr.length)];

bot.start(ctx => ctx.reply('/*start_phrase*/'));

bot.command('elephant', ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (!input && ctx.message.reply_to_message) {
    ctx.reply(
      `Всі кажуть ${ctx.message.reply_to_message.text}, а ти купи /*something*/`);
  } else if (!input) {
    ctx.reply(
      'Для того, щоб зіграти в слона необхідно написати текст після команди /elephant, або відповісти на будь-яке повідомлення цього бота відповідним текстом.');
  } else {
    ctx.reply(`Всі кажуть ${input}, а ти купи /*something*/`);
  }
});

let isFirstTime = true;
bot.command('joke', ctx => {
  if (isFirstTime) {
    ctx.reply('Хочу вибачитись наперед',
      { reply_to_message_id: ctx.message.message_id });
    isFirstTime = false;
  }
	
  if (Math.random() < 0.15) {
    ctx.reply(getRandElement(myArrs.SubjectsArr),
      getRandElement(myArrs.ActionsArr) +
      ((Math.random() < 0.1) ? '. Ось така хуйня, малята.' : '')
    );
  } else if (Math.random() < 0.25) {
    ctx.replyWithPhoto({ url: getRandElement(myArrs.FunnyPicturesArr) });
  } else {
    ctx.reply(getRandElement(myArrs.PunsArr));
  }
});

bot.command('e', async ctx => {
  let input = ctx.message.text.substring(3);

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) {
  	if ((!input && reply.text.includes('=')) || input === 'ascode')
  	  input = reply.text;
  	else if (isNaN(reply.text) && !reply.text.includes('='))
  	  input = '(`' + reply.text + '`)' + input;
  	else if (reply.text.includes('='))
  	  input = '(' + reply.text + ')' + input;
    else input = '(' + reply.text + ')' + input;
  }

  console.log('input:', input, 
    '\nchat.id:', ctx.chat.id,
    '\nfrom.username:', ctx.message.from.username,
    '\nName:', ctx.message.from.first_name, ctx.message.from.last_name, '\n');

  if (!input) {
  	ctx.reply('Так а вхідні дані не задано :/',
  	  { reply_to_message_id: ctx.message.message_id });
  	return;
  }

  let result = 'Щось пішло не так...';

  const BlackList = ['process', 'require', 'exit', 'import', '/*', '*/', 'eval',
  'for', 'ctx', 'while', 'request', 'Array', 'repeat', 'open', 'close', 'this',
  'JSON', 'bot', 'ping', 'function', 'prototype', 'console'];
  const CheckForbiddenWords = () => {
    for (const el of BlackList) {
      if (input.includes(el)) {
  		result = el + ' is forbidden';
		return;
      }
    }
    result = safeEval(input.toString()).toString();
  };

  try {
    CheckForbiddenWords();
    result = ClarifyVoid();
  	ctx.reply(result, { reply_to_message_id: ctx.message.message_id });
  } catch (e) {
  	console.log(e.message);
  	ctx.reply(e.message);
  }
}); //виконує заданий код (якщо він не містить нічого потенційно шкідливого) і відсилає повідомлення результату

bot.command('dmytr', ctx => {
  const randVowel = () => getRandElement('аоуеиі');
  const randConsonant = () => getRandElement('йцкнгшщзхфвпрлджчсмтб');

  ctx.reply('Ре' + randConsonant() + randVowel() + randConsonant() + randVowel() + 'нський');
});

bot.command('zhevyi', async ctx => {
  const sleep = ms => new Promise (resolve => setTimeout(resolve, ms));

  ctx.reply('Йа же-ВИЙ!');
  await sleep(1000);
  ctx.reply('Йа віль-НИЙ!');
  await sleep(1000);
  ctx.reply('Йамотіватор!');
});

/*bot.command('g', async ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  console.log(input);

  async function wa(request) {
    try {
      const result = await gApi.getShort(request);
      await ctx.reply(result);
    } catch (err) {
      if (err.message.includes('Коротка відповідь недоступна')) {
        try {
          await ctx.reply('Кидаю фотку');
          const result = await gApi.getSimple(request); // URI (with suffix)
          const base64 = result.toString().replace(/^.{22}/, '');
          await ctx.replyWithPhoto({ source: Buffer.from(base64, 'base64') });
        } catch (err) {
          await ctx.reply(err.message);
        }
      } else await ctx.reply(err.message);
    }
  }
});*/ //команда в процесі розробки. хто знає як брати результати пошуку з гуглу - help

bot.command('rand', ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (!isNaN(parseInt(input, 10))) ctx.reply(Math.random() * parseInt(input, 10));
  else ctx.reply(Math.random());
});

bot.command('wiki', async ctx => { /*by nocommas555, mutated by ne_vlad_ip_04*/
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  if (input && /[a-z]/i.test(input)) try {
    async function wiki_search(){
    //const q = 'node.js'
    let response = await fetch('https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&srlimit=5&srsearch='+input)
    response = await response.json()

    for (const res of response["query"]["search"])
    {
      let ret = stripHtml(res["snippet"]).result+"\n"
      //if (!res["snippet"].toLowerCase().includes(res["title"].toLowerCase()))
        ret = res['title'] + " - " + ret 

      ctx.reply(ret);
    }
    }
    try {wiki_search() } catch (e) { console.log(e.message); };
  } catch (e) { console.log(e.message); };
}); //видає рандомну частину визначення зі статті, що містить input. нащо - хз, але прикольно

bot.command('transliterate', ctx => {
  let input = ctx.message.text.substring(15);

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) input = reply.text;

  input = ClarifyVoid(input);

  //tmalss, I have 2 arrays with corresponding letters (or groups of letters) by posisions
  const Uk = ['а', 'б', 'ц', ...];
  const En = ['a', 'b', 'c', ...];

  const ReplaceAll = (orgnlStr, search, replacement) => {
    if (orgnlStr.includes(search)) {
      return orgnlStr.split(search).join(replacement);
    } else return orgnlStr;
  }; //could be replaced by method  .replaceAll()  if supported

  const Transliterate = text => {
    let newTxt = ' ' + text;
    if ((/[a-z]/i).test(text)) {
      //have to replce these letters by hand, cause otherwise it`s complicated
      newTxt = replaceAll(newTxt, 'Th', 'Т');
      newTxt = replaceAll(newTxt, 'Ph', 'Ф');
      newTxt = replaceAll(newTxt, 'th', 'т');
      newTxt = replaceAll(newTxt, 'ph', 'ф');
      for (let i = 0; i < En.length; i++) {
        newTxt = ReplaceAll(newTxt, En[i], Uk[i]);
      }
      return ReplaceAll(newTxt, '\'', '');
    } else if ((/[а-їґ]/i).test(text)) {
      for (let i = 0; i < Uk.length; i++) {
        newTxt = ReplaceAll(newTxt, Uk[i], En[i]);
      }
      return newTxt;
    } else if (text) {
      return text;
    } else {
      return 'Некоректні вхідні дані.\nIncorrect input.';
    }
  };

  const TRCEW = input => { //Translit Regarding Case Every Word
    const LineArr = input.split('\n');
    const MLA = []; //modified LineArray
    for (let line of LineArr) {
      const WordArr = line.split(' ');
      const MWA = []; //modified WordArray
      for (let word of WordArr) {
        if (word === word.toUpperCase() && word.length !== 1)
          word = Transliterate(' ' + word.toLowerCase()).trim().toUpperCase();
        else word = Transliterate(' ' + word).trim();
        MWA.push(word);
      }
      line = MWA.join(' ');
      MLA.push(line);
    }
    return MLA.join('\n');
  };

  ctx.reply(TRCEW(input));
});

bot.command('hoiku', ctx => {
  let input = ctx.message.text.split(' ').slice(1).join(' ');

  const reply = ctx.message.reply_to_message;
  if (reply && reply.text) input = reply.text;

  const SyllCount = text =>
    text.toLowerCase()
      .split('')
      .filter(letter => 'eyuioaаоуеиіяюєїёыэꙇꙗѥѵѢ'.split('').some(el => el === letter))
      .join('').length;

  const HoikuCheck = x => {
    if (SyllCount(x) === 17) {
      const WordArr = x.split(' ');

      let hoiku = '';
      let sc = 0;
      let lnCount = 1;
    
      for (const word of WordArr) {
        sc += SyllCount(word);
        if (sc <= 5 && (lnCount === 1 || lnCount === 3) ||
            sc <= 7 && lnCount === 2) {
          hoiku += word + ' ';
          //console.log(hoiku, '\n');
          if (sc === 5 && lnCount !== 2 ||
          	sc === 7 && lnCount === 2) {
            hoiku += '\n';
            lnCount++;
            sc = 0;
          }
        } else return 'Це не хоку (';
      }
      return 'Так, це хоку:\n\n' + hoiku;
    } else return 'Це не хоку (';
  };

  ctx.reply(HoikuCheck(input), { reply_to_message_id: ctx.message.message_id });
});

bot.command('giveinfo', async ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');

  console.log('input: ' + input);
  console.log('Chat_ID: ' + ctx.chat.id);
  console.log('User_ID: ' + ctx.message.from.id);
  console.log('from.username: ' + ctx.message.from.username);
  console.log('Name: ' + ctx.message.from.first_name, ctx.message.from.last_name);
  console.log(' ');
}); //just for testing

bot.hears('слон', ctx => ctx.reply('А го зіграєм'));

bot.on('message', ctx => {
  const syllCount = text =>
    text.toLowerCase()
      .split('')
      .filter(
        letter => 'eyuioaаоуеиіяюєїёыэꙇꙗѥѵѢ'.split('')
          .some(el => el === letter))
      .join('').length;

  const hoikuCheck = x => {
    if (syllCount(x) === 17) {
      const wordArr = x.split('\n').join(' ').split(' ');

      let hoiku = '';
      let sc = 0;
      let lnCount = 1;

      for (const word of wordArr) {
        sc += syllCount(word);
        if (sc <= 5 && (lnCount === 1 || lnCount === 3) ||
            sc <= 7 && lnCount === 2) {
          hoiku += word + ' ';
          if (sc === 5 && lnCount !== 2 ||
            sc === 7 && lnCount === 2) {
            hoiku += '\n';
            lnCount++;
            sc = 0;
          }
        }
      }
      return hoiku;
    }
  };

bot.on('message', ctx => {
  try {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from.id === 1642862707) {
      if (Math.random() < 0.1 && !ctx.message.reply_to_message.text.includes('/о')) {
      	ctx.reply(`Всі кажуть ${ctx.message.text}, а ти купи гараж`);
      }
    }
  } catch (e) { console.log(e.message); }
});

bot.launch().then(() => console.log('Bot has successfully started!'));
