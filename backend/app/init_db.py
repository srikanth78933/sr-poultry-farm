"""Create all tables. For real migrations use Alembic; this keeps boot simple."""
from app.core.database import Base, engine
import app.models  # noqa: F401  (register models)


def main() -> None:
    Base.metadata.create_all(bind=engine)
    print("Tables created.")


if __name__ == "__main__":
    main()
