'use strict';

export const subjectsArr = [
  'Карась',
  'Їжачок',
  'Колобок',
  'Мудрець',
  'Яша Лава',
];

export const actionsArr = [
  '',
  'подумав',
  'накурився',
  'повішався',
  'здав шемса',
  'викопав Яму',
  'купив гараж',
  'продав гараж',
  'пересолив чай',
  'здав металолом',
  'спікся на сонці',
  'підсів на цукор',
  'поїхав в Ужгород',
  'сказав: "Хочю пева"',
  'купив рево по знижці',
  '...ну не смішно ж...',
  'написав бота для Телеграму',
  'вколов собі інсулін. Мабуть',
  'перепросив за дибільний жарт',
  'пішов грітися в куток кімнати',
  'позбавився від недругів за допомогою дружби',
  'вступив до найкращого технічного ВНЗ України',
  '... ахахахахгхавага... лол, перепрошую, дуже смішний жарт',
  'продав пилосос. Бо він у нього в хаті просто пилюку збирав',
  `зварив ${(Math.random() < 0.5) ? 'борщ' : 'кристалічний метамфітамін'}`,
  `сказав: "Хотів би я жити в нордичній країні${(Math.random() < 0.5) ? ', бо тут пиздець спекотно' : ' - їх прапори це просто суцільний плюс'}"`,
];

export const funnyPicturesArr = [
  'https://i.redd.it/d4e5z2xmc0j61.png', // firefox logo
  'https://i.ibb.co/2qJRC2j/FB-IMG-1605110116418.jpg', // bad abbreviations
  'https://imageproxy.ifunny.co/crop:x-20,resize:640x,quality:90x75/images/4bf192f6c77a04e739e9a667223ff2e9de91542521b02245a5b79b472465b5ba_1.jpg', // trajectory explanation
  'https://i.redd.it/9mn2ak9ycx951.png', // cybertruck
  'https://i.redd.it/wgn5om6gk0j61.png', // what people think programmers do
  'https://i.redd.it/laup7xtm80j61.jpg', // never spend 6 minutes
  'https://i.redd.it/szlaz4r5i0j61.png', // regexp scary
  'https://i.redd.it/9vyagp82s0j61.png', // how programmers commit
  'https://i.redd.it/8d5em6im7fj61.jpg', // compiled with warning == succesfully
  'https://i.redd.it/tgsu0jpfvfj61.jpg', // bagnet
  'https://external-preview.redd.it/k6iOZ1Py9rYQbzpcosESBNFMMg3C5mH_q1bmxiFfZ2M.jpg?auto=webp&s=73c8b00b1dce36641a13070b4b8ed142e4063c8b', // programming alone vs with overseer
  'https://i.redd.it/k27xl646ork61.png', // just suggest javascrript
  'https://i.redd.it/05qc4f3ie8l61.png', // strings are just arrays
  'https://external-preview.redd.it/8zyEsa_XwW8t1p8UbCs3KeHIOONObl3NeSxkYkmUUD8.jpg?auto=webp&s=9f90bfa52993cc4f0cb6a45ce96fe524399f3e3d', // le var
  'https://i.redd.it/smo3u8litsu61.jpg', // 1/3 understands regexps. no, 1/4
  'https://i.redd.it/fw6hoxn4wxu61.png', // I dunno, I didnt write it
  'https://i.redd.it/933hjsu6gtu61.jpg', // google translate (thicc)
  'https://preview.redd.it/d6y14ykp2xu61.jpg?width=960&crop=smart&auto=webp&s=1c1bf5185913160becc5ab270821ddf7efbc0af7', // just brainfuck script
  'https://preview.redd.it/oy44rt9wgtu61.jpg?width=960&crop=smart&auto=webp&s=37742335818a71898fb1d33e9a110e031ab71593', // java script hello world (java script == java)
  'https://preview.redd.it/fthyi2s41cv61.jpg?width=640&crop=smart&auto=webp&s=654e192acbfb882a7193b5b8b6b425d811eb426a', // visit xhamster
  'https://i.redd.it/zrcwdwj0ebv61.jpg', // front-end flert
  'https://preview.redd.it/paia1ub8v8v61.jpg?width=640&crop=smart&auto=webp&s=72b3ece06459f328832e38c7fbf20090121b1b1c', // session with priest for gay son
  'https://i.redd.it/6gntablsr5u61.jpg', // schools and students "yes, honey"
  'https://preview.redd.it/qwg2as8bg5u61.png?width=960&crop=smart&auto=webp&s=b12c241bd1119f09053e498a3db1d757d5fb0892', // un nuage en forme de ...
  'https://i.redd.it/3axbn827n4u61.jpg', // have you seen this cat
  'https://preview.redd.it/xcbhfhcpsrt61.jpg?width=640&crop=smart&auto=webp&s=7cfcb9ad328c35b96708289f34df2ae05d374328', // mozzarella
  'https://preview.redd.it/uljms6n8der61.jpg?width=640&crop=smart&auto=webp&s=3ce3349e7705f8405a92de3a0e253501ef5ae317', // im_saved.pdf
  'https://i.redd.it/3r7fffazpkq61.jpg', // difference between toilet paper and curtain
  'https://preview.redd.it/jylwk1qrl5q61.jpg?width=960&crop=smart&auto=webp&s=52d2d4de076689e08a84912d732f8fe9f7b2851b', // gf an bc pros and cons
  'https://i.natgeofe.com/n/c0e0a134-3e97-4b8f-9f7b-9d11f5e1bf02/comedy-wildlife-awards-squirel-stop.jpg?w=636&h=475', // just a squirell
  'https://i.pinimg.com/originals/75/9b/b4/759bb4497d0b13c3f9d86d9b42ba82e8.jpg', // free wifi bruh
  'https://images.theconversation.com/files/135250/original/image-20160824-30216-zdyfu.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip', // HA-HA-HA HA!!
  'https://teamjimmyjoe.com/wp-content/uploads/2020/04/funny-memes-mona-lisa-cornalisa-art-historu.jpg', // mona lisa in a gas mask
  'https://images.routledge.com/common/jackets/crclarge/978041583/9780415835190.jpg', // "the language of jokes in the digital age" (book)
  'https://upload.wikimedia.org/wikipedia/commons/e/e4/Eduard_von_Gr%C3%BCtzner_Falstaff.jpg', // fat dude painting
  'https://i.redd.it/bpca3nkj7f081.jpg', // delete 150 lines to replace with 15
];

