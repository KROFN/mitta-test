// GitHub Pages / subpath-safe base detection.
// Example: /mitta-test/assets/site.js -> BASE = /mitta-test
const SCRIPT_URL=document.currentScript?.src||'';
const SCRIPT_PATH=SCRIPT_URL?new URL(SCRIPT_URL,location.href).pathname:'';
const AUTO_BASE=SCRIPT_PATH.replace(/\/assets\/site\.js$/,'');
const BASE=(window.__MITTA_BASE!==undefined?window.__MITTA_BASE:AUTO_BASE).replace(/\/+$/,'');
const route=(p='/')=>`${BASE}${p.startsWith('/')?p:`/${p}`}`;
const A=(window.__MITTA_ASSET_BASE||route('/assets/images/'));
const M=(name)=>A+'media/'+name+'.jpg';
const catalogImageMap={kotenok:M('kotenok-catalog'),'adam-1':M('adam-catalog')};
const media={
  hero:M('hall-sofas-main'),
  bridge:M('hall-beds-row'),
  showroom:M('hall-sofas-mustard'),
  storeHero:M('hall-beds-color'),
  storeBed:M('hall-bedroom-sets'),
  storeCorner:M('hall-bed-corner'),
  storeKitchen:M('hall-kitchen-display'),
  storeSofas:M('hall-sofas-row'),
  storeWood:M('hall-stools'),
  storeMattress:M('hall-mattresses')
};

const PRIMARY_PHONE={display:'+7 919 065-85-85',tel:'+79190658585'};
const WHATSAPP_PHONE='79190658585';
const whatsappLink=(text='')=>`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}${text?`&text=${encodeURIComponent(text)}`:''}`;

const cats=[
  {key:'living',name:'Гостиные / модульные системы',short:'Гостиные',desc:'Стенки, витрины и модульные композиции',image:M('living-wall-1'),num:'01'},
  {key:'bedroom',name:'Спальни и кровати',short:'Спальни и кровати',desc:'Кровати, гарнитуры и матрасы',image:M('hall-bed-blue'),num:'02'},
  {key:'kitchen',name:'Кухни',short:'Кухни',desc:'Готовые решения и кухни под заказ',image:M('hall-kitchen-display'),num:'03'},
  {key:'kids',name:'Детская мебель',short:'Детская мебель',desc:'Кровати-чердаки, столы и системы хранения',image:M('mija-a-2'),num:'04'},
  {key:'upholstered',name:'Мягкая мебель',short:'Мягкая мебель',desc:'Прямые, угловые и модульные диваны, кресла',image:M('hall-sofas-mustard'),num:'05'},
  {key:'storage',name:'Прихожие / шкафы / хранение',short:'Прихожие / шкафы',desc:'Прихожие, шкафы, комоды и тумбы',image:M('mori-hall-green'),num:'06'},
  {key:'tables',name:'Столы и стулья',short:'Столы и стулья',desc:'Обеденные, письменные и трансформируемые столы',image:M('hall-tables'),num:'07'},
  {key:'garden',name:'Дача / сад / особые материалы',short:'Дача / сад',desc:'Массив, лофт, ротанг и мебель для дачи',image:M('hall-stools-set'),num:'08'}
];

