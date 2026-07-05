from typing import Optional
from pydantic import BaseModel
from app.models.enums import EggAvailability


class EggBase(BaseModel):
    name: str
    telugu_name: str = ""
    description: str = ""
    availability: EggAvailability = EggAvailability.available
    cover_image: str = ""
    is_featured: bool = False


class EggCreate(EggBase):
    pass


class EggUpdate(BaseModel):
    name: Optional[str] = None
    telugu_name: Optional[str] = None
    description: Optional[str] = None
    availability: Optional[EggAvailability] = None
    cover_image: Optional[str] = None
    is_featured: Optional[bool] = None


class EggOut(EggBase):
    id: int

    class Config:
        from_attributes = True
