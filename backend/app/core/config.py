from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    PROJECT_NAME: str = "SR Poultry Farm API"
    API_V1_PREFIX: str = "/api"

    # Database
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432
    POSTGRES_USER: str = "sr_poultry"
    POSTGRES_PASSWORD: str = "change_this_password"
    POSTGRES_DB: str = "sr_poultry_db"

    # Security
    SECRET_KEY: str = "change_this_to_a_long_random_secret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 720

    # First admin
    FIRST_ADMIN_EMAIL: str = "admin@srpoultryfarm.com"
    FIRST_ADMIN_PASSWORD: str = "Admin@12345"
    FIRST_ADMIN_NAME: str = "Farm Admin"

    # CORS
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000,http://localhost"

    # Storage
    STORAGE_BACKEND: str = "local"
    LOCAL_STORAGE_DIR: str = "/app/storage/uploads"
    PUBLIC_MEDIA_URL: str = "/media"

    # AWS S3
    AWS_S3_BUCKET: str = ""
    AWS_S3_REGION: str = "ap-south-1"
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_PUBLIC_BASE_URL: str = ""

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql+psycopg2://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.BACKEND_CORS_ORIGINS.split(",") if o.strip()]


settings = Settings()
