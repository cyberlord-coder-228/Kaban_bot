'use strict';

const { Telegraf } = require('telegraf');
const {google} = require('googleapis');
const {stripHtml}= require("string-strip-html");
const fetch = require('node-fetch');
const safeEval = require('safe-eval');

const bot = new Telegraf('1642862707:AAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
//const gApi = new GoogleAPI(process.env.google);


bot.start(ctx => ctx.reply('/*start_phrase*/'));

bot.command('elephant', ctx => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  //ctx.reply('Всі кажуть ' + input + ', а ти купи /*something*/');

  if (!input && ctx.message.reply_to_message) {
    ctx.reply(`Всі кажуть ${ctx.message.reply_to_message.text}, а ти купи /*something*/`);
  } else if (!input) {
    ctx.reply('Для того, щоб зіграти в слона необхідно написати текст після команди /elephant, або відповісти на будь-яке повідомлення цього бота відповідним текстом.');
  } else {
    ctx.reply(`Всі кажуть ${input}, а ти купи /*something*/`);
  }
});

const getRandElement = arr => arr[Math.floor(Math.random() * arr.length)];

let isFirstTime = true;
bot.command('joke', ctx => {
  if (isFirstTime) {
    ctx.reply('Хочу вибачитись наперед', { reply_to_message_id: ctx.message.message_id });
    isFirstTime = false;
  }
  if (Math.random() < 0.75) {
    const SubjectsArr = [...]; // тут всі можливі підмети

    const ActionsArr = [...]; // тут всі можливі присудки

    ctx.reply(getRandElement(SubjectsArr) +
        ' ' +  getRandElement(ActionsArr) +
        ((Math.random() < 0.1) ? '/*your phrase*/' : '')
    ); //результат - просте речення типу "колобок втопився", яке може бути чи не бути смішним, залежно від ступеню хворобливості вашого почуття гумору
  } else if (Math.random() < 0.2) {
  	const FunnyPicturesArr = [...]; //тут посилання на смішняві картинки
  	ctx.replyWithPhoto({url:getRandElement(FunnyPicturesArr)});
  } else {
    const PunsArr = [...];
    ctx.reply(getRandElement(PunsArr)); //результат - один з наперед заготованих панчлайнів
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
  }

  const CheckVoid = () => {
  	if (result === undefined)
  		result = 'undefined';
  	else if (result === null)
  		result ='null';
  	else if (result === '')
  		result = 'empty string'
  	else if (result.toString().match(/^[\s]*$/))
  		result = 'whitespace';
  }

  try {
    CheckForbiddenWords();
  	CheckVoid();
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
  try {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from.id === 1642862707) {
      if (Math.random() < 0.1 && !ctx.message.reply_to_message.text.includes('/о')) {
      	ctx.reply(`Всі кажуть ${ctx.message.text}, а ти купи гараж`);
      }
    }
  } catch (e) { console.log(e.message); }
});

bot.launch().then(() => console.log('Bot has successfully started!'));