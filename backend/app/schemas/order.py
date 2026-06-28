from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.enums import OrderStatus, PaymentStatus, PaymentMethod


class PaymentCreate(BaseModel):
    amount: float = Field(..., gt=0)
    method: PaymentMethod = PaymentMethod.cash
    reference: str = ""


class PaymentOut(BaseModel):
    id: int
    amount: float
    method: PaymentMethod
    reference: str
    created_at: datetime

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_name: str = Field(..., max_length=150)
    mobile: str = Field(..., max_length=20)
    chicken_id: Optional[int] = None
    chicken_label: str = ""
    actual_weight_kg: float = Field(..., gt=0)
    price_per_kg: float = Field(..., gt=0)
    notes: str = ""


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None
    notes: Optional[str] = None


class OrderOut(BaseModel):
    id: int
    customer_name: str
    mobile: str
    chicken_id: Optional[int]
    chicken_label: str
    actual_weight_kg: float
    price_per_kg: float
    total_amount: float
    notes: str
    status: OrderStatus
    payment_status: PaymentStatus
    created_at: datetime
    payments: List[PaymentOut] = []

    class Config:
        from_attributes = True
