from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, ListFlowable, ListItem,
)

GREEN = colors.HexColor("#166534")
GREEN_DARK = colors.HexColor("#14532d")
LEAF = colors.HexColor("#4d7c0f")
GOLD = colors.HexColor("#f59e0b")
EARTH = colors.HexColor("#7c2d12")
CREAM = colors.HexColor("#fefce8")
SAND = colors.HexColor("#fef9c3")
GREY = colors.HexColor("#57534e")

styles = getSampleStyleSheet()
def S(name, **kw):
    styles.add(ParagraphStyle(name, **kw))

S("Cover", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=30, textColor=GREEN_DARK, leading=34, alignment=TA_CENTER)
S("CoverSub", fontName="Helvetica", fontSize=14, textColor=EARTH, alignment=TA_CENTER, leading=20)
S("CoverTag", fontName="Helvetica-Bold", fontSize=11, textColor=LEAF, alignment=TA_CENTER, spaceBefore=6)
S("H1", fontName="Helvetica-Bold", fontSize=17, textColor=GREEN_DARK, spaceBefore=16, spaceAfter=6, leading=20)
S("H2", fontName="Helvetica-Bold", fontSize=12.5, textColor=LEAF, spaceBefore=10, spaceAfter=4, leading=15)
S("Body", fontName="Helvetica", fontSize=10, textColor=GREY, leading=15, spaceAfter=5)
S("Bull", fontName="Helvetica", fontSize=10, textColor=GREY, leading=14, leftIndent=4)
S("Mono", fontName="Courier", fontSize=8.6, textColor=colors.HexColor("#1c1917"), leading=12.5, backColor=colors.HexColor("#f5f5f4"), borderPadding=6, leftIndent=4, spaceBefore=3, spaceAfter=8)
S("Eyebrow", fontName="Helvetica-Bold", fontSize=8.5, textColor=GOLD, spaceAfter=2)
S("Footer", fontName="Helvetica", fontSize=7.5, textColor=colors.HexColor("#a8a29e"), alignment=TA_CENTER)

def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    # top band
    canvas.setFillColor(GREEN_DARK)
    canvas.rect(0, h - 14*mm, w, 14*mm, fill=1, stroke=0)
    canvas.setFillColor(SAND)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(18*mm, h - 9.4*mm, "SR POULTRY FARM")
    canvas.setFillColor(GOLD)
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(w - 18*mm, h - 9.4*mm, "Setup & Documentation Guide")
    # footer
    canvas.setStrokeColor(colors.HexColor("#e7e5e4"))
    canvas.line(18*mm, 14*mm, w - 18*mm, 14*mm)
    canvas.setFillColor(colors.HexColor("#a8a29e"))
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(18*mm, 9*mm, "Natural Natu Kodi - Raised Naturally")
    canvas.drawRightString(w - 18*mm, 9*mm, "Page %d" % doc.page)
    canvas.restoreState()

def cover_bg(canvas, doc):
    w, h = A4
    canvas.saveState()
    canvas.setFillColor(CREAM); canvas.rect(0,0,w,h,fill=1,stroke=0)
    canvas.setFillColor(GREEN_DARK); canvas.rect(0, h-70*mm, w, 70*mm, fill=1, stroke=0)
    canvas.setFillColor(GREEN); canvas.rect(0, h-72*mm, w, 2*mm, fill=1, stroke=0)
    # sun
    canvas.setFillColor(GOLD); canvas.circle(w-35*mm, h-30*mm, 14*mm, fill=1, stroke=0)
    # hills
    canvas.setFillColor(LEAF)
    p = canvas.beginPath(); p.moveTo(0, 60*mm)
    p.curveTo(60*mm,75*mm, 140*mm,45*mm, w,68*mm); p.lineTo(w,0); p.lineTo(0,0); p.close()
    canvas.drawPath(p, fill=1, stroke=0)
    canvas.setFillColor(GREEN)
    p2 = canvas.beginPath(); p2.moveTo(0, 38*mm)
    p2.curveTo(70*mm,52*mm, 150*mm,28*mm, w,44*mm); p2.lineTo(w,0); p2.lineTo(0,0); p2.close()
    canvas.drawPath(p2, fill=1, stroke=0)
    # title text on band
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 30)
    canvas.drawCentredString(w/2, h-38*mm, "SR Poultry Farm")
    canvas.setFillColor(SAND)
    canvas.setFont("Helvetica", 13)
    canvas.drawCentredString(w/2, h-48*mm, "Natural Natu Kodi - Raised Naturally")
    canvas.setFillColor(GOLD)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawCentredString(w/2, h-56*mm, "Healthy  -  Traditional  -  Farm Fresh")
    canvas.restoreState()

def code(txt):
    return Paragraph(txt.replace(" ", "&nbsp;").replace("\n", "<br/>"), styles["Mono"])

