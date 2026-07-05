from datetime import datetime
from sqlalchemy import String, Text, DateTime, Enum, Boolean, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.enums import EggAvailability


class Egg(Base):
    __tablename__ = "eggs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    telugu_name: Mapped[str] = mapped_column(String(150), default="")
    description: Mapped[str] = mapped_column(Text, default="")
    availability: Mapped[EggAvailability] = mapped_column(
        Enum(EggAvailability), default=EggAvailability.available, nullable=False
    )
    cover_image: Mapped[str] = mapped_column(Text, default="")
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
