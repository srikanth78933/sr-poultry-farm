"""Idempotent seed: default admin + Lovable breed inventory."""
from sqlalchemy import select, delete

from app.core.config import settings
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import User, Chicken, ChickenImage, Egg
from app.models.enums import UserRole, ChickenStatus, EggAvailability

# Exact breeds matching the Lovable design and frontend sampleData.ts
SAMPLE_CHICKENS = [
    {
        "breed_name": "Aseel",
        "description": "The heritage fighter breed, prized for its firm, flavorful meat and traditional Andhra taste.",
        "min_weight_kg": 1.5, "max_weight_kg": 2.8, "price_per_kg": 540,
        "age_months": 8, "status": ChickenStatus.available, "is_featured": True,
        "cover_image": "/bird-aseel.jpg",
    },
    {
        "breed_name": "Kadaknath",
        "description": "Rare black-meat breed known for its medicinal value and iron-rich, low-fat profile.",
        "min_weight_kg": 1.2, "max_weight_kg": 1.8, "price_per_kg": 820,
        "age_months": 10, "status": ChickenStatus.reserved, "is_featured": True,
        "cover_image": "/bird-kadaknath.jpg",
    },
    {
        "breed_name": "Sonali Cross",
        "description": "Free-range golden hen raised on grain, greens and open pasture. A weekday favourite.",
        "min_weight_kg": 1.4, "max_weight_kg": 2.2, "price_per_kg": 480,
        "age_months": 7, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/bird-sonali.jpg",
    },
    {
        "breed_name": "Ghyas Desi",
        "description": "A hardy village-mix bird, foraged in mango orchards for a clean, layered flavour.",
        "min_weight_kg": 1.2, "max_weight_kg": 1.6, "price_per_kg": 460,
        "age_months": 9, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/bird-ghyas.jpg",
    },
    {
        "breed_name": "Giriraja",
        "description": "Popular free-range country breed with golden plumage. Slow-grown on open pasture for rich, full flavour.",
        "min_weight_kg": 1.6, "max_weight_kg": 2.4, "price_per_kg": 500,
        "age_months": 7, "status": ChickenStatus.available, "is_featured": True,
        "cover_image": "/bird-sonali.jpg",
    },
    {
        "breed_name": "Vanraja",
        "description": "Hardy dual-purpose desi breed suited to open village farming. Excellent taste, moderate growth.",
        "min_weight_kg": 1.3, "max_weight_kg": 2.0, "price_per_kg": 490,
        "age_months": 8, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/bird-aseel.jpg",
    },
    {
        "breed_name": "Naked Neck Desi",
        "description": "Traditional village breed with distinct bare neck. Heat-tolerant, raised on open ground — tender, clean meat.",
        "min_weight_kg": 1.1, "max_weight_kg": 1.7, "price_per_kg": 470,
        "age_months": 9, "status": ChickenStatus.available, "is_featured": False,
        "cover_image": "/bird-ghyas.jpg",
    },
    {
        "breed_name": "Chittagong Heritage",
        "description": "Tall, lean heritage breed prized across South Asia. Slow-grown for deep, flavourful dark meat.",
        "min_weight_kg": 1.8, "max_weight_kg": 3.0, "price_per_kg": 580,
        "age_months": 12, "status": ChickenStatus.available, "is_featured": True,
        "cover_image": "/bird-kadaknath.jpg",
    },
]

CORRECT_BREEDS = {c["breed_name"] for c in SAMPLE_CHICKENS}

SAMPLE_EGGS = [
    {
        "name": "Desi Country Eggs",
        "telugu_name": "నాటు గుడ్లు",
        "description": "Free-range eggs from our open-pasture Natu Kodi hens. Rich golden yolk, firm white — nothing like a store-bought egg.",
        "availability": EggAvailability.available,
        "cover_image": "/eggs-desi.jpg",
        "is_featured": True,
    },
    {
        "name": "Kadaknath Eggs",
        "telugu_name": "కాడక్నాథ్ గుడ్లు",
        "description": "Rare dark-shelled eggs from our Kadaknath flock. Iron-rich, low-fat, and prized for their medicinal value.",
        "availability": EggAvailability.limited,
        "cover_image": "/eggs-kadaknath.jpg",
        "is_featured": True,
    },
    {
        "name": "Aseel Heritage Eggs",
        "telugu_name": "అసీల్ గుడ్లు",
        "description": "Strong-shelled eggs from our heritage Aseel hens. Deep flavour from birds raised on natural grain and open land.",
        "availability": EggAvailability.available,
        "cover_image": "/eggs-aseel.jpg",
        "is_featured": False,
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
    existing = db.scalars(select(Chicken)).all()

    # If any existing breed is NOT in our correct set, wipe and reseed
    if existing:
        existing_names = {c.breed_name for c in existing}
        if existing_names == CORRECT_BREEDS:
            print("Chickens already seeded with correct breeds.")
            return
        # Old/wrong data — clear and reseed
        print(f"Old breed data found ({existing_names}). Reseeding with correct breeds...")
        db.execute(delete(ChickenImage))
        db.execute(delete(Chicken))
        db.commit()

    for data in SAMPLE_CHICKENS:
        ch = Chicken(**data)
        db.add(ch)
        db.flush()
        db.add(ChickenImage(chicken_id=ch.id, url=data["cover_image"], alt_text=data["breed_name"]))
    db.commit()
    print(f"Seeded {len(SAMPLE_CHICKENS)} chickens: {', '.join(c['breed_name'] for c in SAMPLE_CHICKENS)}")


def seed_eggs(db) -> None:
    existing = db.scalars(select(Egg)).all()
    if existing:
        print(f"Eggs already seeded ({len(existing)} entries).")
        return
    for data in SAMPLE_EGGS:
        db.add(Egg(**data))
    db.commit()
    print(f"Seeded {len(SAMPLE_EGGS)} egg types.")


def main() -> None:
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_chickens(db)
        seed_eggs(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()