const products=[
  {
    slug:'vendetta-1600',name:'Интерьерная кровать «Вендетта» 1600',category:'bedroom',cat:'Спальни и кровати',tagline:'Подъёмный механизм · спальное место 1600 × 2000 мм',images:[],
    price:{kind:'exact',value:27600,note:'историческая цена из карточки Яндекс; блок помечен как давно не обновлявшийся'},
    specs:[['Тип','Интерьерная кровать'],['Подъёмный механизм','Есть'],['Спальное место','1600 × 2000 мм'],['Цвет','Глубокий синий']],
    description:'Интерьерная кровать с подъёмным механизмом и спальным местом 1600 × 2000 мм.',
    sourceLabel:'Карточка «Товары и услуги» Яндекс Карт; актуальность цены не подтверждена',sourceRefs:['S2.1','F30'],updated:null
  },
  {
    slug:'kotenok',name:'Набор детский «Котёнок»',category:'kids',cat:'Детская мебель',tagline:'Столик-трюмо и стульчик · ЛДСП · зеркало',images:[M('kotenok-1')],fit:'contain',article:'MK-0016.1796',price:{kind:'ask'},
    specs:[['Размеры','37 × 60 × 112 см'],['Материал корпуса','ЛДСП 16 мм'],['Материал фасада','ЛДСП, принтер «зеркало»'],['Гарантия','24 месяца'],['Макс. нагрузка на ящик','15 кг'],['Направляющие','Роликовые, без доводчиков'],['Установка','Рекомендуется крепить к стене'],['Производство','Россия']],
    bullets:['В комплекте: столик-трюмо с ящиком и полкой — 1120 × 600 × 366 мм','Стульчик — 570 × 310 × 380 мм','Гарантия — 24 месяца'],
    description:'Детский набор со столиком-трюмо, зеркалом, ящиком, полкой и стульчиком.',
    sourceLabel:'Публикация магазина от 10.10.2025',sourceRefs:['news/787'],updated:'10.10.2025'
  },
  {
    slug:'gloria',name:'Кровать двухъярусная «Глория» МилСон',category:'bedroom',cat:'Спальни и кровати',tagline:'Металл · нижнее место 1200 × 2000 мм · матрас отдельно',images:[M('gloria-1')],price:{kind:'ask'},
    specs:[['Тип','Двухъярусная кровать'],['Материал','Металл, металлические трубы'],['Нижнее спальное место','1200 × 2000 мм'],['Верхнее спальное место','90 × 200*'],['Габариты (Ш × Г)','1240 × 2040 мм'],['Высота','940 мм'],['Изголовье','Жёсткое'],['Ящик для хранения','Нет'],['Подъёмный механизм','Нет'],['Матрас','Заказывается отдельно']],
    bullets:['Секционная сборка — можно собрать и разобрать отвёрткой и ключом','Скрытые крепления, без острых углов; заглушки из натурального бука','Износостойкое порошковое покрытие','В публикации магазина заявлены безопасные гипоаллергенные материалы и сертификация'],
    description:'Двухъярусная металлическая кровать с секционной сборкой и жёстким изголовьем.',
    note:'* В источнике верхнее спальное место указано как «90 × 200» без единиц измерения — уточните размер у магазина.',
    sourceLabel:'Публикация магазина от 07.11.2025',sourceRefs:['news/790'],updated:'07.11.2025'
  },
  {
    slug:'laguna',name:'Диван угловой «Лагуна» с оттоманкой',category:'upholstered',cat:'Мягкая мебель',tagline:'Оттоманка 1,5 м · «тик-так» · два ящика для хранения',images:[M('laguna-1'),M('laguna-2'),M('laguna-3'),M('laguna-4'),M('laguna-5')],price:{kind:'from',value:52600,note:'цена на момент публикации, апрель 2025; зависит от категории ткани'},
    specs:[['Тип','Угловой диван с оттоманкой'],['Размер (Ш × Г)','2,5 × 1,55 м'],['Спальное место','2,2 × 1,5 м'],['Оттоманка','1,5 м; установка слева или справа'],['Механизм','«Тик-так»'],['Хранение','Два вместительных ящика'],['Ткани','Разные варианты']],
    bullets:['Механизм «тик-так» без колёсиков, не требует дополнительных деталей','Оттоманку можно установить слева или справа','Два больших ящика для хранения'],
    description:'Угловой диван с оттоманкой 1,5 м, механизмом «тик-так» и двумя ящиками для хранения.',
    sourceLabel:'Публикация магазина от 30.04.2025; фотографии — выставочный зал',sourceRefs:['news/761'],updated:'30.04.2025'
  },
  {
    slug:'mija-a',name:'Кровать-чердак «Мийа-А»',category:'kids',cat:'Детская мебель',tagline:'Спальное место сверху · лестница с ящиками · выдвижной стол',images:[M('mija-a-2'),M('mija-a-1')],price:{kind:'ask'},
    specs:[],
    bullets:['Спальное место, шкафы и рабочая зона объединены в одной конструкции','Внешние детали скруглены и окромлены кромкой толщиной 2 мм','Лестница со встроенными выдвижными ящиками и фрезерованными ручками','Универсальная сборка изделия'],
    description:'Кровать-чердак с рабочим местом и хранением — компактная система для детской комнаты.',
    sourceLabel:'Публикация магазина от 09.07.2024',sourceRefs:['news/743'],updated:'09.07.2024'
  },
  {
    slug:'adam-1',name:'Стол-трансформер «Адам 1»',category:'tables',cat:'Столы и стулья',tagline:'Журнальный → обеденный · ЛДСП 16 мм',images:[M('adam-1'),M('adam-2')],fit:'contain',price:{kind:'exact',value:6800,note:'цена на момент публикации, октябрь 2025'},
    specs:[['Материал','ЛДСП 16 мм'],['Размер в разложенном виде','414 × 1240 × 700 мм'],['Колёсики','Пластик'],['Раскладывание','Поворот столешницы на 90°, подъём и плавное опускание'],['Ориентация сборки','Фиксированная, как на изображении'],['Цвет','Белый рамух / белый рамух']],
    bullets:['В собранном виде работает как журнальный стол, в разложенном — как обеденный','На лицевой стороне столешницы видны три хромированные петли'],
    description:'Стол-трансформер на колёсиках: компактный журнальный формат раскладывается в стол шириной 1240 мм.',
    sourceLabel:'Публикация магазина от 09.10.2025',sourceRefs:['news/786'],updated:'09.10.2025'
  },
  {
    slug:'tv-stands',name:'Тумбы под телевизор',category:'storage',cat:'Прихожие / шкафы / хранение',tagline:'Несколько моделей для организации ТВ-зоны',images:[M('tv-1'),M('tv-2'),M('tv-3')],price:{kind:'ask'},
    specs:[],description:'Подборка напольных и навесных тумб для организации ТВ-зоны.',
    sourceLabel:'Публикация магазина от 20.11.2024',sourceRefs:['news/749'],updated:'20.11.2024'
  },
  {
    slug:'franco',name:'Диван угловой «Франко»',category:'upholstered',cat:'Мягкая мебель',tagline:'Глубокий синий · независимый пружинный блок',images:[M('franco-1'),M('franco-2')],price:{kind:'ask'},
    specs:[['Размер','2,38 × 1,54 м'],['Спальное место','1,4 × 2,0 м'],['Пружины','Независимый пружинный блок']],
    description:'Угловой диван в глубоком синем цвете с независимым пружинным блоком.',
    sourceLabel:'Публикация магазина от 24.10.2022; историческая цена не публикуется',sourceRefs:['news/671'],updated:'24.10.2022'
  },
  {
    slug:'brenta',name:'Спальный гарнитур «Брента»',category:'bedroom',cat:'Спальни и кровати',tagline:'Кровать и шкаф в едином дизайне',images:[M('brenta-1')],price:{kind:'ask'},specs:[],
    description:'Спальный гарнитур с кроватью и шкафом; публикация магазина отмечает возможность менять рисунок фасадов перестановкой элементов.',
    sourceLabel:'Публикация магазина от 23.11.2023',sourceRefs:['news/735'],updated:'23.11.2023'
  },
  {
    slug:'ascella',name:'Подростковая система «Асцелла»',category:'kids',cat:'Детская мебель',tagline:'Спальное место, хранение и рабочий угол',images:[M('ascella-1')],price:{kind:'ask'},specs:[],
    description:'Комплект для подростковой комнаты, объединяющий спальное место, хранение и рабочую зону.',
    sourceLabel:'Публикация магазина от 21.11.2023',sourceRefs:['news/728'],updated:'21.11.2023'
  },
  {
    slug:'versal',name:'Шкаф и кровать «Версаль»',category:'bedroom',cat:'Спальни и кровати',tagline:'Серия в классическом стиле',images:[M('versal-1')],price:{kind:'ask'},specs:[],
    description:'Шкаф и кровать серии «Версаль» в классическом стиле со светлыми фасадами и декоративными деталями.',
    sourceLabel:'Публикация магазина от 30.09.2022',sourceRefs:['news/659'],updated:'30.09.2022'
  },
  {
    slug:'raus-provans',name:'Модульная система «Прованс» (RAUS)',category:'living',cat:'Гостиные / модульные системы',tagline:'Модульная коллекция в пастельной гамме',images:[M('raus-living-1'),M('raus-kitchen-green'),M('raus-kitchen-grey')],price:{kind:'ask'},specs:[],
    description:'Модульная коллекция во французском стиле. В публикации магазина показаны решения для гостиной, кухни и спальни.',
    sourceLabel:'Публикация магазина от 01.04.2023',sourceRefs:['news/718'],updated:'01.04.2023'
  },
  {
    slug:'solo',name:'Модульная гостиная «Соло»',category:'living',cat:'Гостиные / модульные системы',tagline:'МДФ · белый глянец · модульная система',images:[],price:{kind:'ask'},specs:[],
    description:'Модульная гостиная из МДФ в цвете «белый глянец». Подтверждено наличие разных модулей, но фото достаточного качества в источнике не восстановлено.',
    sourceLabel:'Публикация магазина от 20.12.2023',sourceRefs:['news/741'],updated:'20.12.2023'
  },
  {
    slug:'gamma-15',name:'Гостиная «Гамма 15»',category:'living',cat:'Гостиные / модульные системы',tagline:'Светлые тона · стеклянные створки · зеркальные вставки',images:[],price:{kind:'ask'},specs:[],
    description:'Гостиная в светлых тонах с гнутыми стеклянными створками, рисунком и зеркальными вставками.',
    sourceLabel:'Публикация магазина от 15.02.2023',sourceRefs:['news/705'],updated:'15.02.2023'
  },
  {
    slug:'mori-prihozhaya',name:'Прихожая «Мори» (графит)',category:'storage',cat:'Прихожие / шкафы / хранение',tagline:'Графит · фабрика ДСВ',images:[],price:{kind:'ask'},specs:[],
    description:'Компактная система хранения для входной зоны в оттенке «графит».',
    sourceLabel:'Публикация магазина от 15.03.2023',sourceRefs:['news/709'],updated:'15.03.2023'
  }
];

