# Generates premium flat-illustration SVGs (chickens, farm hero, logo) for SR Poultry Farm.

CHICKEN_PALETTES = [
    # body, body2(belly), wing, comb/wattle, tail, name
    ("#b45309", "#d97706", "#92400e", "#dc2626", "#7c2d12", "chicken-1"),  # rich brown rooster-hen
    ("#fcd34d", "#fde68a", "#f59e0b", "#ef4444", "#b45309", "chicken-2"),  # golden hen
    ("#1f2937", "#374151", "#111827", "#dc2626", "#0f172a", "chicken-3"),  # dark country rooster
    ("#e7e5e4", "#f5f5f4", "#d6d3d1", "#ef4444", "#a8a29e", "chicken-4"),  # light pullet
]

def chicken_svg(body, belly, wing, comb, tail):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" role="img" aria-label="Country chicken illustration">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ecfccb"/><stop offset="1" stop-color="#d9f99d"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.82" cy="0.2" r="0.5">
      <stop offset="0" stop-color="#fef9c3"/><stop offset="1" stop-color="#fef9c3" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="480" height="360" fill="url(#bg)"/>
  <rect width="480" height="360" fill="url(#sun)"/>
  <ellipse cx="240" cy="330" rx="220" ry="40" fill="#65a30d" opacity="0.35"/>
  <ellipse cx="250" cy="300" rx="120" ry="26" fill="#3f6212" opacity="0.25"/>
  <!-- tail -->
  <path d="M120 230 C70 150 110 120 150 150 C120 170 150 210 175 215 Z" fill="{tail}"/>
  <path d="M120 235 C80 175 120 140 160 165 C135 185 160 220 185 225 Z" fill="{wing}"/>
  <!-- body -->
  <path d="M150 230 C150 150 220 120 280 150 C330 175 330 250 285 280 C240 305 170 300 150 230 Z" fill="{body}"/>
  <path d="M205 250 C200 205 240 185 280 200 C305 215 300 260 270 275 C240 288 215 285 205 250 Z" fill="{belly}"/>
  <!-- wing -->
  <path d="M210 215 C250 195 300 205 305 235 C290 255 240 258 210 240 Z" fill="{wing}"/>
  <!-- head -->
  <circle cx="305" cy="150" r="42" fill="{body}"/>
  <!-- comb -->
  <path d="M285 112 q10 -22 22 -4 q12 -22 22 -2 q10 -18 18 4 q-8 14 -30 16 q-22 2 -32 -14 Z" fill="{comb}"/>
  <!-- beak -->
  <path d="M345 150 l34 -8 l-34 18 Z" fill="#f59e0b"/>
  <!-- wattle -->
  <path d="M330 172 q10 22 -2 30 q-14 -4 -10 -28 Z" fill="{comb}"/>
  <!-- eye -->
  <circle cx="318" cy="142" r="7" fill="#1c1917"/>
  <circle cx="320" cy="140" r="2.4" fill="#fff"/>
  <!-- legs -->
  <g stroke="#f59e0b" stroke-width="7" stroke-linecap="round">
    <path d="M235 295 l-6 34"/><path d="M270 298 l4 34"/>
  </g>
  <g stroke="#f59e0b" stroke-width="5" stroke-linecap="round">
    <path d="M229 329 l-12 6"/><path d="M229 329 l-2 12"/>
    <path d="M274 332 l12 6"/><path d="M274 332 l2 12"/>
  </g>
