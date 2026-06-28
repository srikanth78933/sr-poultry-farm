.PHONY: setup up down logs rebuild seed

setup:
	cp -n backend/.env.example backend/.env || true
	cp -n frontend/.env.example frontend/.env || true
	cp -n .env.example .env || true
	@echo "Edit backend/.env (set SECRET_KEY, passwords) then run: make up"

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

rebuild:
	docker compose build --no-cache

seed:
	docker compose exec backend python -m app.seed
