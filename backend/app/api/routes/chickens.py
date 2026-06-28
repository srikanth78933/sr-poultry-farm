from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models import Chicken, ChickenImage
from app.models.enums import ChickenStatus
from app.schemas.chicken import ChickenCreate, ChickenUpdate, ChickenOut

router = APIRouter(prefix="/chickens", tags=["chickens"])


@router.get("", response_model=List[ChickenOut])
def list_chickens(
    status: Optional[ChickenStatus] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db),
):
    stmt = select(Chicken).order_by(Chicken.is_featured.desc(), Chicken.created_at.desc())
    if status:
        stmt = stmt.where(Chicken.status == status)
    if featured is not None:
        stmt = stmt.where(Chicken.is_featured == featured)
    return db.scalars(stmt).all()


@router.get("/{chicken_id}", response_model=ChickenOut)
def get_chicken(chicken_id: int, db: Session = Depends(get_db)):
    obj = db.get(Chicken, chicken_id)
    if not obj:
        raise HTTPException(404, "Chicken not found")
    return obj


# ---- Admin protected ----
@router.post("", response_model=ChickenOut, status_code=201, dependencies=[Depends(get_current_user)])
def create_chicken(payload: ChickenCreate, db: Session = Depends(get_db)):
    obj = Chicken(**payload.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.put("/{chicken_id}", response_model=ChickenOut, dependencies=[Depends(get_current_user)])
def update_chicken(chicken_id: int, payload: ChickenUpdate, db: Session = Depends(get_db)):
    obj = db.get(Chicken, chicken_id)
    if not obj:
        raise HTTPException(404, "Chicken not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{chicken_id}", status_code=204, dependencies=[Depends(get_current_user)])
def delete_chicken(chicken_id: int, db: Session = Depends(get_db)):
    obj = db.get(Chicken, chicken_id)
    if not obj:
        raise HTTPException(404, "Chicken not found")
    db.delete(obj)
    db.commit()


@router.post("/{chicken_id}/images", response_model=ChickenOut, dependencies=[Depends(get_current_user)])
def add_image(chicken_id: int, url: str = Query(...), alt_text: str = "", db: Session = Depends(get_db)):
    obj = db.get(Chicken, chicken_id)
    if not obj:
        raise HTTPException(404, "Chicken not found")
    img = ChickenImage(chicken_id=chicken_id, url=url, alt_text=alt_text)
    db.add(img)
    if not obj.cover_image:
        obj.cover_image = url
    db.commit()
    db.refresh(obj)
    return obj