const catalogDirections=[
  {category:'kitchen',name:'Кухни · готовые решения и под заказ',text:'В зале показаны готовые кухонные решения; магазин также публикует ассортимент кухонь под заказ.',image:M('hall-kitchen-red')},
  {category:'tables',name:'Письменные и компьютерные столы',text:'Отдельное направление ассортимента для дома и учёбы.',image:M('desks-group')},
  {category:'upholstered',name:'Диваны — разные форматы',text:'Прямые, угловые и модульные диваны; ткани и цвет можно уточнить у магазина.',image:M('hall-sofas-portrait2')},
  {category:'upholstered',name:'Кресла',text:'Классические и современные формы в разных обивках.',image:M('chairs-wing')},
  {category:'garden',name:'Дача, сад, массив, лофт, ротанг',text:'Отдельное направление ассортимента — конкретные позиции и наличие лучше уточнить перед поездкой.',image:M('hall-stools-set')}
];


const reviews=[
  {name:'Дана Игнатьева',date:'3 июня',text:'Купили в магазине кровати. Очень понравились, довольны покупкой на все сто процентов. Приятный и вежливый персонал, помогли с выбором. Заказ пришёл раньше, чем заявлено.'},
  {name:'Анна С.',date:'12 января',text:'Лучший мебельный магазин. Отличный персонал, всё подскажут, помогут выбрать. Приемлимые цены, возможна рассрочка. Много мебели в наличии. Уютная атмосфера, есть доставка.'},
  {name:'Ольга К.',date:'10 апреля',text:'Купили в магазине кровать 160 на 200. Она нереально крутая. Смотриться очень дорого. Мы довольные!'},
  {name:'Никель 🤗',date:'25 января 2025',text:'Отличный магазин, большой выбор мебели. Продавец вежливый, всё рассказал про каждую модель диванов. Всем однозначно рекомендую, цены приемлимые, есть рассрочка!!'},
  {name:'Вадим Махров',date:'29 октября 2024',text:'Все отлично! Мебель прекрасного качества. Ребята в магазине всё рассказали и показали. Очень удачная покупка. Заказали, через 2 недели доставили до дома.'},
  {name:'Евгения Зеленкина',date:'3 мая 2024',text:'Купили шкаф и комод. Очень внимательный персонал — всё объяснили, показали, на запросы ответили. Соотношение цены и качества 100%. С доставкой никаких вопросов не возникло. Приедем за диваном точно.'}
];

const categoryByKey=Object.fromEntries(cats.map(c=>[c.key,c.name]));
const RAW_PATH=window.__MITTA_ROUTE||location.pathname;
const LOCAL_PATH=(BASE&&RAW_PATH.startsWith(BASE))?(RAW_PATH.slice(BASE.length)||'/'):RAW_PATH;
const path=LOCAL_PATH.replace(/\/+$/,'')||'/';
const img=(src,alt,cls='',eager=false)=>`<img class="${cls}" src="${src}" alt="${alt}" loading="${eager?'eager':'lazy'}" decoding="async">`;
const rub=(v)=>new Intl.NumberFormat('ru-RU').format(v)+' ₽';
const priceMain=()=> 'Уточнить цену';
const priceBlock=(p,cls='')=>`<div class="price-block ${cls}"><strong>Уточнить цену</strong><small>Цену и наличие подтвердим в сообщении.</small></div>`;
const waText=(p)=>`Здравствуйте! Интересует ${p.name}${p.article?` арт. ${p.article}`:''} с сайта. Подскажите актуальную цену и наличие.`;
const waLink=(p)=>whatsappLink(waText(p));

