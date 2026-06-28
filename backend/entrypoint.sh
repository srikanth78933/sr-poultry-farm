#!/usr/bin/env bash
set -e

echo "Waiting for Postgres at ${POSTGRES_HOST:-postgres}:${POSTGRES_PORT:-5432}..."
python - <<'PY'
import os, time, socket
host = os.getenv("POSTGRES_HOST", "postgres")
port = int(os.getenv("POSTGRES_PORT", "5432"))
for _ in range(60):
    try:
        with socket.create_connection((host, port), timeout=2):
            print("Postgres is up.")
            break
    except OSError:
        time.sleep(1)
else:
    raise SystemExit("Postgres did not become available in time.")
PY

echo "Creating tables..."
python -m app.init_db

echo "Seeding initial data (idempotent)..."
python -m app.seed || true

echo "Starting API server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers
