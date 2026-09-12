# IMPLEMENTATION_NOTES — release build

Финальный вариант остаётся **статическим deploy-friendly сайтом без backend**. Архитектура синтезированной версии не менялась: минимальный HTML shell на route, data-driven `assets/site.js`, responsive `assets/site.css`.

Release QA был намеренно точечным: **никакого redesign / framework migration / новой визуальной системы**.

## Routes

Основные:

- `/`
- `/catalog/`
- `/store/`
- `/delivery-payment/`
- `/contacts/`

PDP:

- `/product/adam-1/`
- `/product/ascella/`
- `/product/brenta/`
- `/product/franco/`
- `/product/gamma-15/`
- `/product/gloria/`
- `/product/kotenok/`
- `/product/laguna/`
- `/product/mija-a/`
- `/product/mori-prihozhaya/`
- `/product/raus-provans/`
- `/product/solo/`
- `/product/tv-stands/`
- `/product/vendetta-1600/`
- `/product/versal/`

Всего: **20 direct-load routes**.

## Контентная модель

Product data хранится в `assets/site.js` и включает:

- `slug`, `name`, `category`, `cat`, `tagline`;
- `images[]`;
- `price` + исторический note;
- `article` при наличии;
- `specs[]`, `bullets[]`, `description`;
- `sourceLabel`, `sourceRefs`, `updated`;
- автоматически собираемый product-specific WhatsApp prefill.

В UI участвует 41 изображение из локального recovered media pool. Все активные ссылки на media разрешаются локально; ни stock, ни AI imagery, ни remote image CDN нет.

## Release QA changes

- WhatsApp исправлен с неподтверждённого mobile target на **+7 (48238) 3-35-64**, который прямо указан в сохранённой публичной WhatsApp-кнопке организации.
- Телефонный CTA оставлен на **+7 (919) 065-85-85**, показанный Яндекс Картами как основной.
- Historical price state усилен: статус «Историческая цена · не подтверждена как текущая» расположен перед суммой в Catalog/PDP.
- Compact no-photo cards/PDP сохранены; giant placeholder не возвращался.
- Mobile menu получил `aria-controls`, синхронные `aria-expanded`/`aria-hidden`, body scroll lock и закрытие по Escape с возвратом focus.
- Catalog filters и PDP thumbnails синхронизируют `aria-pressed`.
- Во всех HTML shells сохранён `noindex,nofollow,noarchive`; публичные title/description не используют служебные `demo / concept` формулировки.
- Footer содержит только магазин, навигацию и контакты; служебная маркировка концепта убрана из публичного интерфейса.
- Удалены старый `test.html`, устаревшие QA screenshots и 19 legacy image-дубликатов из корня `assets/images/`.

## Responsive / accessibility

Проверены layout widths: **1440, 1280, 1024, 430, 390 px**.

- горизонтальный overflow: 0 на проверенных key routes;
- `:focus-visible` имеет заметный blue outline;
- meaningful images имеют `alt`;
- duplicate IDs не обнаружены;
- reduced-motion отключает transitions и smooth scroll;
- mobile menu не оставляет body locked после Escape;
- mobile PDP оставляет обычный in-page CTA и дополнительно использует sticky CTA в реальном браузере.

Для full-page release screenshots sticky/fixed элементы намеренно не дублируются при stitch capture; это только техника съёмки и не меняет runtime CSS.

## Performance notes

- Активные UI media: около **4.1 MiB** суммарно, крупнейший реально используемый JPEG ≈ **190 KiB**.
- Hero/PDP first image используют eager loading; остальные изображения — `loading="lazy"`, `decoding="async"`.
- Рендеруемые media containers заранее задают geometry/aspect ratio или min-height, поэтому в QA не наблюдалось заметного скачка layout при загрузке изображений.
- Нет стороннего JS framework, analytics или image CDN.

## Deployment assumption

Сайт использует folder routes (`/catalog/index.html`, `/product/laguna/index.html` и т. п.) и absolute root assets `/assets/...`.

Для корректного direct refresh хостинг должен:

1. публиковать **содержимое `MITTA_DEMO` в корне домена**;
2. раздавать `index.html` внутри каждой route-папки обычным static-server поведением.

SPA rewrite не требуется. Если демо размещается в подпапке домена, absolute asset/navigation paths нужно адаптировать к base path.

## Final screenshots

`/screenshots/` содержит ровно release-набор:

- `home-desktop.jpg`
- `home-mobile.jpg`
- `catalog-desktop.jpg`
- `catalog-mobile.jpg`
- `product-laguna-desktop.jpg`
- `product-laguna-mobile.jpg`
- `store-desktop.jpg`
- `store-mobile.jpg`


## Structure polish after live review

- Catalog rebuilt from one mixed editorial grid into 8 explicit category sections.
- Product cards now use a consistent comparison rhythm; no-photo products are compact rows inside their category rather than oversized placeholders.
- Category-only assortment is shown as a subordinate “Ещё в ассортименте” card, never as a giant editorial insert.
- Removed public-facing implementation commentary such as “направления без выдуманных карточек” and “никакой фальшивой корзины”.
- Delivery/payment rebuilt as a three-card utility grid with a separate checklist of variables to confirm.
- Contacts rebuilt around two primary actions (WhatsApp / main phone), three secondary channels, and a separate hours table.
- Home reputation block now uses 6 named Yandex reviews in a horizontal scroll-snap carousel with controls; rating is integrated into the heading rather than used as a standalone poster.


## Detail polish 2026-09-13

- Home section intros привязаны к левой reading-column и продолжаются тонкой линией.
- Home catalog slice: 4 равные карточки вместо oversized editorial tiles.
- Showroom: одно фото + `Выставочный зал`, без второго декоративного кадра.
- Reviews: циклическая навигация, counter и dots.
- Catalog: 4-column default, 3-column optional large view; карточка = фото + название + одна характеристика + `Цена по запросу`.
- Kitchens/Garden вынесены из товарной сетки в отдельный блок inquiry-направлений.
- Contacts: рабочее время находится в первом экране рядом с адресом.
