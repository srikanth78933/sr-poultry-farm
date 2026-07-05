"""Create all tables and apply lightweight column migrations."""
from sqlalchemy import text
from app.core.database import Base, engine
import app.models  # noqa: F401  (register models)


def _migrate(conn) -> None:
    """Widen VARCHAR(500) → TEXT for image URL columns so base64/long URLs don't crash."""
    columns = [
        ("chickens",      "cover_image"),
        ("chicken_images", "url"),
    ]
    for table, col in columns:
        row = conn.execute(text(
            "SELECT data_type FROM information_schema.columns "
            "WHERE table_name = :t AND column_name = :c"
        ), {"t": table, "c": col}).fetchone()
        if row and row[0].lower() == "character varying":
            conn.execute(text(f'ALTER TABLE {table} ALTER COLUMN {col} TYPE TEXT'))
            print(f"Migrated {table}.{col}: VARCHAR → TEXT")


def main() -> None:
    Base.metadata.create_all(bind=engine)
    with engine.begin() as conn:
        _migrate(conn)
    print("Tables ready.")


if __name__ == "__main__":
    main()
