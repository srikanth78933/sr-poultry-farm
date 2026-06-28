from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.enums import BookingStatus


class BookingCreate(BaseModel):
    customer_name: str = Field(..., max_length=150)
    mobile: str = Field(..., min_length=7, max_length=20)
    visit_date: date
    time_slot: str = Field(..., max_length=40)
    num_visitors: int = Field(1, ge=1, le=50)
    purpose: str = ""


class BookingStatusUpdate(BaseModel):
    status: BookingStatus


class BookingOut(BaseModel):
    id: int
    customer_name: str
    mobile: str
    visit_date: date
    time_slot: str
    num_visitors: int
    purpose: str
    status: BookingStatus
    created_at: datetime

    class Config:
        from_attributes = True


class SlotAvailability(BaseModel):
    visit_date: date
    booked_slots: list[str]
    available_slots: list[str]
