"""Pluggable storage abstraction.

Local disk is used by default. The same interface is implemented for S3 so the
app can migrate to AWS later by only changing STORAGE_BACKEND=s3 and providing
the AWS_* environment variables -- no application code changes required.
"""
from __future__ import annotations
import os
import uuid
from abc import ABC, abstractmethod

from app.core.config import settings


class StorageBackend(ABC):
    @abstractmethod
    def save(self, data: bytes, filename: str, content_type: str = "") -> str:
        """Persist a file and return its publicly accessible URL."""

    @staticmethod
    def _unique_name(filename: str) -> str:
        ext = os.path.splitext(filename)[1].lower()
        return f"{uuid.uuid4().hex}{ext}"


class LocalStorage(StorageBackend):
    def __init__(self) -> None:
        self.dir = settings.LOCAL_STORAGE_DIR
        os.makedirs(self.dir, exist_ok=True)

    def save(self, data: bytes, filename: str, content_type: str = "") -> str:
        name = self._unique_name(filename)
        path = os.path.join(self.dir, name)
        with open(path, "wb") as f:
            f.write(data)
        base = settings.PUBLIC_MEDIA_URL.rstrip("/")
        return f"{base}/{name}"


class S3Storage(StorageBackend):
    def __init__(self) -> None:
        import boto3  # imported lazily so local mode needs no AWS creds
        self.bucket = settings.AWS_S3_BUCKET
        self.client = boto3.client(
            "s3",
            region_name=settings.AWS_S3_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID or None,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY or None,
        )

    def save(self, data: bytes, filename: str, content_type: str = "") -> str:
        key = f"chickens/{self._unique_name(filename)}"
        extra = {"ContentType": content_type} if content_type else {}
        self.client.put_object(Bucket=self.bucket, Key=key, Body=data, **extra)
        if settings.AWS_S3_PUBLIC_BASE_URL:
            return f"{settings.AWS_S3_PUBLIC_BASE_URL.rstrip('/')}/{key}"
        return f"https://{self.bucket}.s3.{settings.AWS_S3_REGION}.amazonaws.com/{key}"


_backend: StorageBackend | None = None


def get_storage() -> StorageBackend:
    global _backend
    if _backend is None:
        _backend = S3Storage() if settings.STORAGE_BACKEND == "s3" else LocalStorage()
    return _backend
