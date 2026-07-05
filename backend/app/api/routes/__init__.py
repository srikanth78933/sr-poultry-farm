from fastapi import APIRouter

from app.api.routes import auth, chickens, eggs, bookings, orders, customers, dashboard, uploads

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(chickens.router)
api_router.include_router(eggs.router)
api_router.include_router(bookings.router)
api_router.include_router(orders.router)
api_router.include_router(customers.router)
api_router.include_router(dashboard.router)
api_router.include_router(uploads.router)
