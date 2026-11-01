export function FathomLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#0F9F86" />
      <path
        d="M10 26c3.5-8 7-12 10-12s6.5 4 10 12"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="14" r="2.4" fill="#D8F5EE" />
      <path d="M14 22h12" stroke="rgba(255,255,255,.45)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