</svg>'''

for body, belly, wing, comb, tail, name in CHICKEN_PALETTES:
    with open(f"{name}.svg", "w") as f:
        f.write(chicken_svg(body, belly, wing, comb, tail))

# ---- Hero / farm scene ----
hero = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Green farm landscape at sunrise">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bbf7d0"/><stop offset="0.45" stop-color="#fef9c3"/><stop offset="1" stop-color="#fefce8"/>
    </linearGradient>
    <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#84cc16"/><stop offset="1" stop-color="#4d7c0f"/>
    </linearGradient>
    <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#65a30d"/><stop offset="1" stop-color="#365314"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#sky)"/>
  <circle cx="1240" cy="240" r="120" fill="#fde68a"/>
  <circle cx="1240" cy="240" r="170" fill="#fef08a" opacity="0.35"/>
  <path d="M0 520 C300 440 520 540 820 500 C1100 465 1350 520 1600 470 L1600 900 L0 900 Z" fill="url(#hill1)"/>
  <path d="M0 640 C260 580 600 690 980 630 C1250 588 1450 660 1600 620 L1600 900 L0 900 Z" fill="url(#hill2)"/>
  <!-- trees -->
  <g>
    <rect x="180" y="470" width="14" height="60" fill="#78350f"/>
    <circle cx="187" cy="450" r="46" fill="#3f6212"/><circle cx="160" cy="470" r="34" fill="#4d7c0f"/><circle cx="214" cy="470" r="34" fill="#4d7c0f"/>
  </g>
  <!-- barn -->
  <g transform="translate(1080,430)">
    <rect x="0" y="40" width="180" height="120" fill="#b91c1c"/>
    <path d="M-12 40 L90 -6 L192 40 Z" fill="#7f1d1d"/>
    <rect x="70" y="92" width="40" height="68" fill="#fde68a"/>
    <rect x="20" y="70" width="34" height="30" fill="#fca5a5"/>
  </g>
  <!-- little roaming chickens -->
  <g transform="translate(520,690) scale(0.9)">
    <ellipse cx="0" cy="0" rx="34" ry="26" fill="#b45309"/><circle cx="28" cy="-18" r="16" fill="#b45309"/>
    <path d="M22 -30 q6 -12 12 -2 q6 -10 10 0 q-4 8 -14 8 Z" fill="#dc2626"/>
    <path d="M42 -18 l16 -4 l-16 8 Z" fill="#f59e0b"/>
    <circle cx="32" cy="-20" r="3" fill="#1c1917"/>
    <path d="M-30 0 q-26 -10 -10 -24 q4 12 16 14 Z" fill="#7c2d12"/>
    <g stroke="#f59e0b" stroke-width="4"><path d="M-6 24 l0 16"/><path d="M10 24 l0 16"/></g>
  </g>
  <g transform="translate(700,720) scale(0.7)">
    <ellipse cx="0" cy="0" rx="34" ry="26" fill="#fcd34d"/><circle cx="28" cy="-18" r="16" fill="#fcd34d"/>
    <path d="M22 -30 q6 -12 12 -2 q6 -10 10 0 q-4 8 -14 8 Z" fill="#ef4444"/>
    <path d="M42 -18 l16 -4 l-16 8 Z" fill="#f59e0b"/>
    <circle cx="32" cy="-20" r="3" fill="#1c1917"/>
    <path d="M-30 0 q-26 -10 -10 -24 q4 12 16 14 Z" fill="#d97706"/>
    <g stroke="#f59e0b" stroke-width="4"><path d="M-6 24 l0 16"/><path d="M10 24 l0 16"/></g>
  </g>
</svg>'''
open("hero-farm.svg", "w").write(hero)

# ---- About / process scene ----
about = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Open pasture farm">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d1fae5"/><stop offset="1" stop-color="#ecfccb"/></linearGradient></defs>
  <rect width="1200" height="800" fill="url(#s)"/>
  <circle cx="980" cy="170" r="90" fill="#fde68a"/>
  <path d="M0 520 C250 470 500 560 800 520 C1000 492 1100 540 1200 510 L1200 800 L0 800 Z" fill="#65a30d"/>
  <path d="M0 620 C300 580 700 660 1000 620 C1100 606 1160 640 1200 626 L1200 800 L0 800 Z" fill="#3f6212"/>
  <g><rect x="120" y="470" width="12" height="56" fill="#78350f"/><circle cx="126" cy="452" r="40" fill="#4d7c0f"/></g>
  <g><rect x="1010" y="500" width="12" height="56" fill="#78350f"/><circle cx="1016" cy="482" r="40" fill="#3f6212"/></g>
</svg>'''
open("about-farm.svg", "w").write(about)

# ---- Logo ----
logo = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="SR Poultry Farm logo">
  <circle cx="32" cy="32" r="30" fill="#166534"/>
  <circle cx="32" cy="32" r="30" fill="none" stroke="#fde68a" stroke-width="2"/>
  <path d="M24 44 C24 30 33 25 41 29 C48 33 47 44 40 48 C34 51 26 50 24 44 Z" fill="#fcd34d"/>
  <path d="M40 22 q4 -8 8 -1 q4 -7 7 0 q-3 6 -10 6 Z" fill="#dc2626"/>
  <circle cx="44" cy="30" r="7" fill="#fcd34d"/>
  <path d="M50 30 l8 -2 l-8 5 Z" fill="#f59e0b"/>
  <circle cx="45" cy="28" r="1.8" fill="#1c1917"/>
</svg>'''
open("logo.svg", "w").write(logo)

# favicon (simple)
open("../favicon.svg","w").write(logo)
print("generated")