function header(){
 const current=path.startsWith('/catalog')||path.startsWith('/product')?'catalog':path.startsWith('/store')?'store':path.startsWith('/delivery-payment')?'delivery':path.startsWith('/contacts')?'contacts':'';
 return `<header class="site-header"><a href="/" class="brand" aria-label="Митта, главная">МИТТА<em>.</em></a><nav class="nav" aria-label="Основная навигация"><a href="/catalog/" ${current==='catalog'?'aria-current="page"':''}>Каталог</a><a href="/store/" ${current==='store'?'aria-current="page"':''}>Магазин</a><a href="/delivery-payment/" ${current==='delivery'?'aria-current="page"':''}>Доставка и оплата</a><a href="/contacts/" ${current==='contacts'?'aria-current="page"':''}>Контакты</a></nav><div class="header-right"><a class="phone" href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a><button class="menu-btn" aria-expanded="false" aria-controls="mobileMenu" aria-label="Открыть меню">Меню</button></div></header><nav id="mobileMenu" class="menu-panel" aria-hidden="true" aria-label="Мобильная навигация"><a href="/catalog/">Каталог</a><a href="/store/">Магазин</a><a href="/delivery-payment/">Доставка и оплата</a><a href="/contacts/">Контакты</a><a href="${whatsappLink()}" target="_blank" rel="noopener">WhatsApp ↗</a><a class="phone" href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a></nav>`;
}
function footer(){return `<footer class="footer"><div class="footer-top"><div class="footer-brand">МИТТА.</div><div class="footer-col"><h4>Навигация</h4><a href="/catalog/">Каталог</a><a href="/store/">Магазин</a><a href="/delivery-payment/">Доставка и оплата</a></div><div class="footer-col"><h4>Магазин</h4><p>Бологое</p><p>ул. Ветка Холодильника, 9</p><a href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a></div><div class="footer-col"><h4>Связь</h4><a href="${whatsappLink()}" target="_blank" rel="noopener">WhatsApp ↗</a><a href="https://vk.ru/mebelbologoe" target="_blank" rel="noopener">ВКонтакте ↗</a><a href="https://yandex.ru/maps/org/mitta/1075173904" target="_blank" rel="noopener">Яндекс Карты ↗</a></div></div><div class="footer-bottom"><span>Митта · Бологое · ул. Ветка Холодильника, 9</span><span>${PRIMARY_PHONE.display}</span></div></footer>`}

function productVisual(p,eager=false){
 if(!p.images.length)return '';
 return img(p.images[0],p.name,'',eager);
}
function productCard(p,cls=''){
 if(!p.images.length)return `<a class="product-text-card ${cls}" href="/product/${p.slug}/"><span class="eyebrow">${p.cat}</span><strong>${p.name}</strong><span>${p.tagline}</span><b>Запросить фото и цену →</b></a>`;
 return `<a class="product-card ${cls}" href="/product/${p.slug}/"><div class="product-media ${p.fit==='contain'?'contain':''}">${productVisual(p)}</div><div class="product-info"><div><h3>${p.name}</h3><small>${p.tagline||p.cat}</small></div><span class="price">Цена по запросу</span></div></a>`;
}
function catCard(c,i){
 const href=(c.key==='kitchen'||c.key==='garden')?`/catalog/#${c.key}`:`/catalog/?category=${c.key}`;
 return `<a class="cat c${i+1}" href="${href}">${img(c.image,c.name)}<div class="cat-index">${c.num}</div><div class="cat-label"><div><strong>${c.short}</strong><small>${c.desc}</small></div><span>Смотреть →</span></div></a>`;
}

function reviewCard(r){
 return `<article class="review-card"><div class="review-card-top"><div class="review-stars" aria-label="5 из 5">★★★★★</div><span>${r.date}</span></div><blockquote>«${r.text}»</blockquote><footer><strong>${r.name}</strong><span>Отзыв на Яндекс Картах</span></footer></article>`;
}