def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, styles["Bull"]), bulletColor=GREEN, value="square") for t in items],
        bulletType="bullet", start="square", leftIndent=14, spaceBefore=2, spaceAfter=6,
    )

doc = BaseDocTemplate(
    "SR_Poultry_Farm_Setup_Guide.pdf", pagesize=A4,
    leftMargin=18*mm, rightMargin=18*mm, topMargin=20*mm, bottomMargin=18*mm,
    title="SR Poultry Farm - Setup Guide", author="SR Poultry Farm",
)
W, H = A4
frame = Frame(18*mm, 16*mm, W-36*mm, H-36*mm, id="main")
cover_frame = Frame(18*mm, 70*mm, W-36*mm, H-150*mm, id="cover")
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[cover_frame], onPage=cover_bg),
    PageTemplate(id="main", frames=[frame], onPage=header_footer),
])

st = []
# ---- COVER ----
st.append(Spacer(1, 8*mm))
st.append(Paragraph("PRODUCTION-READY FULL-STACK WEB APPLICATION", styles["CoverTag"]))
st.append(Spacer(1, 4*mm))
st.append(Paragraph("Setup &amp; Documentation Guide", styles["Cover"]))
st.append(Spacer(1, 6*mm))
st.append(Paragraph(
    "Next.js + TypeScript + Tailwind  -  FastAPI + SQLAlchemy  -  PostgreSQL  -  JWT  -  Docker Compose + Nginx",
    styles["CoverSub"]))
st.append(Spacer(1, 10*mm))
tbl = Table([
    ["Customer Website", "Premium landing, available birds, about, booking, how-to-buy"],
    ["Admin Dashboard", "Inventory, bookings, orders & billing, customers, revenue"],
    ["Backend", "FastAPI REST API, JWT auth, SQLAlchemy ORM, S3-ready storage"],
    ["Deployment", "docker compose up - AWS (ECS/RDS/S3/CloudFront) ready"],
], colWidths=[40*mm, 110*mm])
tbl.setStyle(TableStyle([
    ("FONT",(0,0),(0,-1),"Helvetica-Bold",9), ("FONT",(1,0),(1,-1),"Helvetica",9),
    ("TEXTCOLOR",(0,0),(0,-1),GREEN_DARK), ("TEXTCOLOR",(1,0),(1,-1),GREY),
    ("BACKGROUND",(0,0),(-1,-1),colors.white),
    ("BOX",(0,0),(-1,-1),0.5,colors.HexColor("#d6d3d1")),
    ("INNERGRID",(0,0),(-1,-1),0.5,colors.HexColor("#e7e5e4")),
    ("VALIGN",(0,0),(-1,-1),"MIDDLE"), ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),
    ("LEFTPADDING",(0,0),(-1,-1),9),
]))
st.append(tbl)
st.append(PageBreak())

