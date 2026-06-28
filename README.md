# 🐔 SR Poultry Farm — Natural Naati Kodi

A production-ready, full-stack web application for **SR Poultry Farm**, a premium
natural country-chicken (Naati Kodi) brand. Customers explore available birds, learn
about the farm, and **book a farm visit**; purchases are recorded by the farm after the
customer visits, selects a bird, and it is weighed live.

> **Stack:** Next.js 14 (React + TypeScript + Tailwind) · FastAPI (Python) · PostgreSQL ·
> SQLAlchemy · JWT auth · Docker Compose · Nginx · S3-ready storage.

---

## ✨ Features

### Customer website
- **Premium landing page** with hero, free-roaming farm visuals, animations and glassmorphism.
- **Available Naati Kodi** — dynamic cards: image, breed, weight range, price/kg, availability, age, description.
- **About the Farm** — storytelling: natural farming, free roaming, traditional feeding, clean water, quality assurance + 4-step farming process.
- **How to Buy** — the full visit → select → weigh → bill → pay journey.
- **Farm Visit Booking** — pick date & time slot, name, mobile, visitors, purpose, with **double-booking prevention** and confirmation.

### Admin dashboard (`/admin`)
- **Dashboard:** total / available / sold birds, upcoming & pending bookings, total orders, revenue collected & billed.
- **Inventory:** add / edit / remove birds, upload images, set prices, mark featured.
- **Bookings:** approve / reject / complete visit requests.
- **Orders & Billing:** record sales with actual weight × price/kg, track payments (cash/UPI/card/bank).
- **Customers:** maintain buyer records.
- Secured with **JWT authentication** and bcrypt password hashing.

---

## 🗂 Project structure

```
sr-poultry-farm/
├── docker-compose.yml          # postgres + backend + frontend + nginx
├── Makefile                    # convenience commands
├── .env.example
├── nginx/nginx.conf            # reverse proxy (/, /api, /media)
├── backend/                    # FastAPI + SQLAlchemy
│   ├── app/
│   │   ├── core/               # config, database, security (JWT, hashing)
│   │   ├── models/             # users, chickens, images, bookings, customers, orders, payments
│   │   ├── schemas/            # Pydantic request/response models
│   │   ├── api/routes/         # auth, chickens, bookings, orders, customers, dashboard, uploads
│   │   ├── storage/            # local + S3 storage abstraction
│   │   ├── main.py  init_db.py  seed.py
│   ├── Dockerfile  entrypoint.sh  requirements.txt  .env.example
└── frontend/                   # Next.js (App Router) + TS + Tailwind
    ├── src/app/(site)/         # public pages (home, chickens, about, purchase, book-visit)
    ├── src/app/admin/          # admin login + dashboard pages
    ├── src/components/         # Navbar, Footer, ChickenCard, AdminShell, ...
    ├── src/lib/                # typed API client, sample fallback data
    ├── public/images/          # sample SVG farm + chicken illustrations
    └── Dockerfile  package.json  tailwind.config.ts  .env.example
```

---

## 🚀 Quick start (Docker — recommended)

**Prerequisites:** Docker Desktop with Docker Compose v2.

```bash
# 1. Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp .env.example .env

# 2. IMPORTANT: edit backend/.env
#    - set a strong SECRET_KEY        (openssl rand -hex 32)
#    - set POSTGRES_PASSWORD          (match it in root .env too)
#    - set FIRST_ADMIN_PASSWORD

# 3. Launch everything
docker compose up --build
```

Then open:

| URL                          | What                          |
|------------------------------|-------------------------------|
| http://localhost             | Customer website (via nginx)  |
| http://localhost/admin/login | Admin dashboard               |
| http://localhost/docs        | FastAPI interactive API docs  |

The backend automatically creates tables and seeds a default admin + sample birds on first boot.

**Default admin** (change in `backend/.env`):
- Email: `admin@srpoultryfarm.com`
- Password: `Admin@12345`

> With `make` installed you can simply run `make setup` then `make up`.

---

## 🛠 Local development (without Docker)

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # set POSTGRES_HOST=localhost
# ensure a local Postgres is running and matches your .env
python -m app.init_db
python -m app.seed
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env          # NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev                   # http://localhost:3000
```

---

## 🔐 Security

- **JWT** bearer tokens (`python-jose`), configurable expiry & algorithm.
- **bcrypt** password hashing (`passlib`).
- **Input validation** via Pydantic schemas on every endpoint.
- Admin-only routes protected by an auth dependency.
- All secrets supplied via **environment variables** — nothing hard-coded.
- CORS restricted to configured origins.

---

## 🗄 Database design

| Table            | Purpose                                              |
|------------------|------------------------------------------------------|
| `users`          | Admin / staff accounts (hashed passwords, roles)     |
| `chickens`       | Naati Kodi inventory (breed, weight, price, status)  |
| `chicken_images` | Multiple images per bird                             |
| `farm_visits`    | Visit bookings (date, slot, visitors) + status       |
| `customers`      | Buyer records                                        |
| `orders`         | Sales (actual weight × price/kg, totals, status)     |
| `payments`       | Payment records linked to orders                     |

---

## 🖼 Image storage (local now, S3 later)

Storage is abstracted behind `app/storage`. Local disk is the default
(`STORAGE_BACKEND=local`, served at `/media`). To migrate to AWS S3, set in `backend/.env`:

```
STORAGE_BACKEND=s3
AWS_S3_BUCKET=your-bucket
AWS_S3_REGION=ap-south-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_PUBLIC_BASE_URL=https://cdn.yourdomain.com   # optional (CloudFront)
```
No application code changes are required.

---

## ☁️ Future AWS production architecture

- **Frontend & backend** → container images on **ECS Fargate** (or **EKS**).
- **Database** → **RDS for PostgreSQL** (point `POSTGRES_HOST` at the RDS endpoint).
- **Images** → **S3** (set `STORAGE_BACKEND=s3`) fronted by **CloudFront**.
- **Edge / TLS** → **Application Load Balancer** + ACM certificate, **Route 53** DNS.
- Replace the bundled nginx with the ALB, or keep nginx as an in-cluster gateway.

---

## 🔌 Key API endpoints

| Method | Path                          | Auth | Description                |
|--------|-------------------------------|------|----------------------------|
| POST   | `/api/auth/login`             | —    | Admin login (returns JWT)  |
| GET    | `/api/chickens`               | —    | List birds                 |
| POST   | `/api/chickens`               | ✅   | Create bird                |
| PUT    | `/api/chickens/{id}`          | ✅   | Update bird                |
| DELETE | `/api/chickens/{id}`          | ✅   | Remove bird                |
| GET    | `/api/bookings/slots`         | —    | Slot availability for date |
| POST   | `/api/bookings`               | —    | Create booking             |
| GET/PATCH | `/api/bookings`            | ✅   | Manage bookings            |
| GET/POST | `/api/orders`              | ✅   | Orders & billing           |
| POST   | `/api/orders/{id}/payments`   | ✅   | Record payment             |
| GET    | `/api/dashboard/stats`        | ✅   | Dashboard metrics          |
| POST   | `/api/uploads/image`          | ✅   | Upload an image            |

Full interactive docs at `/docs`.

---

## 📦 Tech choices

All open-source: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, FastAPI,
SQLAlchemy, PostgreSQL, Pydantic, python-jose, passlib, Docker, Nginx.

---

© SR Poultry Farm. Raised Naturally · Healthy · Traditional · Farm Fresh.