function home(){
 const featured=['laguna','mija-a','franco','brenta'].map(s=>products.find(p=>p.slug===s));
 return `${header()}<main>
<section class="hero"><div class="hero-media">${img(media.hero,'Выставочный зал «Митта» с рядами мягкой мебели','',true)}</div><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">Мебельный магазин · Бологое</div><h1>Мебель<br>в Бологом</h1><p class="hero-intro">Посмотрите ассортимент до поездки — а затем приезжайте в настоящий выставочный зал и выбирайте мебель вживую.</p><div class="hero-actions"><a class="btn blue" href="/catalog/">Смотреть каталог</a><a class="btn light" href="/store/">Как нас найти</a></div></div><aside class="hero-note"><b>Сначала посмотреть.</b><span>Фото зала, реальные модели и характеристики — чтобы до поездки понять, что хочется увидеть.</span></aside><div class="trust-rail"><div class="trust-item"><span class="trust-num">4,9</span><span class="trust-desc">89 оценок на Яндексе</span></div><div class="trust-item"><span class="trust-num">700+ м²</span><span class="trust-desc">зал · по данным самой «Митты»</span></div><div class="trust-item"><span class="trust-num">с 1998</span><span class="trust-desc">ООО «Митта» зарегистрировано в 1998 году</span></div></div></div></section>
<section class="section categories home-categories"><div class="home-section-head"><div><div class="eyebrow">Ассортимент</div><h2>По комнатам<br>и задачам</h2></div><div class="section-side-note"><p class="section-lead">Восемь направлений: гостиная, спальня, кухня, детская, мягкая мебель, хранение, столы и дача.</p></div></div><div class="cat-grid">${cats.map(catCard).join('')}</div></section>
<section class="bridge"><div class="bridge-grid"><div><div class="eyebrow">До поездки</div><h2>Сначала<br>увидеть.</h2><p>Посмотрите реальные модели и фотографии зала, а перед визитом уточните актуальную цену и наличие конкретной позиции.</p><a class="bridge-link" href="/catalog/">Перейти к ассортименту →</a></div><div class="bridge-media">${img(media.bridge,'Кровати и матрасы в выставочном зале «Митта»')}</div></div></section>
<section class="section products-sec home-products"><div class="home-section-head"><div><div class="eyebrow">Конкретные модели</div><h2>Выбор из каталога</h2></div><div class="section-side-note"><p class="section-lead">Несколько моделей с фотографиями — остальные в полном каталоге.</p></div></div><div class="product-selection">${featured.map(p=>productCard(p)).join('')}</div><div class="products-bottom"><a class="bridge-link" href="/catalog/">Смотреть весь каталог →</a></div></section>
<section class="home-showroom"><div class="home-showroom-grid"><figure class="home-showroom-media">${img(media.showroom,'Ряды диванов в выставочном зале «Митта»')}</figure><div class="home-showroom-copy"><div class="eyebrow">Выставочный зал · Бологое</div><h2>Выставочный<br>зал</h2><p class="home-showroom-lead">В зале можно спокойно сравнить размер, цвет, посадку и материалы — рядом, в реальном масштабе.</p><div class="home-showroom-claim"><strong>700+ м²</strong><span>площадь выставочного зала — по данным самой «Митты»</span></div><div class="home-showroom-info"><div><span>Адрес</span><strong>ул. Ветка Холодильника, 9</strong></div><div><span>Пн–Пт</span><strong>09:00–18:00</strong></div><div><span>Суббота</span><strong>09:00–16:00</strong></div></div><div class="home-showroom-actions"><a class="btn blue" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904">Построить маршрут ↗</a><a class="showroom-text-link" href="/store/">Подробнее о магазине →</a></div></div></div></section>
<section class="section reputation home-reputation"><div class="home-section-head reviews-heading"><div><div class="eyebrow">Яндекс Карты · 12.09.2026</div><h2>Покупатели о «Митте»</h2></div><div class="reviews-summary-inline"><div class="rating-stars" aria-label="Рейтинг 4,9 из 5">★★★★★</div><strong>4,9 / 5</strong><span>89 оценок · 34 отзыва</span></div></div><div class="review-carousel-shell"><div class="review-track" data-review-track>${reviews.map(reviewCard).join('')}</div></div><div class="reviews-nav" aria-label="Навигация по отзывам"><div class="review-nav-buttons"><button class="review-arrow review-prev" type="button" aria-label="Предыдущий отзыв">←</button><button class="review-arrow review-next" type="button" aria-label="Следующий отзыв">→</button></div><div class="review-progress"><strong data-review-counter>01 / ${String(reviews.length).padStart(2,'0')}</strong><div class="review-dots">${reviews.map((_,i)=>`<button type="button" data-review-dot="${i}" class="${i===0?'active':''}" aria-label="Отзыв ${i+1}" aria-pressed="${i===0?'true':'false'}"></button>`).join('')}</div></div></div><div class="reviews-footer"><span>Отзывы покупателей из карточки магазина на Яндекс Картах.</span><a target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904/reviews/">Все отзывы на Яндексе ↗</a></div></section>
<section class="home-contact-strip"><div><span class="eyebrow">Есть вопрос по модели?</span><h2>Подскажем цену<br>и наличие.</h2></div><div class="home-contact-actions"><a class="btn ghost" href="/catalog/">Смотреть каталог</a><a class="btn blue" target="_blank" rel="noopener" href="${whatsappLink('Здравствуйте! Подскажите, пожалуйста, цену и наличие интересующей мебели.')}">Написать в WhatsApp ↗</a></div></section>
</main>${footer()}`;
}

