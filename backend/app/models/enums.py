import enum


class UserRole(str, enum.Enum):
    admin = "admin"
    staff = "staff"


class ChickenStatus(str, enum.Enum):
    available = "available"
    reserved = "reserved"
    sold = "sold"


class EggAvailability(str, enum.Enum):
    available = "available"
    limited = "limited"
    out_of_stock = "out_of_stock"


class BookingStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    completed = "completed"
    cancelled = "cancelled"


class OrderStatus(str, enum.Enum):
    pending = "pending"
    billed = "billed"
    completed = "completed"
    cancelled = "cancelled"


class PaymentStatus(str, enum.Enum):
    unpaid = "unpaid"
    partial = "partial"
    paid = "paid"


class PaymentMethod(str, enum.Enum):
    cash = "cash"
    upi = "upi"
    card = "card"
    bank_transfer = "bank_transfer"
    other = "other"
