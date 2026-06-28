export default function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="24" cy="24" r="24" fill="#14532d" />
      {/* Gold accent ring */}
      <circle cx="24" cy="24" r="21.5" stroke="#f59e0b" strokeWidth="0.8" fill="none" />

      {/* Tail feathers behind body */}
      <path d="M15 26 Q9 20 11 13 Q15 19 17 25Z" fill="#fef3c7" opacity="0.75" />
      <path d="M13 29 Q7 24 9 17 Q14 23 15 28Z" fill="#fef3c7" opacity="0.45" />

      {/* Body */}
      <ellipse cx="22" cy="30" rx="8.5" ry="9" fill="#fef3c7" />

      {/* Head */}
      <circle cx="31" cy="17" r="6" fill="#fef3c7" />

      {/* Comb — three peaks */}
      <path
        d="M28 11.5 C28.5 9.5 29.5 9 30 11.2 C30.5 9 31.5 8.5 32 10.8 C32.5 9 33.5 9.5 33.5 11.5"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Beak */}
      <path d="M37 16.5 L40.5 17 L37 17.5Z" fill="#f59e0b" />

      {/* Eye */}
      <circle cx="33" cy="16" r="1.6" fill="#14532d" />
      <circle cx="33.5" cy="15.5" r="0.55" fill="white" />

      {/* Wattle */}
      <ellipse cx="37" cy="21" rx="1.2" ry="2" fill="#dc2626" />

      {/* Wing line */}
      <path
        d="M15 28 Q20 25 22 30"
        stroke="#d4b896"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />

      {/* Legs */}
      <line x1="19" y1="38.5" x2="17" y2="43" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17" y1="43" x2="14.5" y2="43" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="25" y1="38.5" x2="27.5" y2="43" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27.5" y1="43" x2="30" y2="43" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
