// GitHub Pages / subpath-safe base detection.
// Example: /mitta-test/assets/site.js -> BASE = /mitta-test
const SCRIPT_URL=document.currentScript?.src||'';
const SCRIPT_PATH=SCRIPT_URL?new URL(SCRIPT_URL,location.href).pathname:'';
const AUTO_BASE=SCRIPT_PATH.replace(/\/assets\/site\.js$/,'');
const BASE=(window.__MITTA_BASE!==undefined?window.__MITTA_BASE:AUTO_BASE).replace(/\/+$/,'');
const route=(p='/')=>`${BASE}${p.startsWith('/')?p:`/${p}`}`;
const A=(window.__MITTA_ASSET_BASE||route('/assets/images/'));
const M=(name)=>A+'media/'+name+'.jpg';
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
const WHATSAPP_PHONE='74823833564';
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
    description:'Интерьерная кровать с подъёмным механизмом. Фото модели в открытых источниках нельзя надёжно сопоставить с названием, поэтому на сайте оно не подменяется похожим кадром.',
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
    specs:[],description:'Подборка напольных и навесных тумб под телевизор. В исходной публикации отдельные модели не названы — поэтому они собраны в одну честную групповую позицию.',
    sourceLabel:'Публикация магазина от 20.11.2024',sourceRefs:['news/749'],updated:'20.11.2024'
  },
  {
    slug:'franco',name:'Диван угловой «Франко»',category:'upholstered',cat:'Мягкая мебель',tagline:'Глубокий синий · независимый пружинный блок',images:[M('franco-1'),M('franco-2')],price:{kind:'ask'},
    specs:[['Размер','2,38 × 1,54 м'],['Спальное место','1,4 × 2,0 м'],['Пружины','Независимый пружинный блок']],
    description:'Угловой диван в глубоком синем цвете с независимым пружинным блоком. Цена из публикации 2022 года сознательно не выводится как актуальная.',
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
    description:'Гостиная в светлых тонах с гнутыми стеклянными створками, рисунком и зеркальными вставками. Качественного подтверждённого фото нет.',
    sourceLabel:'Публикация магазина от 15.02.2023',sourceRefs:['news/705'],updated:'15.02.2023'
  },
  {
    slug:'mori-prihozhaya',name:'Прихожая «Мори» (графит)',category:'storage',cat:'Прихожие / шкафы / хранение',tagline:'Графит · фабрика ДСВ',images:[],price:{kind:'ask'},specs:[],
    description:'Компактная система хранения для входной зоны в оттенке «графит». Верифицированного фото достаточного качества нет.',
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

const categoryByKey=Object.fromEntries(cats.map(c=>[c.key,c.name]));
const RAW_PATH=window.__MITTA_ROUTE||location.pathname;
const LOCAL_PATH=(BASE&&RAW_PATH.startsWith(BASE))?(RAW_PATH.slice(BASE.length)||'/'):RAW_PATH;
const path=LOCAL_PATH.replace(/\/+$/,'')||'/';
const img=(src,alt,cls='',eager=false)=>`<img class="${cls}" src="${src}" alt="${alt}" loading="${eager?'eager':'lazy'}" decoding="async">`;
const rub=(v)=>new Intl.NumberFormat('ru-RU').format(v)+' ₽';
const priceMain=(p)=>p.price.kind==='ask'?'Уточнить цену':`${p.price.kind==='from'?'от ':''}${rub(p.price.value)}`;
const priceBlock=(p,cls='')=>{const historical=p.price.kind!=='ask';return `<div class="price-block ${cls} ${historical?'historical':''}">${historical?'<span class="price-status">Историческая цена · не подтверждена как текущая</span>':''}<strong>${priceMain(p)}</strong>${p.price.note?`<small>${p.price.note}</small>`:''}</div>`};
const waText=(p)=>`Здравствуйте! Интересует ${p.name}${p.article?` арт. ${p.article}`:''} с сайта. Подскажите актуальную цену и наличие.`;
const waLink=(p)=>whatsappLink(waText(p));

function header(){
 const current=path.startsWith('/catalog')||path.startsWith('/product')?'catalog':path.startsWith('/store')?'store':path.startsWith('/delivery-payment')?'delivery':path.startsWith('/contacts')?'contacts':'';
 return `<header class="site-header"><a href="/" class="brand" aria-label="Митта, главная">МИТТА<em>.</em></a><nav class="nav" aria-label="Основная навигация"><a href="/catalog/" ${current==='catalog'?'aria-current="page"':''}>Каталог</a><a href="/store/" ${current==='store'?'aria-current="page"':''}>Магазин</a><a href="/delivery-payment/" ${current==='delivery'?'aria-current="page"':''}>Доставка и оплата</a><a href="/contacts/" ${current==='contacts'?'aria-current="page"':''}>Контакты</a></nav><div class="header-right"><a class="phone" href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a><button class="menu-btn" aria-expanded="false" aria-controls="mobileMenu" aria-label="Открыть меню">Меню</button></div></header><nav id="mobileMenu" class="menu-panel" aria-hidden="true" aria-label="Мобильная навигация"><a href="/catalog/">Каталог</a><a href="/store/">Магазин</a><a href="/delivery-payment/">Доставка и оплата</a><a href="/contacts/">Контакты</a><a href="${whatsappLink()}" target="_blank" rel="noopener">WhatsApp ↗</a><a class="phone" href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a></nav>`;
}
function footer(){return `<footer class="footer"><div class="footer-top"><div class="footer-brand">МИТТА.</div><div class="footer-col"><h4>Навигация</h4><a href="/catalog/">Каталог</a><a href="/store/">Магазин</a><a href="/delivery-payment/">Доставка и оплата</a></div><div class="footer-col"><h4>Магазин</h4><p>Бологое</p><p>ул. Ветка Холодильника, 9</p><a href="tel:${PRIMARY_PHONE.tel}">${PRIMARY_PHONE.display}</a></div><div class="footer-col"><h4>Связь</h4><a href="${whatsappLink()}" target="_blank" rel="noopener">WhatsApp ↗</a><a href="https://vk.ru/mebelbologoe" target="_blank" rel="noopener">ВКонтакте ↗</a><a href="https://yandex.ru/maps/org/mitta/1075173904" target="_blank" rel="noopener">Отзывы на Яндексе ↗</a></div></div><div class="footer-bottom"><span>Неофициальный демонстрационный концепт, 2026</span><span>Цены с датой — исторические; актуальные цену и наличие подтверждает магазин</span></div></footer>`}

function productVisual(p,eager=false){
 if(!p.images.length)return '';
 return img(p.images[0],p.name,'',eager);
}
function productCard(p,cls=''){
 if(!p.images.length)return `<a class="product-text-card ${cls}" href="/product/${p.slug}/"><span class="eyebrow">${p.cat}</span><strong>${p.name}</strong><span>${p.tagline}</span><b>Запросить фото и актуальную цену →</b></a>`;
 return `<a class="product-card ${cls}" href="/product/${p.slug}/"><div class="product-media ${p.fit==='contain'?'contain':''}">${productVisual(p)}</div><div class="product-info"><div><h3>${p.name}</h3><small>${p.tagline||p.cat}</small></div><span class="price">${priceMain(p)}</span>${p.price.note?`<small class="price-date">историческая цена · ${p.updated?`данные от ${p.updated}`:'дата не подтверждена'}</small>`:''}</div></a>`;
}
function catCard(c,i){
 return `<a class="cat c${i+1}" href="/catalog/?category=${c.key}">${img(c.image,c.name)}<div class="cat-index">${c.num}</div><div class="cat-label"><div><strong>${c.short}</strong><small>${c.desc}</small></div><span>Смотреть →</span></div></a>`;
}

function home(){
 const featured=['laguna','mija-a','franco','brenta','ascella'].map(s=>products.find(p=>p.slug===s));
 return `${header()}<main>
<section class="hero"><div class="hero-media">${img(media.hero,'Выставочный зал «Митта» с рядами мягкой мебели','',true)}</div><div class="hero-inner"><div class="hero-copy"><div class="eyebrow">Мебельный магазин · Бологое</div><h1>Мебель<br>в Бологом</h1><p class="hero-intro">Посмотрите ассортимент до поездки — а затем приезжайте в настоящий выставочный зал и выбирайте мебель вживую.</p><div class="hero-actions"><a class="btn blue" href="/catalog/">Смотреть каталог</a><a class="btn light" href="/store/">Как нас найти</a></div></div><aside class="hero-note"><b>Сначала посмотреть.</b><span>Фото зала, реальные модели и характеристики — чтобы до поездки понять, что хочется увидеть.</span></aside><div class="trust-rail"><div class="trust-item"><span class="trust-num">4,9</span><span class="trust-desc">89 оценок на Яндексе</span></div><div class="trust-item"><span class="trust-num">700+ м²</span><span class="trust-desc">зал · по данным самой «Митты»</span></div><div class="trust-item"><span class="trust-num">с 1998</span><span class="trust-desc">ООО «Митта» зарегистрировано в 1998 году</span></div></div></div></section>
<section class="section categories home-categories"><div class="home-section-head"><div><div class="eyebrow">Ассортимент</div><h2>По комнатам<br>и задачам</h2></div><div><p class="section-lead">Восемь направлений — от спален и кухонь до мягкой мебели, хранения и столовых групп.</p><p class="section-meta">Фотографии и категории связаны с реальным ассортиментом «Митты».</p></div></div><div class="cat-grid">${cats.map(catCard).join('')}</div></section>
<section class="bridge"><div class="bridge-grid"><div><div class="eyebrow">До поездки</div><h2>Сначала<br>увидеть.</h2><p>Посмотрите реальные модели и фотографии зала, а перед визитом уточните актуальную цену и наличие конкретной позиции.</p><a class="bridge-link" href="/catalog/">Перейти к ассортименту →</a></div><div class="bridge-media">${img(media.bridge,'Кровати и матрасы в выставочном зале «Митта»')}</div></div></section>
<section class="section products-sec home-products"><div class="home-section-head"><div><div class="eyebrow">Конкретные модели</div><h2>Выбор из каталога</h2></div><div><p class="section-lead">Пять позиций с полноценными фотографиями и подтверждёнными деталями.</p><p class="section-meta">Исторические цены всегда помечены датой и не выдаются за актуальные.</p></div></div><div class="product-selection">${featured.map(p=>productCard(p)).join('')}</div><div class="products-bottom"><a class="bridge-link" href="/catalog/">Все 15 подтверждённых позиций →</a></div></section>
<section class="home-showroom"><div class="home-showroom-grid"><figure class="home-showroom-media">${img(media.showroom,'Ряды диванов в выставочном зале «Митта»')}</figure><div class="home-showroom-copy"><div class="eyebrow">Выставочный зал · Бологое</div><h2>Посмотреть<br>в магазине</h2><p class="home-showroom-lead">В зале можно спокойно сравнить размер, цвет, посадку и материалы — рядом, в реальном масштабе.</p><div class="home-showroom-claim"><strong>700+ м²</strong><span>площадь выставочного зала — по данным самой «Митты»</span></div><div class="home-showroom-info"><div><span>Адрес</span><strong>ул. Ветка Холодильника, 9</strong></div><div><span>Пн–Пт</span><strong>09:00–18:00</strong></div><div><span>Суббота</span><strong>09:00–16:00</strong></div></div><div class="home-showroom-actions"><a class="btn blue" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904">Построить маршрут ↗</a><a class="showroom-text-link" href="/store/">Подробнее о магазине →</a></div><figure class="home-showroom-detail">${img(media.storeKitchen,'Кухонные гарнитуры в выставочном зале «Митта»')}</figure></div></div></section>
<section class="section reputation home-reputation"><div class="home-section-head"><div><div class="eyebrow">Яндекс Карты · 12.09.2026</div><h2>Отзывы покупателей</h2></div><p class="section-lead">Не рекламные слоганы, а фрагменты реальных отзывов о заказах и работе магазина.</p></div><div class="reviews-layout"><div class="rating-summary"><div class="rating-stars" aria-label="Рейтинг 4,9 из 5">★★★★★</div><div class="rating-value">4,9 <span>/ 5</span></div><p><strong>89 оценок</strong> · 34 отзыва</p><small>По данным Яндекс Карт на дату проверки.</small><a target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904">Все отзывы на Яндексе ↗</a></div><div class="review-cards"><article class="review-card"><div class="review-stars" aria-hidden="true">★★★★★</div><blockquote>«Заказывали кровати и шкаф. Заказ пришёл раньше заявленного.»</blockquote><footer><strong>Покупатель</strong><span>Яндекс Карты</span></footer></article><article class="review-card"><div class="review-stars" aria-hidden="true">★★★★★</div><blockquote>«Помогли с выбором, сделали замеры, была скидка при оплате наличными.»</blockquote><footer><strong>Покупатель</strong><span>Отзыв о покупке стенки «Ненси», комода и кровати · Яндекс Карты</span></footer></article><div class="review-topics"><strong>Что чаще отмечают в отзывах</strong><span>Разнообразие товаров · персонал · качество товаров</span></div></div></div></section>
<section class="home-next"><div class="home-next-head"><div class="eyebrow">Продолжить</div><h2>Выберите, как удобнее.</h2></div><div class="home-next-grid"><a class="home-next-card" href="/catalog/"><div class="home-next-media">${img(M('laguna-1'),'Диван «Лагуна» из ассортимента «Митты»')}</div><div class="home-next-body"><span>01</span><div><h3>Смотреть каталог</h3><p>Модели, характеристики, фотографии и честно помеченные исторические цены.</p></div><b aria-hidden="true">→</b></div></a><a class="home-next-card" href="/store/"><div class="home-next-media">${img(media.storeHero,'Выставочный зал «Митта» в Бологом')}</div><div class="home-next-body"><span>02</span><div><h3>Приехать в магазин</h3><p>Бологое, ул. Ветка Холодильника, 9 · маршрут, часы работы и практическая информация.</p></div><b aria-hidden="true">→</b></div></a></div></section>
</main>${footer()}`;
}

function catalogCard(p){
 if(!p.images.length){return `<a class="catalog-card compact product-no-photo" data-category="${p.category}" href="/product/${p.slug}/"><div><div class="eyebrow">${p.cat}</div><h2>${p.name}</h2><div class="catname">${p.tagline}</div></div><div class="compact-side">${priceBlock(p,'catalog-price compact-price')}<span>Запросить фото и цену →</span></div></a>`;}
 return `<a class="catalog-card" data-category="${p.category}" href="/product/${p.slug}/"><div class="product-media ${p.fit==='contain'?'contain':''}">${productVisual(p)}</div><h2>${p.name}</h2><div class="catname">${p.tagline||p.cat}</div>${priceBlock(p,'catalog-price')}</a>`;
}
function catalogDirection(d){return `<a class="catalog-direction" data-category="${d.category}" href="/contacts/"><div class="catalog-direction-media">${img(d.image,d.name)}</div><div><span class="eyebrow">Направление</span><h3>${d.name}</h3><p>${d.text}</p><span class="direction-link">Спросить про направление →</span></div></a>`;}
function catalog(){return `${header()}<main><section class="page-hero"><div class="eyebrow">Ассортимент · реальные позиции</div><h1>Каталог</h1><p>15 подтверждённых позиций и несколько направлений магазина. Цены с датой — исторические; актуальные цену и наличие подтвердит «Митта».</p></section><div class="catalog-toolbar" aria-label="Категории"><button class="filter-btn active" data-cat="all" aria-pressed="true">Все</button>${cats.map(c=>`<button class="filter-btn" data-cat="${c.key}" aria-pressed="false">${c.short}</button>`).join('')}</div><section class="catalog-content"><div class="catalog-grid" id="catalogGrid">${products.map((p,i)=>`${catalogCard(p)}${i===4?`<div class="catalog-insert" data-category="all"><span class="eyebrow">Перед визитом</span><h3>Выберите.<br>Напишите.<br>Приезжайте.</h3><p>В карточках — готовая ссылка в WhatsApp с названием модели. Никакой фальшивой корзины.</p></div>`:''}`).join('')}</div><div class="catalog-directions"><div class="directions-head"><span class="eyebrow">Ещё в ассортименте</span><h2>Направления без выдуманных карточек</h2></div>${catalogDirections.map(catalogDirection).join('')}</div></section></main>${footer()}`}

function gallery(p){
 if(!p.images.length)return `<div class="pdp-no-media"><span class="eyebrow">Фото не подтверждено</span><strong>Не подменяем модель похожим кадром.</strong><p>Запросите актуальное фото у магазина вместе с ценой и наличием.</p></div>`;
 const first=p.images[0];
 return `<div class="pdp-gallery"><div class="pdp-main ${p.fit==='contain'?'contain':''}">${img(first,p.name,'pdp-main-img',true)}</div>${p.images.length>1?`<div class="pdp-thumbs" aria-label="Фотографии товара">${p.images.map((src,i)=>`<button class="pdp-thumb ${i===0?'active':''}" type="button" data-src="${src}" data-alt="${p.name}, фото ${i+1}" aria-label="Показать фото ${i+1}" aria-pressed="${i===0?'true':'false'}">${img(src,`${p.name}, миниатюра ${i+1}`)}</button>`).join('')}</div>`:''}</div>`;
}
function productPage(p){
 const wa=waLink(p);
 const topSpecs=(p.specs||[]).slice(0,5);
 const related=products.filter(x=>x.slug!==p.slug&&x.category===p.category&&x.images.length).concat(products.filter(x=>x.slug!==p.slug&&x.category!==p.category&&x.images.length)).slice(0,3);
 const noPhoto=!p.images.length;
 return `${header()}<main class="pdp"><div class="crumb"><a href="/catalog/">Каталог</a> / <a href="/catalog/?category=${p.category}">${p.cat}</a></div><div class="pdp-grid ${noPhoto?'no-image':''}">${gallery(p)}<aside class="pdp-info"><div class="eyebrow">${p.cat}${p.article?` · арт. ${p.article}`:''}</div><h1>${p.name}</h1><p class="pdp-tagline">${p.tagline||''}</p>${priceBlock(p,'pdp-price-rich')}<div class="pdp-actions"><a class="btn blue" target="_blank" rel="noopener" href="${wa}">Написать по этому товару</a><a class="btn ghost" href="tel:${PRIMARY_PHONE.tel}">Позвонить: ${PRIMARY_PHONE.display}</a><a class="pdp-vk" target="_blank" rel="noopener" href="https://vk.ru/mebelbologoe">Или написать во ВКонтакте ↗</a></div>${topSpecs.length?`<div class="pdp-facts">${topSpecs.map(f=>`<div class="pdp-fact"><span>${f[0]}</span><span>${f[1]}</span></div>`).join('')}</div>`:''}<p class="pdp-note">${p.note||'Актуальные цену и наличие уточните у магазина перед поездкой.'}</p></aside></div>
<section class="pdp-detail"><div class="pdp-detail-head"><span class="eyebrow">О позиции</span><h2>${p.description?'Что подтверждено':'Данные по модели'}</h2></div><div class="pdp-detail-body">${p.description?`<p class="pdp-desc">${p.description}</p>`:''}${p.bullets?.length?`<ul class="pdp-bullets">${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`:''}${p.specs?.length?`<div class="spec-list full">${p.specs.map(s=>`<div class="spec-row"><span>${s[0]}</span><span>${s[1]}</span></div>`).join('')}</div>`:''}<p class="source-line">Источник сведений: ${p.sourceLabel}.${p.updated?` Дата публикации — ${p.updated}.`:''}</p></div></section>
<section class="related"><div class="related-head"><div><span class="eyebrow">Смотрите также</span><h2>Ещё позиции</h2></div><a class="bridge-link" href="/catalog/">Весь каталог →</a></div><div class="related-grid">${related.map(x=>productCard(x)).join('')}</div></section><section class="showroom-mini"><div class="showroom-mini-media">${img(media.storeCorner,'Выставочный зал «Митта»')}</div><div class="showroom-mini-copy"><div><div class="eyebrow">Бологое · физический магазин</div><h3>Лучше один раз увидеть в зале.</h3><p>Сравните размер, цвет и механизм на месте — после того как уточните наличие.</p></div><a class="btn light" href="/store/">О магазине</a></div></section><a class="sticky-mobile-cta" target="_blank" rel="noopener" href="${wa}">Написать по этому товару</a></main>${footer()}`;
}

function store(){return `${header()}<main class="store-page"><section class="store-intro"><div class="eyebrow">Физический магазин · Бологое</div><h1>Не только<br>каталог.</h1><p>«Митта» — реальный мебельный магазин с выставочным залом. Каталог помогает приехать уже с пониманием, какие модели и направления хочется посмотреть.</p></section><div class="store-image-big">${img(media.storeHero,'Кровати в выставочном зале «Митта»','',true)}</div><section class="store-story"><h2>Мебель лучше выбирать в реальном масштабе.</h2><div><p>В зале можно сравнить кровати, диваны, корпусную мебель, кухни и столовые группы — не по одной рекламной картинке, а рядом друг с другом.</p><p class="muted-on-dark">По данным самой «Митты»: выставочный зал свыше 700 м² и более 150 комплектов мебели.</p></div></section><section class="store-gallery store-gallery-rich"><figure class="wide">${img(media.storeBed,'Спальные гарнитуры в выставочном зале')}</figure><figure class="portrait">${img(media.storeKitchen,'Кухонные гарнитуры в магазине')}</figure><figure class="portrait">${img(media.storeWood,'Столы и табуреты из массива')}</figure><figure class="wide">${img(media.storeSofas,'Ряды диванов в магазине')}</figure><figure class="wide">${img(media.storeMattress,'Матрасы и кровати в выставочном зале')}</figure><figure class="wide">${img(media.storeCorner,'Интерьерная секция с кроватью и комодом')}</figure></section><section class="store-logistics"><div class="fact"><h4>Адрес</h4><p>ул. Ветка Холодильника, 9<br>Бологое</p></div><div class="fact"><h4>Пн–Пт</h4><p>09:00–18:00</p></div><div class="fact"><h4>Суббота</h4><p>09:00–16:00</p></div><div class="fact"><h4>Практично</h4><p>Самовывоз · доставка · парковка</p></div></section><section class="route-block"><h2>Приехать<br>в «Митту»</h2><div class="route-card"><div class="eyebrow">Точка назначения</div><p class="address">Бологое,<br>ул. Ветка Холодильника, 9</p><p>В части справочников адрес указан как 9/1. Воскресный график в источниках расходится — перед поездкой уточните его по телефону.</p><div class="route-actions"><a class="btn blue" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904">Открыть маршрут ↗</a><a class="btn ghost" target="_blank" rel="noopener" href="${whatsappLink()}">Написать в WhatsApp ↗</a></div></div></section></main>${footer()}`}

function delivery(){return `${header()}<main class="info-page"><div class="eyebrow">Покупателям</div><h1 class="info-title">Доставка<br>и оплата</h1><div class="info-grid"><div class="info-nav">Условия для конкретного заказа лучше уточнить у магазина.</div><div><section class="info-block"><h2>Получение</h2><p>Доступны <b>доставка</b> и <b>самовывоз</b>. Стоимость, зона доставки, подъём, сборка и сроки зависят от заказа — открытые источники не дают надёжных тарифов.</p></section><section class="info-block"><h2>Оплата</h2><p>В карточке магазина указаны наличные, банковская карта, безналичный расчёт, СБП, кредит, а также предоплата / постоплата. Конкретные условия кредита и предоплаты уточняйте на месте.</p></section><section class="info-block"><h2>Перед поездкой</h2><p>Если едете за конкретной моделью, откройте её карточку и отправьте готовый вопрос в WhatsApp — так магазин сможет подтвердить актуальную цену и наличие.</p><a class="btn blue" href="/catalog/">Выбрать товар</a></section></div></div></main>${footer()}`}

function contacts(){return `${header()}<main class="info-page"><div class="eyebrow">Связаться с магазином</div><h1 class="info-title">Контакты</h1><div class="info-grid"><div class="info-nav">Бологое · Тверская область</div><div><section class="info-block"><h2>Магазин</h2><p>ул. Ветка Холодильника, 9, Бологое. В части справочников адрес указан как 9/1.</p><div class="contact-cards"><a class="contact-card contact-whatsapp" target="_blank" rel="noopener" href="${whatsappLink()}"><small>Быстрый вопрос</small><strong>WhatsApp</strong><span>Написать →</span></a><a class="contact-card" href="tel:${PRIMARY_PHONE.tel}"><small>Основной по данным Яндекс Карт</small><strong>${PRIMARY_PHONE.display}</strong><span>Позвонить →</span></a><a class="contact-card" href="tel:+74823833564"><small>Стационарный</small><strong>+7 48238 3-35-64</strong><span>Позвонить →</span></a><a class="contact-card" target="_blank" rel="noopener" href="https://vk.ru/mebelbologoe"><small>Соцсеть магазина</small><strong>ВКонтакте</strong><span>Открыть →</span></a><a class="contact-card" target="_blank" rel="noopener" href="https://yandex.ru/maps/org/mitta/1075173904"><small>Маршрут и отзывы</small><strong>Яндекс Карты</strong><span>Открыть →</span></a></div></section><section class="info-block"><h2>Рабочее время</h2><p><b>Понедельник–пятница:</b> 09:00–18:00<br><b>Суббота:</b> 09:00–16:00<br>Воскресный график уточните по телефону перед поездкой.</p></section></div></div></main>${footer()}`}

function render(){
 const titles={'/':'Митта — концепт сайта мебельного магазина в Бологом','/catalog':'Каталог — Митта · демо','/store':'Магазин — Митта · демо','/delivery-payment':'Доставка и оплата — Митта · демо','/contacts':'Контакты — Митта · демо'};
 const productSlug=path.startsWith('/product/')?path.split('/').filter(Boolean)[1]:null;
 const product=productSlug?products.find(x=>x.slug===productSlug):null;
 document.title=product?`${product.name} — Митта · демо`:(titles[path]||'Митта — демонстрационный концепт');
 const meta=document.querySelector('meta[name="description"]');
 if(meta)meta.setAttribute('content',product?`Неофициальная демонстрационная карточка: ${product.name}. Реальные материалы и данные из открытых источников «Митты».`:'Неофициальная демонстрационная концепция сайта мебельного магазина «Митта» в Бологом.');
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
 const params=new URLSearchParams(location.search),initial=params.get('category');const buttons=[...document.querySelectorAll('.filter-btn')];if(buttons.length){const apply=cat=>{buttons.forEach(b=>{const active=b.dataset.cat===cat;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});document.querySelectorAll('[data-category]').forEach(el=>{el.hidden=!(cat==='all'||el.dataset.category===cat||el.dataset.category==='all')})};buttons.forEach(b=>b.onclick=()=>{apply(b.dataset.cat);history.replaceState(null,'',route(b.dataset.cat==='all'?'/catalog/':`/catalog/?category=${b.dataset.cat}`))});if(initial&&categoryByKey[initial])apply(initial)}
}
render();
