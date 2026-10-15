# SoC Planning UI

Веб-интерфейс с полной информацией по планированию отдела SoC (L1, 24/7):
роли и обязанности, три варианта графиков смен под 4 ставки + руководитель,
процессы (playbooks, эскалация, метрики), дорожная карта и заметки по ТК РФ.

## Запуск через Docker

```bash
cd soc_ui
docker compose up -d          # или: docker build -t soc-ui . && docker run -p 8080:8080 soc-ui
```

Открыть: http://localhost:8080

## Запуск без Docker

```bash
python3 soc_ui/server.py      # stdlib, зависимостей нет
```

## Структура

```
soc_ui/
├── Dockerfile            # python:3.12-slim, порт 8080
├── docker-compose.yml    # soc-ui, 8080:8080, restart unless-stopped
├── server.py             # минимальный HTTP-сервер (stdlib)
└── static/
    ├── index.html        # каркас страницы (табы + контейнер)
    ├── app.js            # ВСЕ ДАННЫЕ в объекте DATA + рендеринг вкладок
    └── style.css         # тёмная тема + print-стили (Ctrl+P → PDF)
```

## Как редактировать содержимое

Весь контент — данные — лежит в `static/app.js` в константе `DATA`:
- `roles` — состав команды и обязанности;
- `schedules` — варианты графиков A/B/C;
- `comparison` — сводная таблица сравнения;
- `processes` / `roadmap` / `legal` — процессы, план развития, ТК РФ.

Правите значения, перезагружаете страницу — сервер отдаёт файлы без кеша.