function catalogVisual(p){
 const src=catalogImageMap[p.slug]||p.images[0];
 return src?img(src,p.name):'';
}
function catalogCard(p){
 return `<a class="catalog-product-card" data-catalog-item data-category="${p.category}" href="/product/${p.slug}/"><div class="catalog-product-media">${catalogVisual(p)}</div><div class="catalog-product-body"><span class="catalog-card-cat">${p.cat}</span><h3>${p.name}</h3><p>${p.tagline||p.cat}</p><div class="catalog-product-meta"><strong>Цена по запросу</strong></div></div></a>`;
}
function catalogCategoryCard(category,title,text,image){
 const message=`Здравствуйте! Интересует раздел «${title}». Подскажите, пожалуйста, какие варианты сейчас можно посмотреть и какая актуальная цена.`;
 return `<a id="${category}" class="catalog-direction-item" target="_blank" rel="noopener" href="${whatsappLink(message)}"><div class="catalog-direction-item-media">${img(image,title)}</div><div class="catalog-direction-item-body"><span class="eyebrow">${title}</span><p>${text}</p><b>Спросить в WhatsApp ↗</b></div></a>`;
}
function catalogTextCard(p){
 return `<a class="catalog-text-item" href="/product/${p.slug}/"><div><span class="eyebrow">Фото по запросу</span><h3>${p.name}</h3><p>${p.tagline}</p></div><div class="catalog-text-meta"><strong>Цена по запросу</strong><b>Запросить фото и цену →</b></div></a>`;
}
function catalogDirection(d){
 return `<a class="catalog-direction-card" href="/contacts/"><div class="catalog-direction-media">${img(d.image,d.name)}</div><div class="catalog-direction-body"><span class="eyebrow">Ещё в ассортименте</span><h3>${d.name}</h3><p>${d.text}</p><b>Уточнить у магазина →</b></div></a>`;
}
function catalogCategorySection(c){
 const visual=products.filter(p=>p.category===c.key&&p.images.length);
 if(!visual.length)return '';
 return `<section class="catalog-category-section" data-category="${c.key}"><header class="catalog-category-head"><div><span class="catalog-category-index">${c.num}</span><h2>${c.short}</h2></div><p>${visual.length} ${visual.length===1?'позиция':visual.length<5?'позиции':'позиций'}</p></header><div class="catalog-products-grid ${visual.length===1?'catalog-products-single':''}">${visual.map(catalogCard).join('')}</div></section>`;
}
function catalog(){
 const order=['laguna','mija-a','gloria','versal','franco','ascella','brenta','raus-provans','kotenok','tv-stands','adam-1'];
 const visibleProducts=order.map(slug=>products.find(p=>p.slug===slug)).filter(Boolean);
 const filterCats=cats.filter(c=>visibleProducts.some(p=>p.category===c.key));
 const kitchen=catalogDirections.find(d=>d.category==='kitchen');
 const garden=catalogDirections.find(d=>d.category==='garden');
 return `${header()}<main class="catalog-page"><section class="catalog-hero"><div><div class="eyebrow">Ассортимент магазина</div><h1>Каталог</h1></div><div class="catalog-hero-side"><p>Выберите категорию или откройте модель.</p></div></section><nav class="catalog-toolbar" aria-label="Каталог"><div class="catalog-filter-group"><button class="filter-btn active" data-cat="all" aria-pressed="true">Все</button>${filterCats.map(c=>`<button class="filter-btn" data-cat="${c.key}" aria-pressed="false">${c.short}</button>`).join('')}</div><div class="catalog-view-toggle" aria-label="Размер карточек"><button type="button" class="view-btn active" data-view="compact" aria-pressed="true">Компактно</button><button type="button" class="view-btn" data-view="large" aria-pressed="false">Крупно</button></div></nav><section class="catalog-flat-wrap"><div class="catalog-flat-grid view-compact" id="catalogGrid">${visibleProducts.map(catalogCard).join('')}</div><section class="catalog-extra" id="more-directions"><div class="catalog-extra-head"><div><span class="eyebrow">Другие направления</span><h2>Кухни и дача</h2></div><p>Для этих разделов лучше сразу спросить доступные варианты у магазина.</p></div><div class="catalog-extra-grid">${catalogCategoryCard('kitchen','Кухни','Готовые решения и кухни под заказ',kitchen.image)}${catalogCategoryCard('garden','Дача и сад','Массив, лофт, ротанг и мебель для дачи',garden.image)}</div></section></section></main>${footer()}`;
}

