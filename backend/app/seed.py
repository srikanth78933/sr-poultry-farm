"""Idempotent seed: default admin + sample Naati Kodi inventory."""
from sqlalchemy import select

from app.core.config import settings
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import User, Chicken, ChickenImage
from app.models.enums import UserRole, ChickenStatus

SAMPLE_CHICKENS = [
    {
        "breed_name": "Naati Kodi Premium",
        "description": "Free-roaming country chicken raised on natural grains and open pasture. Firm, flavourful meat prized for traditional Andhra-style cooking.",
        "min_weight_kg": 1.2, "max_weight_kg": 1.5, "price_per_kg": 480,
        "age_months": 7, "status": ChickenStatus.available, "is_featured": True,
        "cover_image": "/images/chicken-1.svg",
    },
    {
        "breed_name": "Naati Kodi Classic",
        "description": "Traditionally reared desi hen, open-garden farmed with fresh water and zero growth hormones. Ideal for everyday natural chicken curry.",
        "min_weight_kg": 1.0, "max_weight_kg": 1.3, "price_per_kg": 440,
        "age_months": 6, "status": ChickenStatus.available, "is_featured": True,
        "cover_image": "/images/chicken-2.svg",
    },
    {
        "breed_name": "Country Rooster (Poonga)",
        "description": "Mature free-range rooster with rich, dense meat. Slow-grown in an open environment for authentic naati flavour.",
        "min_weight_kg": 1.6, "max_weight_kg": 2.2, "price_per_kg": 520,
        "age_months": 9, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/images/chicken-3.svg",
    },
    {
        "breed_name": "Young Naati Pullet",
        "description": "Tender young hen, naturally fed and pasture-raised. Lighter, softer meat suitable for fry and pepper preparations.",
        "min_weight_kg": 0.8, "max_weight_kg": 1.1, "price_per_kg": 420,
        "age_months": 5, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/images/chicken-4.svg",
    },
]


def seed_admin(db) -> None:
    existing = db.scalar(select(User).where(User.email == settings.FIRST_ADMIN_EMAIL))
    if existing:
        print(f"Admin {settings.FIRST_ADMIN_EMAIL} already exists.")
        return
    admin = User(
        name=settings.FIRST_ADMIN_NAME,
        email=settings.FIRST_ADMIN_EMAIL,
        hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
        role=UserRole.admin,
        is_active=True,
    )
    db.add(admin)
    db.commit()
    print(f"Created admin: {settings.FIRST_ADMIN_EMAIL}")


def seed_chickens(db) -> None:
    count = db.scalar(select(Chicken)) is not None
    if count:
        print("Chickens already seeded.")
        return
    for data in SAMPLE_CHICKENS:
        ch = Chicken(**data)
        db.add(ch)
        db.flush()
        db.add(ChickenImage(chicken_id=ch.id, url=data["cover_image"], alt_text=data["breed_name"]))
    db.commit()
    print(f"Seeded {len(SAMPLE_CHICKENS)} chickens.")


def main() -> None:
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_chickens(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
