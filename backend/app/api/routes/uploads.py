from fastapi import APIRouter, Depends, UploadFile, File, HTTPException

from app.api.deps import get_current_user
from app.storage import get_storage

router = APIRouter(prefix="/uploads", tags=["uploads"], dependencies=[Depends(get_current_user)])

ALLOWED = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_BYTES = 8 * 1024 * 1024  # 8 MB


@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED:
        raise HTTPException(400, "Unsupported image type")
    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(400, "Image too large (max 8 MB)")
    url = get_storage().save(data, file.filename or "upload.jpg", file.content_type)
    return {"url": url}
