# Митта — speculative website concept

Неофициальная демонстрационная версия сайта мебельного магазина «Митта» в Бологое. Проект собран как статический multi-page сайт без build-step и предназначен для презентации концепции.

## Структура

- `/` — главная
- `/catalog/` — каталог
- `/product/<slug>/` — карточки товаров
- `/store/` — шоурум
- `/delivery-payment/` — доставка и оплата
- `/contacts/` — контакты
- `/assets/` — стили, JS и изображения
- `/docs/` — fact audit, unresolved facts и implementation notes

## Локальный запуск

Нужен обычный статический HTTP-сервер. Например:

```bash
python -m http.server 8080
```

После этого откройте `http://localhost:8080/`.

Не открывайте HTML через `file://`: для корректной проверки маршрутов используйте HTTP-сервер.

## Deployment note

Nested routes используют каталоги с собственным `index.html`. CSS/JS подключаются относительными путями, а `site.js` автоматически определяет base path, поэтому одна и та же сборка работает как в корне домена, так и в GitHub Pages project-subpath вроде `/mitta-test/`.

## Demo safety

Страницы содержат `noindex,nofollow,noarchive`. Это концепт, а не официальный production-сайт. Перед production-публикацией необходимо перепроверить сведения из `/docs/UNRESOLVED_FACTS.md` и права на использование фотографий.
## GitHub Pages

Сборка поддерживает публикацию как GitHub Pages project-site в подпапке репозитория. CSS/JS подключаются относительными путями, а `site.js` автоматически определяет base path (например, `/mitta-test`) и добавляет его к внутренним маршрутам и изображениям.

Для `KROFN/mitta-test`: Settings → Pages → Deploy from a branch → `main` / `(root)`. Файл `.nojekyll` уже находится в корне. На custom domain пользовательского Pages-сайта проект открывается по `https://krofn.ru/mitta-test/`.

