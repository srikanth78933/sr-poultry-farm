from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import FarmVisit
from app.models.enums import BookingStatus
from app.schemas.booking import (
    BookingCreate, BookingOut, BookingStatusUpdate, SlotAvailability,
)

router = APIRouter(prefix="/bookings", tags=["bookings"])

# Time slots offered for farm visits.
TIME_SLOTS = ["08:00-10:00", "10:00-12:00", "12:00-14:00", "16:00-18:00"]

# Statuses that still occupy a slot (block double booking).
ACTIVE_STATUSES = (BookingStatus.pending, BookingStatus.approved)


@router.get("/slots", response_model=SlotAvailability)
def slot_availability(visit_date: date, db: Session = Depends(get_db)):
    rows = db.scalars(
        select(FarmVisit).where(
            FarmVisit.visit_date == visit_date,
            FarmVisit.status.in_(ACTIVE_STATUSES),
        )
    ).all()
    booked = sorted({r.time_slot for r in rows})
    available = [s for s in TIME_SLOTS if s not in booked]
    return SlotAvailability(visit_date=visit_date, booked_slots=booked, available_slots=available)


@router.post("", response_model=BookingOut, status_code=201)
def create_booking(payload: BookingCreate, db: Session = Depends(get_db)):
    if payload.visit_date < date.today():
        raise HTTPException(400, "Visit date cannot be in the past")
    if payload.time_slot not in TIME_SLOTS:
        raise HTTPException(400, "Invalid time slot")
    # Prevent double booking of the same date + slot.
    clash = db.scalar(
        select(FarmVisit).where(
            FarmVisit.visit_date == payload.visit_date,
            FarmVisit.time_slot == payload.time_slot,
            FarmVisit.status.in_(ACTIVE_STATUSES),
        )
    )
    if clash:
        raise HTTPException(409, "This slot is already booked. Please choose another.")
    obj = FarmVisit(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


# ---- Admin protected ----
@router.get("", response_model=List[BookingOut], dependencies=[Depends(get_current_user)])
def list_bookings(status: Optional[BookingStatus] = None, db: Session = Depends(get_db)):
    stmt = select(FarmVisit).order_by(FarmVisit.visit_date.desc(), FarmVisit.id.desc())
    if status:
        stmt = stmt.where(FarmVisit.status == status)
    return db.scalars(stmt).all()


@router.patch("/{booking_id}", response_model=BookingOut, dependencies=[Depends(get_current_user)])
def update_status(booking_id: int, payload: BookingStatusUpdate, db: Session = Depends(get_db)):
    obj = db.get(FarmVisit, booking_id)
    if not obj:
        raise HTTPException(404, "Booking not found")
    obj.status = payload.status
    db.commit()
    db.refresh(obj)
    return obj
