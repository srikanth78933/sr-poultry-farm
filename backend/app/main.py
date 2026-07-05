import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.core.config import settings
from app.core.database import engine, get_db
from app.api import api_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

_show_docs = settings.ENVIRONMENT == "development"

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs" if _show_docs else None,
    redoc_url="/redoc" if _show_docs else None,
    openapi_url="/openapi.json" if _show_docs else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

if settings.STORAGE_BACKEND == "local":
    os.makedirs(settings.LOCAL_STORAGE_DIR, exist_ok=True)
    app.mount(
        settings.PUBLIC_MEDIA_URL,
        StaticFiles(directory=settings.LOCAL_STORAGE_DIR),
        name="media",
    )

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/health", tags=["health"])
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception:
        logger.exception("Health check DB ping failed")
        db_status = "error"
    return {"status": "ok" if db_status == "ok" else "degraded", "db": db_status, "service": settings.PROJECT_NAME}


@app.get("/")
def root():
    return {"message": "SR Poultry Farm API"}
