from datetime import datetime
from decimal import Decimal
from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.enums import OrderStatus, PaymentStatus, PaymentMethod


class PaymentCreate(BaseModel):
    amount: Decimal = Field(..., gt=0, decimal_places=2, max_digits=10)
    method: PaymentMethod = PaymentMethod.cash
    reference: str = Field("", max_length=200)


class PaymentOut(BaseModel):
    id: int
    amount: Decimal
    method: PaymentMethod
    reference: str
    created_at: datetime

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=150)
    mobile: str = Field(..., min_length=7, max_length=20)
    chicken_id: Optional[int] = None
    chicken_label: str = Field("", max_length=200)
    actual_weight_kg: Decimal = Field(..., gt=0, decimal_places=3, max_digits=6)
    price_per_kg: Decimal = Field(..., gt=0, decimal_places=2, max_digits=8)
    notes: str = Field("", max_length=1000)


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[PaymentStatus] = None
    notes: Optional[str] = Field(None, max_length=1000)


class OrderOut(BaseModel):
    id: int
    customer_name: str
    mobile: str
    chicken_id: Optional[int]
    chicken_label: str
    actual_weight_kg: Decimal
    price_per_kg: Decimal
    total_amount: Decimal
    notes: str
    status: OrderStatus
    payment_status: PaymentStatus
    created_at: datetime
    payments: List[PaymentOut] = []

    class Config:
        from_attributes = True