export const punsArr = [
  '/джоке',
  'ur life',
  '🐴\nJuan',
  '( . Y . )',
  'HappyCock',
  'b a n a n a',
  'В тебе спина біла.',
  'Coffee Afroamerikano',
  'Cock flavored chicken',
  'C2H5OH. Хто знає, той знає.',
  'В тебе коліна ззаду грязні.',
  'Про колобка я вже розказував?',
  '@MrPaschenko_bot, розкажи жарт',
  // 'Індія.\nНі, блять, Аутвідпочинок.',
  'Давні єгиптяни були бісовими фуррі',
  'Як називати жінку хіпі? Місісхіпі?',
  'Жарт? Я не знаю, нехай німець скаже',
  'Прийшла пора постіронії\n\n 😺\nпес',
  'Є 10 типи людей', '4° - чювак на кортах',
  '("a" + + "a" + "a" + "s").toLowerCase();',
  'Хто переможе, Бетмен, Росомаха, чи Дедпул?',
  'Знаєте яка улюблена їжа робота? Мікрочипси',
  'Расизм прямо як негри.\nНе повинен існувати',
  'Всі узагальнення неправильні.\nВключаючи це',
  'Я б розказав музичний жарт, але це вже баян.',
  'Знаєте чому рослини зелені? Бо юні, дурні...',
  'Перекладіть українською:\n"On the roof I am"',
  'Front-end. Cause front-end is some kinda joke.',
  '🤌🤌🤌🤌🤌🤌🤌, перепрошую за мою Італійську.',
  'Чи їдять Французи, що люблять фастфуд равликів?',
  'Ліфт, останній поверх.\n– Вам вниз?\n– Ні, вбік!',
  'Як гори залишаються теплими взимку? Сніжні шапки.',
  'Знаєте звідки в мене ці шрами?\nHeck, wrong joker.',
  `*${(Math.random() < 0.5) ? 'не' : ''}смішний жарт*`,
  `('A' + + 'a').replace('N', 'n').replace('N', 'l');`,
  'Ваше тіло це 3D принтер, що повільно друкує волосся',
  'Захожу я якось до вірменів, а там гра у нарди гараж.',
  'Завжди пам\'ятатайте, що ви унікальні. Як і всі інші.',
  'На жаль, твоя чарівна мати спить, тому жарту не буде.',
  'Що краще: сім дір у голові, чи корж на сонці печений?',
  '-Опишіть себе двома словами.\n-Лінивий.\n-Це одне.\n-...',
  'Хочу сказати людині, що винайшла нуль: "Дякую за нічого"',
  'Чи є те расизмом, що ми називаємо Сонце "жовтим карликом"?',
  'Заходить якось чоловік в бар, і каже:\n-Налийте мені пива.',
  'Чи помруть вегетаріанці з голоду, якщо вони стануть зомбі?',
  'I have a girl, but she\'s from another nation. Imagi nation.',
  'Не викупаю цього хейту Чорногорців. Вони ж нічого не зробили',
  'Знаєте якою мовою в світі розмовляють найменше? Мовою жестів.',
  'Чому коал не вважають ведмедями? Вони не пройшли куаліфікацію',
  '"Креативність - це вміння не виказувати джерела."\n©Невідомий',
  'Ви знали, що окрім поняття Guinea Pig є ще поняття Guinea Hog?',
  'Якого композитора найбільше не люблять повітряні кульки? Баха.',
  'Знаєте чому у горил такі великі ніздрі? Бо у них великі пальці',
  '-Дайте мені книги про параною\n-*пошепки*\nВони прямо позаду вас',
  'Якщо студент не хоче вчитися, значить погано працює військкомат.',
  'Знаєте який рекорд Чорногорії в 100 метровому забізі?\n36 метрів',
  'Ви чули про ресторан на Марсі?\nЇжа смачна, але немає атмосфери...',
  '"Якщо українець мовчить, то краще його не перебивати"\n©Іван Сірко',
  'Запускаю я якось ноут, а там Вінда оновлюється. А, стоп, це не жарт',
  'Зловив мужик золоту рибку. Почистив акваріум. І відпустив її назад.',
  '-Лікарю, в мене болить спина, якщо я роблю ось так…\n-Не робіть так.',
  'Хтось викликає радість куди б він не йшов, а хтось коли б він не йшов',
  'Прямокутник - це чотирикутник всі кути якого == 69 + 420 / (9 + 11) °',
  'Чому чоловіка вдарило струмом в потязі?\nБо він був гарним провідником',
  'Я не можу показати той прикол з пальчиком, тому вмикайте уяву:\n👆 ігого',
  'А ви знали, що шульги зазвичай пишуть набагато краще, ніж люди без рук?',
  'Кажуть, гарного батька важко знайти. Але поганого батька знайти ще важче',
  'Хотів навчитися грати на баяні. Не зміг знайти ноти для сучасної музики.',
  'Жарт сказаний 10 разів - заїжджений, жарт сказаний 10 000 разів - класика',
  'Перший прояв божевілля - це говорити з самим собою.\nДругий - відповідати',
  'Тут є люди з почуттям гумору?\nРозкажіть жарт за мене, бо мені трохе влом',
  `Переможцем гри у хованки оголошено " ${(Math.random() < 0.5) ? ';' : '}'} "`,
  'Якщо не все виходить у вас з першого разу, то з парашутом краще не стрибати',
  'Якщо натиснути всі три педалі автомобіля одночасно, то машина зробить скріншот',
  '(\'@\' + \'ya\' + \'b\'.match(/[a]/i) + \'ya\').replace(\'ll\', false + true);',
  'У Кримських студентів є перевага, бо вони можуть черпати воду прямо з диплому.',
  '"Якщо вугілля з вами говорить, перевірте, чи воно дихає."\n©Дмитро Гачімучський',
  'Не хочу хвалитись, але я зібрав пазл за 1 день. Хоча на коробці написани 3-4 роки)',
  'Чоловіку, що двічі закінчив життя самогубством, дали пожиттєвий термін ув\'язнення',
  'Знаєте чому тоблерони роблять у формі призми?\nБо інакше вони не влізуть в коробку.',
  'Дзвонив у лінію підтримки самогубців в Ірані. Спитали чи не боюсь я літати в літаках',
  'Знаєте чого американці не переходять з паундів на кілограми? Бо буде масова плутанина',
  'Купив собі комп\'ютер для ґеймінгу. Як виявилось комп\'ютер для цього не обов\'язковий.',
  `Знаєте яке слово найстрашніше в ядерній фізиці? "${(Math.random() < 0.5) ? 'Ой' : 'Бля'}".`,
  'Мій дід мав серце лева, і пожиттєву заборону на відвідування Черкаського міського зоопарку',
  'Знаєте що таке безумство? Повторення однієї й тієї ж дії в очікуванні на зміну результату.',
  'Мало хто знає, але насправді 99.9% всієї маси Сонячної системи сконцентровано в твоїй мамці',
  'З точки зору кодера стакан не напівпустий, ані напівповний: він у два рази більший ніж треба',
  'Одного разу кодер застряг у душі через інструкції на шампуневі: "Нанесіть, змийте, повторіть"',
  'Մենք նստում ենք նարդի խաղացող տղամարդկանց հետ, իսկ հետո ինչ-որ մեկը գալիս է մեզ մոտ և ավտոտնակ',
  'Алгоритм - слово, яке використовують кодописці на позначення того, що вони не хочуть пояснювати',
  'Знаєте що таке зворотній екзорцизм?\nЦе коли демон каже священнику залишити тіло дитини у спокої',
  'Практика доводить ваші навички до ідеалу.\nАле оскільки ніщо не ідеальне, навіщо практикуватись?',
  '"Я би написав жарт про Усейна Болта, проте, боюсь, що ви його би не догнали"\n©Дмитро Репупченський',
  'При прийомі на роботу в Фейсбук не питають "Розкажіть про себе". Фейсбук знає все без лишніх питань',
  'Знаєте що стоїть у чорногорця біля ліжка? Стілець. Щоб він міг відпочити від лежання, коли втомиться.',
  'Знаєте яка різниця між Ісусом і картиною Ісуса?\nДля того, щоб прибити картину потрібен лише один цвях',
  'Заходить нескінченна кількість математиків в бар, і один із них каже:\n"Нам 2 келиха пива, будь ласка"',
  `Добре, але спочатку дайте мені визначення жарту. Розкажіть ідеальний жарт, він буде взятий за стандарт`,
  'Знаєте чого краще позичати гроші у песимістів? Бо вони не будуть очікувати, що ви їх реально повернете',
  'Якщо ви думали, що список жартів буде оновлюватись, то ви помилялись. І це не жарт. Серйозно. Зупиніться.',
  'Я сподіваюсь ви розумієте, що в цього бота немає ані самосвідомості, ані почуття краси, гумору чи естетики',
  'Вчора витратив цілий день на те, шоб зробити пасок із старих годинників. Як виявилось просто змарнував час.',
  `Знаєте як вимкнути світло без рук?\n${(Math.random() < 0.5) ? 'Метанол' : 'Не знаєте? Користуйтесь головою'}`,
  'Мені сказали\n"Ти ніколи не досягнеш успіху, якщо будеш стільки прокрастинувати"\nЯ відповів\n"Просто зачекай"',
  `Хотів розказати хімічний жарт, але не розкажу, бо ${Math.random() < 0.5 ? 'мовчання - золото' : 'хіміки підараси'}.`,
  '99 little bugs in the code,\n99 little bugs in the code.\nTake one down, patch it around\n117 little bugs in the code.',
  'Гумор — інтелектуальна здатність вбачати в предметах смішне[1], властивість відчуттів викликати сміх, надавати розвагу.',
  'Існує 4 основних типа кодерів:\nFront-end develooper\nBack-end develooper\nFull-stack develooper\nCtrl-C Ctrl-V developer',
  'Свідки Єгови не приймають колядників. Мабуть їм просто не подобається, коли якісь рандомні чели приходять до них під двері',
  'Скажи людині, що у всесвіті 300 мільярдів зірок, і вона повірить. Скажи їй, що лавочка пофарбована, і їй треба буде це перевірити.',
  'Суд.\n– Свідку, що Ви робили 16 березня 2016 року об 11 годині 42 хвилині?\n– Ну, я сидів у кріслі, дивився на календар і годинник!',
  '"Буквар придумали для тих, хто не вміє читати. TikTok придумали для тих, хто хто хто хто хто хто хто *ритмічна музика*"\nВідомий Класик',
  'А у вас теж таке було що ви заклеюєте камеру ноутбука перед тим як подрочити щоб вас не бачили, але це не допомагає, тому що ви сидите в інтернет-кафе?',
  `Гумор часто не є універсальним і не переноситься з однієї культури в іншу, зазвичай через те, що залежить від деталей конкретного культурного оточення.`,
  'Перший презерватив був винайдений ірландцями, вони використовували для цього овечі кишки. Потім цю ідею перейняли і трохи модернізували англійці, вийнявши кишки з вівці',
  `Заходить якось чекіст і поляк в бар. А виходить тільки чекіст. ${(Math.random() < 0.5) ? '' : 'Але не турбуйтесь, партія вже оголосила в розшук німця, що проводив розстріл.'}`,
  'Зламався у мене якось синтезатор мовлення - .- -.-    -.-- .-    -.-- --- .... ---    --..    - -.-- -.- ....    .--. .. .-.    ..    -. .    .--. --- .-.. .- .... --- -.. -.-- ...-', // cringe
  'Жарт, смішок або рідше шу́тка — фраза або параграф з гумористичним змістом. Може бути у формі невеликого оповідання або запитання. Жарти можуть використовувати постіронію, сарказм, каламбур або інші подібні засоби.',
];

