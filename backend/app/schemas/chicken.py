from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.enums import ChickenStatus


class ChickenImageOut(BaseModel):
    id: int
    url: str
    alt_text: str = ""
    sort_order: int = 0

    class Config:
        from_attributes = True


class ChickenBase(BaseModel):
    breed_name: str = Field(..., max_length=150)
    description: str = ""
    min_weight_kg: float = 0
    max_weight_kg: float = 0
    price_per_kg: float = Field(..., gt=0)
    age_months: int = 0
    status: ChickenStatus = ChickenStatus.available
    is_featured: bool = False
    cover_image: str = ""


class ChickenCreate(ChickenBase):
    pass


class ChickenUpdate(BaseModel):
    breed_name: Optional[str] = None
    description: Optional[str] = None
    min_weight_kg: Optional[float] = None
    max_weight_kg: Optional[float] = None
    price_per_kg: Optional[float] = Field(default=None, gt=0)
    age_months: Optional[int] = None
    status: Optional[ChickenStatus] = None
    is_featured: Optional[bool] = None
    cover_image: Optional[str] = None


class ChickenOut(ChickenBase):
    id: int
    images: List[ChickenImageOut] = []

    class Config:
        from_attributes = True
