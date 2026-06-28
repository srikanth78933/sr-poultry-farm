from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Customer

router = APIRouter(prefix="/customers", tags=["customers"], dependencies=[Depends(get_current_user)])


class CustomerIn(BaseModel):
    name: str
    mobile: str
    email: str = ""
    address: str = ""


class CustomerOut(CustomerIn):
    id: int

    class Config:
        from_attributes = True


@router.get("", response_model=List[CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return db.scalars(select(Customer).order_by(Customer.created_at.desc())).all()


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