export const quotesArr = [
  '"Україна та Індія, як брат сестрі"\n©Вован Вовк',
  '"Зорі встають тоді, коли і Місяць"\n©Народна мудрість',
  '"Чоловік не той, хто жінка, а той, хто чоловік."\n©Невідомий',
  '"Простата брата солодка, як цукрова вата"\n©Олександр Вовчиня',
  '"Світло бачиться тоді, коли світло в очах є"\n©Григорій Сковорода',
  '"Найганебніще для пацана - нелюбити Україну"\n©Пацанська творчість',
  '"Книжки Авраменка - Біблія української мови"\n©Борис Грей-Вовський',
  '"Якщо українець мовчить, то краще його не перебивати"\n©Іван Сірко',
  '"Справжня мова - отця мати брата троюрідного діда"\n©Тарас Вовченко',
  '"Життя без України, як чай без заварки"\n©Пацанська народна творчість',
  '"Краще один день говорити, ніж сто років мовчати"\n©Григорій Вовкодав',
  '"Тихо говорять українською, а голосно тільки шепочуть"\n©Олеся Собачак',
  '"День без Сонця - це ніч.\nЖиття без України - це тьма."\n©Семен Вовчура',
  '"Хотів би я мати статеві відносини з підручником"\n©Олександр Вовчаненко',
  'Студентським гуртожиткам присвячується\n"Нормальні хати, щоб поспати"\n©УЗВАР',
  '"Україна має вихід до моря, зате океан хотів би вийти до України"\n©Мацацура Вовчун',
  '"Плекаймо українську мову, як лелеки плекають колеса на стовбах"\n©Волдодимир Псенко',
  '"Якщо тебе змусять обирати між дівчиною та Україною, ти знаєш що вибрати"\n©Невідомий поц',
  '"Кожен українець любить Україну набагато сильніше, ніж країну  свого народження"\n©Остап Вовчера',
  '"Українська мова слабше англійської чи французької, зате в цирку не виступає"\n©Народна творчість',
  '"Якщо людина каже, що не знає що таке любов, значить вона не любить Україну"\n©Парубоцьке прислів\'я',
  '"Є лише дві цінності, які ми можемо передати своїм дітям. Одна з них - мівіна, інша - рево."\n©Вольфган Шмідт',
  // '"Для чипування українців довелось суттєво апгрейдити обладнання, адже середній рівень IQ українця є значно вищим за IQ будь-якого іншоло мешканця Землі"\n©Біл Гейтс',
];

