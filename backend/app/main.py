import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings
from app.api import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve locally stored media when using the local storage backend.
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
    return {"status": "ok", "service": settings.PROJECT_NAME}


@app.get("/")
def root():
    return {"message": "SR Poultry Farm API", "docs": "/docs"}
