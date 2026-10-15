FROM python:3.12-slim

WORKDIR /app

# Копируем простой сервер и статику
COPY server.py ./server.py
COPY static ./static

EXPOSE 8080

CMD ["python", "server.py"]