export const answersArr = [
  '+',
  '-',
  '+-',
  '~~~',
  'Це точно',
  'Імовірно',
  'Сумніваюсь',
  'Скоріше так',
  'Я... не знаю.',
  'Запитай пізніше',
  'Потенціал гарний',
  'Сорі, я не слухав',
  'Не розраховуй на це',
  '*рандомна відповідь*',
  'Мої джерела кажуть -3',
  'Питання нецікаве, лол',
  'Краще поїдь в Козятин.',
  'Хз, я ж не Нострадамус...',
  'Зірки кажуть "стап токінг"',
  'Смутно бачу.... перепитай ще',
  'Так.\nХа. Обманув. Я не знаю',
  'Знаки вказуюють на "пішов нах"',
  'Ну, ти можеш на це сподіватися',
  'А більш тобі нічого не сказати?',
  'Не можу передбачити це прямо зараз',
  'Зірки кажуть "Пора змінити дедлайн"',
  'Сконцентруйся, і подумай своєю головою',
  'Сьогоднішній характер: непердбачуваний',
  'Скоріше, я зроблю вигляд, що цього не чув',
  'Хм... Складне питання... Треба подумати...',
  'А може тобі ще сказати де гроші в хаті заховані?',
  'Math.random() < 0.5 ? "Нецікаво" : "Мені байдуже"',
  'Краще підкинь монетку - отримаєш більш надійну відповідь.',
  'А тобі потужності мізків не вистачає самотужки додуматись?',
  'Може я просто проігнорую твоє питання? Чудова ідея, так і зроблю.',
  'Впринципі, непогане запитання, але вважаймо, що ніхто цього не казав',
  'Питання цікаве, але я б на твому місці краще задонатив би @MrPaschenko_bot\'у',
  'Так а я звідки знаю? Я ж всього-навсього алгоритм запрограмований відподвідати рандомну хрінь.',
];

// export default {
//   subjectsArr,
//   actionsArr,
//   funnyPicturesArr,
//   punsArr,
//   quotesArr,
//   answersArr,
// };
