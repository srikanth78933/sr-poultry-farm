from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_birds: int
    available_birds: int
    sold_birds: int
    upcoming_bookings: int
    pending_bookings: int
    total_orders: int
    revenue_collected: float
    revenue_billed: float
