from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Chicken, FarmVisit, Order, Payment
from app.models.enums import ChickenStatus, BookingStatus
from app.schemas.dashboard import DashboardStats

router = APIRouter(prefix="/dashboard", tags=["dashboard"], dependencies=[Depends(get_current_user)])


@router.get("/stats", response_model=DashboardStats)
def stats(db: Session = Depends(get_db)):
    total_birds = db.scalar(select(func.count(Chicken.id))) or 0
    available = db.scalar(
        select(func.count(Chicken.id)).where(Chicken.status == ChickenStatus.available)
    ) or 0
    sold = db.scalar(
        select(func.count(Chicken.id)).where(Chicken.status == ChickenStatus.sold)
    ) or 0
    upcoming = db.scalar(
        select(func.count(FarmVisit.id)).where(
            FarmVisit.visit_date >= date.today(),
            FarmVisit.status == BookingStatus.approved,
        )
    ) or 0
    pending = db.scalar(
        select(func.count(FarmVisit.id)).where(FarmVisit.status == BookingStatus.pending)
    ) or 0
    total_orders = db.scalar(select(func.count(Order.id))) or 0
    revenue_collected = db.scalar(select(func.coalesce(func.sum(Payment.amount), 0))) or 0
    revenue_billed = db.scalar(select(func.coalesce(func.sum(Order.total_amount), 0))) or 0

    return DashboardStats(
        total_birds=total_birds,
        available_birds=available,
        sold_birds=sold,
        upcoming_bookings=upcoming,
        pending_bookings=pending,
        total_orders=total_orders,
        revenue_collected=float(revenue_collected),
        revenue_billed=float(revenue_billed),
    )
