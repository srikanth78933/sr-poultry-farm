"""WhatsApp admin alerts + booking review magic links.

Uses CallMeBot (https://www.callmebot.com/blog/free-api-whatsapp-messages/) to push a
plain-text WhatsApp message to the farm admin's own phone — no Meta Business API needed.
"""
import logging
from datetime import datetime, timedelta, timezone
from urllib.parse import quote

import httpx
from jose import jwt, JWTError

from app.core.config import settings

logger = logging.getLogger(__name__)

REVIEW_TOKEN_SCOPE = "booking_review"
REVIEW_TOKEN_DAYS = 30


def create_review_token(booking_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=REVIEW_TOKEN_DAYS)
    payload = {"scope": REVIEW_TOKEN_SCOPE, "bid": booking_id, "exp": expire}
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def verify_review_token(booking_id: int, token: str) -> bool:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    except JWTError:
        return False
    return payload.get("scope") == REVIEW_TOKEN_SCOPE and payload.get("bid") == booking_id


def _send_whatsapp_text(text: str) -> None:
    if not settings.ADMIN_WHATSAPP_NUMBER or not settings.CALLMEBOT_API_KEY:
        logger.info("WhatsApp alert skipped — ADMIN_WHATSAPP_NUMBER/CALLMEBOT_API_KEY not configured")
        return
    try:
        httpx.get(
            "https://api.callmebot.com/whatsapp.php",
            params={
                "phone": settings.ADMIN_WHATSAPP_NUMBER,
                "text": text,
                "apikey": settings.CALLMEBOT_API_KEY,
            },
            timeout=10,
        )
    except httpx.HTTPError:
        logger.warning("Failed to send WhatsApp alert via CallMeBot", exc_info=True)


def send_admin_booking_alert(booking) -> None:
    """Best-effort WhatsApp push to the admin with a one-tap approve/decline link."""
    token = create_review_token(booking.id)
    link = f"{settings.APP_BASE_URL}/review/{booking.id}?token={quote(token)}"
    text = (
        "New Farm Visit Booking - Natu Kodi Farms\n"
        f"Name: {booking.customer_name}\n"
        f"Mobile: {booking.mobile}\n"
        f"Date: {booking.visit_date}\n"
        f"Slot: {booking.time_slot}\n"
        f"Visitors: {booking.num_visitors}\n\n"
        f"Approve or decline: {link}"
    )
    _send_whatsapp_text(text)


def build_customer_whatsapp_link(mobile: str, message: str) -> str:
    digits = "".join(ch for ch in mobile if ch.isdigit())
    return f"https://wa.me/{digits}?text={quote(message)}"


def approval_message(customer_name: str, visit_date, time_slot: str) -> str:
    return (
        f"Hi {customer_name}, thank you! 🐔\n\n"
        "Your farm visit with *Natu Kodi Farms* is *confirmed* ✅\n"
        f"📅 Date: {visit_date}\n"
        f"⏰ Slot: {time_slot}\n\n"
        "We can't wait to welcome you — bring the family, wear comfortable shoes, "
        "and get ready to meet the flock!\n\n"
        "See you soon,\nNatu Kodi Farms 🌿"
    )


def decline_message(customer_name: str) -> str:
    return (
        f"Hi {customer_name}, thank you for your interest in *Natu Kodi Farms* 🐔\n\n"
        "Unfortunately we're unable to confirm this visit slot. Please book another "
        "date/time that works for you — we'd love to have you visit the farm.\n\n"
        "Natu Kodi Farms 🌿"
    )