# ---- 1. OVERVIEW ----
st.append(Paragraph("1. Overview", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(Paragraph(
    "This application powers SR Poultry Farm, a premium natural country-chicken (Natu Kodi) brand. "
    "Customers browse available birds, read about the farm, and book a farm visit. Because birds are sold "
    "by live weight, purchases are recorded by the farm after the customer visits, selects a bird, and it is "
    "weighed - producing a final bill and payment record. An admin dashboard manages everything.", styles["Body"]))
st.append(Paragraph("Technology stack (all open-source)", styles["H2"]))
st.append(bullets([
    "<b>Frontend:</b> Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Framer Motion - mobile-first, SEO-friendly, animated.",
    "<b>Backend:</b> FastAPI (Python), SQLAlchemy 2.0 ORM, Pydantic validation.",
    "<b>Database:</b> PostgreSQL 16.",
    "<b>Auth:</b> JWT bearer tokens + bcrypt password hashing.",
    "<b>Storage:</b> Local disk now, pluggable AWS S3 backend for later.",
    "<b>Infra:</b> Docker Compose (postgres, backend, frontend, nginx reverse proxy).",
]))

# ---- 2. PREREQUISITES ----
st.append(Paragraph("2. Prerequisites", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(bullets([
    "<b>Docker Desktop</b> with Docker Compose v2 (the only requirement for the quick start).",
    "For local (non-Docker) dev: Python 3.12+, Node.js 20+, and a local PostgreSQL instance.",
    "~2 GB free disk for images and build artifacts.",
]))

# ---- 3. QUICK START ----
st.append(Paragraph("3. Quick Start with Docker (recommended)", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(Paragraph("Step 1 - Copy environment files", styles["H2"]))
st.append(code("cp backend/.env.example backend/.env\ncp frontend/.env.example frontend/.env\ncp .env.example .env"))
st.append(Paragraph("Step 2 - Edit <b>backend/.env</b> (important)", styles["H2"]))
st.append(bullets([
    "Set a strong <b>SECRET_KEY</b> &mdash; generate with <font face='Courier'>openssl rand -hex 32</font>.",
    "Set <b>POSTGRES_PASSWORD</b> (use the same value in the root <font face='Courier'>.env</font>).",
    "Set <b>FIRST_ADMIN_EMAIL</b> / <b>FIRST_ADMIN_PASSWORD</b> for the seeded admin account.",
]))
st.append(Paragraph("Step 3 - Launch everything", styles["H2"]))
st.append(code("docker compose up --build"))
st.append(Paragraph("On first boot the backend waits for PostgreSQL, creates all tables, and seeds a default admin plus sample Natu Kodi listings.", styles["Body"]))
st.append(Paragraph("Step 4 - Open the app", styles["H2"]))
t2 = Table([
    ["http://localhost", "Customer website (served via nginx)"],
    ["http://localhost/admin/login", "Admin dashboard login"],
    ["http://localhost/docs", "FastAPI interactive API documentation"],
], colWidths=[58*mm, 92*mm])
t2.setStyle(TableStyle([
    ("FONT",(0,0),(0,-1),"Courier-Bold",9),("FONT",(1,0),(1,-1),"Helvetica",9.5),
    ("TEXTCOLOR",(0,0),(0,-1),GREEN),("TEXTCOLOR",(1,0),(1,-1),GREY),
    ("ROWBACKGROUNDS",(0,0),(-1,-1),[colors.white, CREAM]),
    ("BOX",(0,0),(-1,-1),0.5,colors.HexColor("#d6d3d1")),
    ("INNERGRID",(0,0),(-1,-1),0.4,colors.HexColor("#e7e5e4")),
    ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),("LEFTPADDING",(0,0),(-1,-1),8),
]))
st.append(t2)
st.append(Spacer(1,4))
st.append(Paragraph("Default admin (change in backend/.env): <b>admin@srpoultryfarm.com</b> / <b>Admin@12345</b>", styles["Body"]))
st.append(Paragraph("Tip: with GNU Make installed, run <font face='Courier'>make setup</font> then <font face='Courier'>make up</font>.", styles["Body"]))

# ---- 4. LOCAL DEV ----
st.append(Paragraph("4. Local Development (without Docker)", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(Paragraph("Backend", styles["H2"]))
st.append(code("cd backend\npython -m venv .venv && source .venv/bin/activate\npip install -r requirements.txt\ncp .env.example .env        # set POSTGRES_HOST=localhost\npython -m app.init_db\npython -m app.seed\nuvicorn app.main:app --reload --port 8000"))
st.append(Paragraph("Frontend", styles["H2"]))
st.append(code("cd frontend\nnpm install\ncp .env.example .env        # NEXT_PUBLIC_API_URL=http://localhost:8000\nnpm run dev                 # http://localhost:3000"))

# ---- 5. DATABASE ----
st.append(Paragraph("5. Database Design", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
db = Table([
    ["Table", "Purpose"],
    ["users", "Admin / staff accounts (hashed passwords, roles)"],
    ["chickens", "Natu Kodi inventory (breed, weight range, price/kg, status)"],
    ["chicken_images", "Multiple images per bird"],
    ["farm_visits", "Visit bookings (date, slot, visitors, purpose) + status"],
    ["customers", "Buyer records"],
    ["orders", "Sales: actual weight x price/kg, total, status, payment status"],
    ["payments", "Payment records linked to orders"],
], colWidths=[40*mm, 110*mm])
db.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),GREEN),("TEXTCOLOR",(0,0),(-1,0),colors.white),
    ("FONT",(0,0),(-1,0),"Helvetica-Bold",9.5),
    ("FONT",(0,1),(0,-1),"Courier-Bold",9),("FONT",(1,1),(1,-1),"Helvetica",9.5),
    ("TEXTCOLOR",(0,1),(0,-1),EARTH),("TEXTCOLOR",(1,1),(1,-1),GREY),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, CREAM]),
    ("BOX",(0,0),(-1,-1),0.5,colors.HexColor("#d6d3d1")),("INNERGRID",(0,0),(-1,-1),0.4,colors.HexColor("#e7e5e4")),
    ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),("LEFTPADDING",(0,0),(-1,-1),8),
]))
st.append(db)

# ---- 6. SECURITY ----
st.append(Paragraph("6. Security", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(bullets([
    "JWT bearer authentication (python-jose) with configurable expiry and algorithm.",
    "bcrypt password hashing via passlib - plaintext passwords are never stored.",
    "Pydantic schema validation on every request body and query parameter.",
    "Admin-only endpoints protected by a reusable auth dependency.",
    "All secrets supplied through environment variables - nothing hard-coded.",
    "CORS restricted to explicitly configured origins.",
]))

# ---- 7. STORAGE + AWS ----
st.append(Paragraph("7. Image Storage &amp; AWS Migration", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(Paragraph(
    "Storage is abstracted behind a single interface (app/storage). Local disk is the default and is served "
    "at /media. Switching to AWS S3 requires no code changes - only environment variables:", styles["Body"]))
st.append(code('STORAGE_BACKEND=s3\nAWS_S3_BUCKET=your-bucket\nAWS_S3_REGION=ap-south-1\nAWS_ACCESS_KEY_ID=...\nAWS_SECRET_ACCESS_KEY=...\nAWS_S3_PUBLIC_BASE_URL=https://cdn.yourdomain.com   # optional CloudFront'))
st.append(Paragraph("Future production architecture on AWS", styles["H2"]))
st.append(bullets([
    "Frontend &amp; backend container images on <b>ECS Fargate</b> or <b>EKS</b>.",
    "Managed database on <b>RDS for PostgreSQL</b> (point POSTGRES_HOST at the RDS endpoint).",
    "Images on <b>S3</b> fronted by <b>CloudFront</b> CDN.",
    "TLS termination and routing via <b>Application Load Balancer</b> + ACM, DNS on <b>Route 53</b>.",
]))

# ---- 8. API ----
st.append(Paragraph("8. Key API Endpoints", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
api_t = Table([
    ["Method", "Path", "Auth", "Description"],
    ["POST","/api/auth/login","-","Admin login (returns JWT)"],
    ["GET","/api/chickens","-","List available birds"],
    ["POST/PUT/DELETE","/api/chickens","Yes","Manage inventory"],
    ["GET","/api/bookings/slots","-","Slot availability for a date"],
    ["POST","/api/bookings","-","Create a visit booking"],
    ["GET/PATCH","/api/bookings","Yes","Approve / reject / list"],
    ["GET/POST","/api/orders","Yes","Orders & billing"],
    ["POST","/api/orders/{id}/payments","Yes","Record a payment"],
    ["GET","/api/dashboard/stats","Yes","Dashboard metrics"],
    ["POST","/api/uploads/image","Yes","Upload an image"],
], colWidths=[30*mm, 56*mm, 14*mm, 50*mm])
api_t.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),GREEN_DARK),("TEXTCOLOR",(0,0),(-1,0),colors.white),
    ("FONT",(0,0),(-1,0),"Helvetica-Bold",8.5),
    ("FONT",(0,1),(1,-1),"Courier",8),("FONT",(2,1),(3,-1),"Helvetica",8.5),
    ("TEXTCOLOR",(1,1),(1,-1),GREEN),("TEXTCOLOR",(3,1),(3,-1),GREY),
    ("ALIGN",(2,0),(2,-1),"CENTER"),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, CREAM]),
    ("BOX",(0,0),(-1,-1),0.5,colors.HexColor("#d6d3d1")),("INNERGRID",(0,0),(-1,-1),0.4,colors.HexColor("#e7e5e4")),
    ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),("LEFTPADDING",(0,0),(-1,-1),6),
]))
st.append(api_t)
st.append(Spacer(1,4))
st.append(Paragraph("Full interactive documentation is available at <font face='Courier'>/docs</font>.", styles["Body"]))

