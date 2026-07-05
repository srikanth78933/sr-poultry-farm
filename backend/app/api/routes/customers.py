from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Customer

router = APIRouter(prefix="/customers", tags=["customers"], dependencies=[Depends(get_current_user)])


class CustomerIn(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    mobile: str = Field(..., min_length=7, max_length=20)
    email: str = Field("", max_length=254)
    address: str = Field("", max_length=500)


class CustomerOut(CustomerIn):
    id: int

    class Config:
        from_attributes = True


@router.get("", response_model=List[CustomerOut])
def list_customers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
):
    return db.scalars(select(Customer).order_by(Customer.created_at.desc()).offset(skip).limit(limit)).all()


@router.post("", response_model=CustomerOut, status_code=201)
def create_customer(payload: CustomerIn, db: Session = Depends(get_db)):
    obj = Customer(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{customer_id}", status_code=204)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    obj = db.get(Customer, customer_id)
    if not obj:
        raise HTTPException(404, "Customer not found")
    db.delete(obj)
    db.commit()