function gallery(p){
 if(!p.images.length)return `<div class="pdp-no-media"><span class="eyebrow">Фото по запросу</span><strong>Запросить фото и актуальную цену</strong><p>Магазин подтвердит внешний вид, цену и наличие в сообщении.</p></div>`;
 const first=p.images[0];
 return `<div class="pdp-gallery"><div class="pdp-main ${p.fit==='contain'?'contain':''}">${img(first,p.name,'pdp-main-img',true)}</div>${p.images.length>1?`<div class="pdp-thumbs" aria-label="Фотографии товара">${p.images.map((src,i)=>`<button class="pdp-thumb ${i===0?'active':''}" type="button" data-src="${src}" data-alt="${p.name}, фото ${i+1}" aria-label="Показать фото ${i+1}" aria-pressed="${i===0?'true':'false'}">${img(src,`${p.name}, миниатюра ${i+1}`)}</button>`).join('')}</div>`:''}</div>`;
}
function productPage(p){
 const wa=waLink(p);
 const topSpecs=(p.specs||[]).slice(0,5);
 const related=products.filter(x=>x.slug!==p.slug&&x.category===p.category&&x.images.length).concat(products.filter(x=>x.slug!==p.slug&&x.category!==p.category&&x.images.length)).slice(0,3);
 const noPhoto=!p.images.length;
 return `${header()}<main class="pdp"><div class="crumb"><a href="/catalog/">Каталог</a> / <a href="/catalog/?category=${p.category}">${p.cat}</a></div><div class="pdp-grid ${noPhoto?'no-image':''}">${gallery(p)}<aside class="pdp-info"><div class="eyebrow">${p.cat}${p.article?` · арт. ${p.article}`:''}</div><h1>${p.name}</h1><p class="pdp-tagline">${p.tagline||''}</p>${priceBlock(p,'pdp-price-rich')}<div class="pdp-actions"><a class="btn blue" target="_blank" rel="noopener" href="${wa}">Написать по этому товару</a><a class="btn ghost" href="tel:${PRIMARY_PHONE.tel}">Позвонить: ${PRIMARY_PHONE.display}</a><a class="pdp-vk" target="_blank" rel="noopener" href="https://vk.ru/mebelbologoe">Или написать во ВКонтакте ↗</a></div>${topSpecs.length?`<div class="pdp-facts">${topSpecs.map(f=>`<div class="pdp-fact"><span>${f[0]}</span><span>${f[1]}</span></div>`).join('')}</div>`:''}<p class="pdp-note">${p.note||'Актуальные цену и наличие уточните у магазина перед поездкой.'}</p></aside></div>
<section class="pdp-detail"><div class="pdp-detail-head"><span class="eyebrow">О позиции</span><h2>Характеристики</h2></div><div class="pdp-detail-body">${p.description?`<p class="pdp-desc">${p.description}</p>`:''}${p.bullets?.length?`<ul class="pdp-bullets">${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}${p.specs?.length?`<div class="spec-list full">${p.specs.map(s=>`<div class="spec-row"><span>${s[0]}</span><span>${s[1]}</span></div>`).join('')}</div>`:''}</div></section>
<section class="related"><div class="related-head"><div><span class="eyebrow">Смотрите также</span><h2>Ещё позиции</h2></div><a class="bridge-link" href="/catalog/">Весь каталог →</a></div><div class="related-grid">${related.map(x=>productCard(x)).join('')}</div></section><section class="showroom-mini"><div class="showroom-mini-media">${img(media.storeCorner,'Выставочный зал «Митта»')}</div><div class="showroom-mini-copy"><div><div class="eyebrow">Бологое · физический магазин</div><h3>Лучше один раз увидеть в зале.</h3><p>Сравните размер, цвет и механизм на месте — после того как уточните наличие.</p></div><a class="btn light" href="/store/">О магазине</a></div></section><a class="sticky-mobile-cta" target="_blank" rel="noopener" href="${wa}">Написать по этому товару</a></main>${footer()}`;
}

function store(){return `${header()}<main class="store-page"><section class="store-intro store-intro-calm"><div class="eyebrow">Физический магазин · Бологое</div><h1>Выставочный зал</h1><p>Кровати, диваны, корпусная мебель, кухни и столовые группы — всё можно сравнить в реальном масштабе.</p></section><div class="store-image-big">${img(media.storeHero,'Кровати в выставочном зале «Митта»','',true)}</div><section class="store-story"><h2>Посмотреть мебель вживую.</h2><div><p>Сравните размер, цвет, посадку и материалы прямо в зале — рядом друг с другом, а не по одной фотографии.</p><p class="muted-on-dark">По данным самой «Митты»: выставочный зал свыше 700 м² и более 150 комплектов мебели.</p></div></section><section class="store-gallery store-gallery-rich"><figure class="wide">${img(media.storeBed,'Спальные гарнитуры в выставочном зале')}</figure><figure class="portrait">${img(media.storeKitchen,'Кухонные гарнитуры в магазине')}</figure><figure class="portrait">${img(media.storeWood,'Столы и табуреты из массива')}</figure><figure class="wide">${img(media.storeSofas,'Ряды диванов в магазине')}</figure><figure class="wide">${img(media.storeMattress,'Матрасы и кровати в выставочном зале')}</figure><figure class="wide">${img(media.storeCorner,'Интерьерная секция с кроватью и комодом')}</figure></section><section class="store-logistics"><div class="fact"><h4>Адрес</h4><p>ул. Ветка Холодильника, 9<br>Бологое</p></div><div class="fact"><h4>Пн–Пт</h4><p>09:00–18:00</p></div><div class="fact"><h4>Суббота</h4><p>09:00–16:00</p></div><div class="fact"><h4>Практично</h4><p>Самовывоз · доставка · парковка</p></div></section><section class="route-block"><h2>Приехать<br>в «Митту»</h2><div class="route-card"><div class="eyebrow">Точка назначения</div><p class="address">Бологое,<br>ул. Ветка Холодильника, 9</p><p>В отдельных справочниках встречается адрес 9/1; воскресный график лучше уточнить по телефону перед поездкой.</p><div class="route-actions"><a class="btn blue" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904">Открыть маршрут ↗</a><a class="btn ghost" target="_blank" rel="noopener" href="${whatsappLink()}">Написать в WhatsApp ↗</a></div></div></section></main>${footer()}`}


function delivery(){
 const wa=whatsappLink('Здравствуйте! Подскажите, пожалуйста, стоимость доставки и условия для выбранной мебели.');
 return `${header()}<main class="utility-page delivery-compact-page"><section class="utility-hero delivery-hero-compact"><div><div class="eyebrow">Покупателям</div><h1>Доставка<br>и оплата</h1></div><p>Условия зависят от заказа и адреса. Главное — уточнить их перед оформлением.</p></section><section class="delivery-compact"><div class="delivery-lines"><div><strong>Самовывоз</strong><span>из магазина в Бологом</span></div><div><strong>Доставка</strong><span>по городу и району</span></div><div><strong>Подъём и сборка</strong><span>по договорённости</span></div><div><strong>Оплата</strong><span>наличные, карта, СБП и безналичный расчёт; кредит — по условиям магазина</span></div></div><div class="delivery-cta"><p>Напишите адрес и выбранную модель — точную стоимость и условия подтвердят в сообщении.</p><a class="btn blue" target="_blank" rel="noopener" href="${wa}">Спросить в WhatsApp ↗</a></div></section></main>${footer()}` 
}

function contacts(){return `${header()}<main class="utility-page contacts-page"><section class="utility-hero contacts-hero"><div><div class="eyebrow">Связаться с магазином</div><h1>Контакты</h1></div><div class="contacts-address"><span>Бологое · Тверская область</span><strong>ул. Ветка Холодильника, 9</strong><div class="contacts-hours-hero"><span><b>Пн–Пт</b> 09:00–18:00</span><span><b>Суббота</b> 09:00–16:00</span></div></div></section><section class="contact-primary-grid"><a class="contact-primary contact-primary-wa" target="_blank" rel="noopener" href="${whatsappLink()}"><span>Написать</span><strong>WhatsApp</strong><b>→</b></a><a class="contact-primary" href="tel:${PRIMARY_PHONE.tel}"><span>Основной телефон</span><strong>${PRIMARY_PHONE.display}</strong><b>→</b></a></section><section class="contact-secondary-grid"><a class="contact-secondary" href="tel:+74823833564"><span>Стационарный</span><strong>+7 48238 3-35-64</strong><b>Позвонить →</b></a><a class="contact-secondary" target="_blank" rel="noopener" href="https://vk.ru/mebelbologoe"><span>Соцсеть магазина</span><strong>ВКонтакте</strong><b>Открыть ↗</b></a><a class="contact-secondary" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904"><span>Маршрут и отзывы</span><strong>Яндекс Карты</strong><b>Открыть ↗</b></a></section></main>${footer()}` }


function render(){
 const titles={'/':'Митта — мебель в Бологом','/catalog':'Каталог мебели — Митта','/store':'Магазин — Митта · Бологое','/delivery-payment':'Доставка и оплата — Митта','/contacts':'Контакты — Митта'};
 const productSlugRaw=path.startsWith('/product/')?path.split('/').filter(Boolean)[1]:null;
 const productSlug=productSlugRaw==='vendetta'?'vendetta-1600':productSlugRaw;
 const product=productSlug?products.find(x=>x.slug===productSlug):null;
 document.title=product?`${product.name} — Митта`:(titles[path]||'Митта — мебель в Бологом');
 const meta=document.querySelector('meta[name="description"]');
 const descriptions={'/':'Мебельный магазин «Митта» в Бологом: каталог, выставочный зал, отзывы, адрес и контакты.','/catalog':'Каталог мебели «Митта»: реальные модели, фотографии и характеристики.','/store':'Выставочный зал мебельного магазина «Митта» в Бологом.','/delivery-payment':'Доставка, самовывоз и способы оплаты в мебельном магазине «Митта».','/contacts':'Адрес, телефоны, WhatsApp, ВКонтакте и часы работы магазина «Митта» в Бологом.'};
 if(meta)meta.setAttribute('content',product?`${product.name}: фотографии, характеристики и связь с магазином «Митта».`:(descriptions[path]||descriptions['/']));
 let html;
 if(path==='/')html=home();else if(path==='/catalog')html=catalog();else if(path==='/store')html=store();else if(path==='/delivery-payment')html=delivery();else if(path==='/contacts')html=contacts();else if(path.startsWith('/product/'))html=product?productPage(product):catalog();else html=home();
 document.getElementById('app').innerHTML=html;
 if(BASE){
   document.querySelectorAll('#app a[href^="/"]').forEach(a=>{
     const href=a.getAttribute('href');
     if(href!==BASE&&!href.startsWith(BASE+'/'))a.setAttribute('href',route(href));
   });
 }
 bind();
}
function bind(){
 const mb=document.querySelector('.menu-btn'),mp=document.querySelector('.menu-panel');
 const setMenu=(open)=>{if(!mb||!mp)return;mp.classList.toggle('open',open);mb.setAttribute('aria-expanded',String(open));mb.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');mp.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('lock',open)};
 if(mb&&mp){mb.onclick=()=>setMenu(!mp.classList.contains('open'));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mp.classList.contains('open')){setMenu(false);mb.focus()}})}
 document.querySelectorAll('.pdp-thumb').forEach(b=>b.onclick=()=>{const main=document.querySelector('.pdp-main-img');if(!main)return;main.src=b.dataset.src;main.alt=b.dataset.alt;document.querySelectorAll('.pdp-thumb').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true')});
 const reviewTrack=document.querySelector('[data-review-track]');if(reviewTrack){const cards=[...reviewTrack.querySelectorAll('.review-card')],counter=document.querySelector('[data-review-counter]'),dots=[...document.querySelectorAll('[data-review-dot]')];let reviewIndex=0,raf=0,positions=cards.length;const calc=()=>{if(!cards.length)return;const gap=parseFloat(getComputedStyle(reviewTrack).gap)||0,cardW=cards[0].getBoundingClientRect().width,visible=Math.max(1,Math.floor((reviewTrack.clientWidth+gap)/(cardW+gap)));positions=Math.max(1,cards.length-visible+1);reviewIndex=Math.min(reviewIndex,positions-1);dots.forEach((d,i)=>{d.hidden=i>=positions;d.setAttribute('aria-hidden',String(i>=positions))});update()};const update=()=>{if(counter)counter.textContent=`${String(reviewIndex+1).padStart(2,'0')} / ${String(positions).padStart(2,'0')}`;dots.forEach((d,i)=>{const active=i===reviewIndex&&i<positions;d.classList.toggle('active',active);d.setAttribute('aria-pressed',String(active))})};const go=(i)=>{if(!cards.length)return;reviewIndex=(i+positions)%positions;reviewTrack.scrollTo({left:cards[reviewIndex].offsetLeft,behavior:'smooth'});update()};document.querySelector('.review-prev')?.addEventListener('click',()=>go(reviewIndex-1));document.querySelector('.review-next')?.addEventListener('click',()=>go(reviewIndex+1));dots.forEach((d,i)=>d.addEventListener('click',()=>{if(i<positions)go(i)}));reviewTrack.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{if(!cards.length)return;let best=0,dist=Infinity;for(let i=0;i<positions;i++){const d=Math.abs(cards[i].offsetLeft-reviewTrack.scrollLeft);if(d<dist){dist=d;best=i}}if(best!==reviewIndex){reviewIndex=best;update()}})});window.addEventListener('resize',calc,{passive:true});calc();}
 const params=new URLSearchParams(location.search),initial=params.get('category');const buttons=[...document.querySelectorAll('.filter-btn')];if(buttons.length){const apply=cat=>{buttons.forEach(b=>{const active=b.dataset.cat===cat;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-catalog-item][data-category]').forEach(el=>{el.hidden=!(cat==='all'||el.dataset.category===cat)})};buttons.forEach(b=>b.onclick=()=>{apply(b.dataset.cat);history.replaceState(null,'',route(b.dataset.cat==='all'?'/catalog/':`/catalog/?category=${b.dataset.cat}`));document.querySelector('.catalog-flat-wrap')?.scrollIntoView({behavior:'smooth',block:'start'})});if(initial&&buttons.some(b=>b.dataset.cat===initial))apply(initial);else if(initial==='kitchen'||initial==='garden')requestAnimationFrame(()=>document.getElementById(initial)?.scrollIntoView({block:'start'}))}
 if(location.hash)requestAnimationFrame(()=>document.querySelector(location.hash)?.scrollIntoView({block:'start'}));
 const grid=document.getElementById('catalogGrid'),viewButtons=[...document.querySelectorAll('.view-btn')];if(grid&&viewButtons.length){const setView=view=>{grid.classList.toggle('view-compact',view==='compact');grid.classList.toggle('view-large',view==='large');viewButtons.forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))})};viewButtons.forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));setView('compact');}
}
render();
