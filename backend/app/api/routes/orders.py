from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Order, Payment, Chicken
from app.models.enums import PaymentStatus
from app.schemas.order import (
    OrderCreate, OrderUpdate, OrderOut, PaymentCreate, PaymentOut,
)

router = APIRouter(prefix="/orders", tags=["orders"], dependencies=[Depends(get_current_user)])


def _recompute_payment_status(order: Order) -> None:
    paid = sum(float(p.amount) for p in order.payments)
    total = float(order.total_amount)
    if paid <= 0:
        order.payment_status = PaymentStatus.unpaid
    elif paid < total:
        order.payment_status = PaymentStatus.partial
    else:
        order.payment_status = PaymentStatus.paid


@router.get("", response_model=List[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return db.scalars(select(Order).order_by(Order.created_at.desc())).all()


@router.post("", response_model=OrderOut, status_code=201)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    data = payload.model_dump()
    total = round(payload.actual_weight_kg * payload.price_per_kg, 2)
    label = payload.chicken_label
    if payload.chicken_id and not label:
        ch = db.get(Chicken, payload.chicken_id)
        if ch:
            label = ch.breed_name
    obj = Order(**{**data, "chicken_label": label, "total_amount": total})
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    obj = db.get(Order, order_id)
    if not obj:
        raise HTTPException(404, "Order not found")
    return obj


@router.patch("/{order_id}", response_model=OrderOut)
def update_order(order_id: int, payload: OrderUpdate, db: Session = Depends(get_db)):
    obj = db.get(Order, order_id)
    if not obj:
        raise HTTPException(404, "Order not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@router.post("/{order_id}/payments", response_model=OrderOut, status_code=201)
def add_payment(order_id: int, payload: PaymentCreate, db: Session = Depends(get_db)):
    obj = db.get(Order, order_id)
    if not obj:
        raise HTTPException(404, "Order not found")
    db.add(Payment(order_id=order_id, **payload.model_dump()))
    db.flush()
    db.refresh(obj)
    _recompute_payment_status(obj)
    db.commit()
    db.refresh(obj)
    return obj
