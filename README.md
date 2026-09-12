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

Не открывайте HTML через `file://`: проект использует root-relative URL и рассчитан на HTTP hosting с корнем сайта в корне репозитория.

## Deployment note

Nested routes используют каталоги с собственным `index.html`, поэтому hosting должен сохранять обычное directory-index поведение. Для GitHub Pages в project-subpath (`username.github.io/repo/`) root-relative URL потребуют отдельной адаптации base path; для custom domain / root hosting текущая структура подходит без изменений.

## Demo safety

Страницы содержат `noindex,nofollow,noarchive`. Это концепт, а не официальный production-сайт. Перед production-публикацией необходимо перепроверить сведения из `/docs/UNRESOLVED_FACTS.md` и права на использование фотографий.
