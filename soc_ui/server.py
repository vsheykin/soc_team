"""Минимальный HTTP-сервер для SoC Planning UI.

Раздает static/ (index.html по умолчанию) на 0.0.0.0:8080.
Без внешних зависимостей — только stdlib.
"""
import http.server
import os

PORT = int(os.environ.get("PORT", "8080"))
STATIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def translate_path(self, path):
        # все запросы (включая /static/...) резолвим относительно STATIC_DIR
        root = os.path.abspath(STATIC_DIR)
        rel = super().translate_path(path)          # может дать .../static/static/...
        abs_rel = os.path.normpath(rel)
        prefix = root + os.sep
        if abs_rel.startswith(prefix):
            tail = abs_rel[len(prefix):]
            while tail.startswith("static" + os.sep):  # срезаем двойной префикс
                tail = tail[len("static" + os.sep):]
            cand = os.path.join(root, tail) if tail else root
            if os.path.isdir(cand):
                idx = os.path.join(cand, "index.html")
                return idx if os.path.exists(idx) else cand
            if os.path.exists(cand):
                return cand
        return os.path.join(root, "index.html")

    def end_headers(self):
        # отключаем кеш, чтобы правки app.js/style.css были видны сразу
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[soc-ui] %s - %s" % (self.address_string(), fmt % args))


if __name__ == "__main__":
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"SoC Planning UI запущен: http://localhost:{PORT}")
        httpd.serve_forever()
