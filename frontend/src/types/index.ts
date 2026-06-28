export type ChickenStatus = "available" | "reserved" | "sold";
export type BookingStatus = "pending" | "approved" | "rejected" | "completed" | "cancelled";
export type OrderStatus = "pending" | "billed" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "partial" | "paid";

export interface ChickenImage {
  id: number;
  url: string;
  alt_text: string;
  sort_order: number;
}

export interface Chicken {
  id: number;
  breed_name: string;
  description: string;
  min_weight_kg: number;
  max_weight_kg: number;
  price_per_kg: number;
  age_months: number;
  status: ChickenStatus;
  is_featured: boolean;
  cover_image: string;
  images: ChickenImage[];
}

export interface Booking {
  id: number;
  customer_name: string;
  mobile: string;
  visit_date: string;
  time_slot: string;
  num_visitors: number;
  purpose: string;
  status: BookingStatus;
  created_at: string;
}

export interface SlotAvailability {
  visit_date: string;
  booked_slots: string[];
  available_slots: string[];
}

export interface Payment {
  id: number;
  amount: number;
  method: string;
  reference: string;
  created_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  mobile: string;
  chicken_id: number | null;
  chicken_label: string;
  actual_weight_kg: number;
  price_per_kg: number;
  total_amount: number;
  notes: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  created_at: string;
  payments: Payment[];
}

export interface DashboardStats {
  total_birds: number;
  available_birds: number;
  sold_birds: number;
  upcoming_bookings: number;
  pending_bookings: number;
  total_orders: number;
  revenue_collected: number;
  revenue_billed: number;
}

export interface Customer {
  id: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
}
