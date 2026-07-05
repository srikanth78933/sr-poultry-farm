# Natu Kodi Farms — Change Log

## Brand & Identity
- Renamed brand from "SR Poultry Farm" to "Natu Kodi Farms" across entire codebase
- Removed all "SR" prefixes from page titles, hero text, franchise section, WhatsApp messages, metadata, and alt texts
- Replaced "East Godavari" with "Annamayya District" everywhere (about page, products page, metadata, footer)
- Fixed address to "S. Nadimpalli Village, Somala Mandalam, Annamayya District, AP 517257"
- Updated contact email to natukodifarms.in@gmail.com, Instagram to @natu_kodi.farms, website to natukodifarms.com
- Added real Google Maps link for farm location

## Logo
- Added `chik.png` as official brand logo — rooster on wooden plank with grass and "NATU KODI FARMS" text
- Removed white background from logo using PIL (transparent PNG)
- Created `LogoMark` component using plain `<img>` (no Next.js compression) for crisp display
- Removed logo from footer; footer shows plain text brand name instead
- Logo shown in Navbar, AdminShell sidebar, and Admin Login page

## Multilingual Support
- Added `LanguageContext` with full translations for English, Telugu, Kannada, Tamil
- Wired translation context to Navbar, Hero, Features, Products, Story, Visit CTA, and Franchise sections
- Language switcher added to Navbar (desktop and mobile drawer)
- "SR" prefix removed from all 4 language translation strings

## Public Showcase Pages
- Removed all prices from public-facing product cards (showcase site — no pricing displayed)
- Replaced price display with "Book a Visit" button on all bird cards
- Products page has two tabs: Birds (from API) and Eggs (from API)

## Birds Inventory
- Expanded from 4 to 8 chicken breeds: Aseel, Kadaknath, Sonali Cross, Ghyas Desi, Giriraja, Vanraja, Naked Neck Desi, Chittagong Heritage
- Smart reseed detects old breed names and replaces automatically on backend startup

## Eggs Feature
- Added `Egg` database model with name, Telugu name, description, availability, cover image, featured flag
- Added `/eggs` REST API route with full CRUD (public read, admin write)
- Seeded 3 egg types on startup: Desi Country Eggs, Kadaknath Eggs, Aseel Heritage Eggs
- Generated egg cover photos (eggs-desi.jpg, eggs-kadaknath.jpg, eggs-aseel.jpg) using PIL
- Eggs tab on Products page fetches live from `/eggs` API
- Added `EggAvailability` enum: available / limited / out_of_stock
- Added Admin Eggs page at `/admin/eggs` with add, edit, delete, image upload

## Admin Panel
- Added "Eggs" link to AdminShell sidebar navigation
- Renamed sidebar "Inventory" to "Birds" for clarity
- Mobile dashboard: header stacks vertically, stat grid is 3-column on sm screens
- Mobile dashboard: stat cards use compact padding and text size
- "+ New Order" button is full width on mobile, links to /admin/orders
- Admin inventory: blocks pasting base64 data URLs in cover_image field

## Backend
- `cover_image` and `chicken_image.url` columns changed from VARCHAR(500) to TEXT
- `_migrate()` in `init_db.py` auto-alters old VARCHAR columns to TEXT on startup
- Added `Egg` model, schemas (`EggCreate`, `EggUpdate`, `EggOut`), and `/eggs` API router
- `EggAvailability` enum added to `enums.py`
- Eggs seeded idempotently via `seed_eggs()` in `seed.py`

## Floating Contact
- Added `FloatingContact` component with quick-access WhatsApp, phone, and email buttons

## Bug Fixes
- Fixed `ClockAlert` icon not found in lucide-react — replaced with `Hourglass`
- Fixed logo appearing blurry due to Next.js Image compression — switched to plain `<img>`
- Fixed translations not applying to page text — all major sections now use `t.xxx` context keys
- Fixed "East Godavari" in about page heading and metadata
- Fixed "SR Natu Kodi Farms" in franchise WhatsApp pre-fill message URL
- Fixed `value too long for type character varying(500)` by migrating to TEXT columns