# ---- 9. PROJECT STRUCTURE ----
st.append(Paragraph("9. Project Structure", styles["H1"]))
st.append(HRFlowable(width="100%", thickness=1.4, color=GOLD, spaceAfter=6))
st.append(code(
"sr-poultry-farm/\n"
"  docker-compose.yml      postgres + backend + frontend + nginx\n"
"  Makefile  .env.example\n"
"  nginx/nginx.conf        reverse proxy (/, /api, /media)\n"
"  backend/                FastAPI + SQLAlchemy\n"
"    app/core/             config, database, security\n"
"    app/models/           7 tables (see section 5)\n"
"    app/schemas/          Pydantic models\n"
"    app/api/routes/       auth, chickens, bookings, orders,\n"
"                          customers, dashboard, uploads\n"
"    app/storage/          local + S3 abstraction\n"
"    main.py init_db.py seed.py  Dockerfile  requirements.txt\n"
"  frontend/               Next.js (App Router) + TS + Tailwind\n"
"    src/app/(site)/       public pages\n"
"    src/app/admin/        admin login + dashboard\n"
"    src/components/  src/lib/  src/types/\n"
"    public/images/        sample farm + chicken SVGs\n"
"    Dockerfile  package.json  tailwind.config.ts"))
st.append(Spacer(1, 4))
st.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#d6d3d1"), spaceBefore=6, spaceAfter=6))
st.append(Paragraph("(c) SR Poultry Farm  -  Raised Naturally  -  Healthy  -  Traditional  -  Farm Fresh", styles["Footer"]))

doc.build(st)
print("PDF built")
