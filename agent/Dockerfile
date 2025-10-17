# syntax=docker/dockerfile:1
FROM python:3.12-slim

RUN apt-get update && apt-get install -y curl ca-certificates build-essential && rm -rf /var/lib/apt/lists/*
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

ENV PATH="/root/.local/bin:${PATH}"
ENV PYTHONUNBUFFERED=1

WORKDIR /app
COPY pyproject.toml uv.lock* ./
COPY src ./src

RUN uv sync --frozen

CMD ["uv", "run", "python", "src/agent/main.py"]