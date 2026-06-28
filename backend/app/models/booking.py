from datetime import datetime, date, time
from sqlalchemy import String, Integer, Date, Time, DateTime, Enum, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.enums import BookingStatus


class FarmVisit(Base):
    """A booked farm visit. Double booking on the same date+slot is blocked."""
    __tablename__ = "farm_visits"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    customer_name: Mapped[str] = mapped_column(String(150), nullable=False)
    mobile: Mapped[str] = mapped_column(String(20), nullable=False)
    visit_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    time_slot: Mapped[str] = mapped_column(String(40), nullable=False)
    num_visitors: Mapped[int] = mapped_column(Integer, default=1)
    purpose: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[BookingStatus] = mapped_column(
        Enum(BookingStatus), default=BookingStatus.pending, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
