import { Link } from 'react-router-dom'

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#151c30" stroke="#28324f" />
      <path
        d="M14 9 7 16l7 7"
        fill="none"
        stroke="#e6eaf4"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="17" y="19" width="9" height="4" rx="1" fill="#ffc83d" className="caret" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Tech Academy, ir al inicio"
      className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}
    >
      <LogoMark />
      Tech Academy
    </Link>
  )
}
