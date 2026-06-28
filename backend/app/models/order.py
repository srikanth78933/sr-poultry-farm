from datetime import datetime
from sqlalchemy import String, Integer, Numeric, DateTime, Enum, Text, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.enums import OrderStatus, PaymentStatus


class Order(Base):
    """A purchase recorded after the customer visits and a bird is weighed."""
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(150), nullable=False)
    mobile: Mapped[str] = mapped_column(String(20), nullable=False)
    chicken_id: Mapped[int | None] = mapped_column(ForeignKey("chickens.id", ondelete="SET NULL"), nullable=True)
    chicken_label: Mapped[str] = mapped_column(String(200), default="")
    actual_weight_kg: Mapped[float] = mapped_column(Numeric(6, 3), nullable=False)
    price_per_kg: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    total_amount: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    notes: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus), default=OrderStatus.billed)
    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus), default=PaymentStatus.unpaid
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    payments: Mapped[list["Payment"]] = relationship(
        back_populates="order", cascade="all, delete-orphan"
    )
