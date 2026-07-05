from datetime import datetime
from sqlalchemy import String, Text, Numeric, Integer, DateTime, Enum, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.enums import ChickenStatus


class Chicken(Base):
    """A country chicken (Natu Kodi) listing in the inventory."""
    __tablename__ = "chickens"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    breed_name: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    min_weight_kg: Mapped[float] = mapped_column(Numeric(5, 2), default=0)
    max_weight_kg: Mapped[float] = mapped_column(Numeric(5, 2), default=0)
    price_per_kg: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    age_months: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[ChickenStatus] = mapped_column(
        Enum(ChickenStatus), default=ChickenStatus.available, nullable=False
    )
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    cover_image: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    images: Mapped[list["ChickenImage"]] = relationship(
        back_populates="chicken", cascade="all, delete-orphan"
    )


class ChickenImage(Base):
    __tablename__ = "chicken_images"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    chicken_id: Mapped[int] = mapped_column(ForeignKey("chickens.id", ondelete="CASCADE"))
    url: Mapped[str] = mapped_column(Text, nullable=False)
    alt_text: Mapped[str] = mapped_column(String(255), default="")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    chicken: Mapped["Chicken"] = relationship(back_populates="images")
