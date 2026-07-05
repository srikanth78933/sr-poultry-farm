from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.egg import Egg
from app.models.enums import EggAvailability
from app.schemas.egg import EggCreate, EggUpdate, EggOut

router = APIRouter(prefix="/eggs", tags=["eggs"])


@router.get("", response_model=List[EggOut])
def list_eggs(
    availability: Optional[EggAvailability] = None,
    db: Session = Depends(get_db),
):
    stmt = select(Egg).order_by(Egg.is_featured.desc(), Egg.created_at.desc())
    if availability:
        stmt = stmt.where(Egg.availability == availability)
    return db.scalars(stmt).all()


@router.get("/{egg_id}", response_model=EggOut)
def get_egg(egg_id: int, db: Session = Depends(get_db)):
    obj = db.get(Egg, egg_id)
    if not obj:
        raise HTTPException(404, "Egg not found")
    return obj


@router.post("", response_model=EggOut, status_code=201, dependencies=[Depends(get_current_user)])
def create_egg(payload: EggCreate, db: Session = Depends(get_db)):
    obj = Egg(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/{egg_id}", response_model=EggOut, dependencies=[Depends(get_current_user)])
def update_egg(egg_id: int, payload: EggUpdate, db: Session = Depends(get_db)):
    obj = db.get(Egg, egg_id)
    if not obj:
        raise HTTPException(404, "Egg not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{egg_id}", status_code=204, dependencies=[Depends(get_current_user)])
def delete_egg(egg_id: int, db: Session = Depends(get_db)):
    obj = db.get(Egg, egg_id)
    if not obj:
        raise HTTPException(404, "Egg not found")
    db.delete(obj)
    db.commit()
