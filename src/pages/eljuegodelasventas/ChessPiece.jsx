// Piezas de ajedrez en SVG — metáfora visual del juego y la estrategia.
// Variantes: "solid" (currentColor), "outline" (solo trazo) y "3d" (degradado + brillo).

const SHAPES = {
  pawn: (
    <>
      <circle cx="50" cy="34" r="15" />
      <path d="M36 54h28v7H36z" />
      <path d="M41 61h18c0 18 14 34 22 56H19c8-22 22-38 22-56z" />
    </>
  ),
  rook: (
    <path d="M24 18H36V28H44V18H56V28H64V18H76V40L70 48V100L80 118H20L30 100V48L24 40Z" />
  ),
  bishop: (
    <>
      <circle cx="50" cy="12" r="6" />
      <path d="M50 18c14 10 22 22 22 34 0 9-7 14-13 16H41c-6-2-13-7-13-16 0-12 8-24 22-34z" />
      <path d="M34 68h32v7H34z" />
      <path d="M41 75h18c0 16 14 29 22 43H19c8-14 22-27 22-43z" />
    </>
  ),
  queen: (
    <>
      <path d="M22 38 30 72 36 38 43 72 50 32 57 72 64 38 70 72 78 38 75 90H25z" />
      <circle cx="22" cy="34" r="4.5" />
      <circle cx="36" cy="33" r="4.5" />
      <circle cx="50" cy="28" r="4.5" />
      <circle cx="64" cy="33" r="4.5" />
      <circle cx="78" cy="34" r="4.5" />
      <path d="M27 88h46v7H27z" />
      <path d="M33 95h34c0 12 13 14 17 23H16c4-9 17-11 17-23z" />
    </>
  ),
  king: (
    <>
      <path d="M46 3h8v10h10v8H54v9h-8v-9H36v-8h10z" />
      <path d="M32 46c0-10 8-16 18-16s18 6 18 16c0 8-5 12-9 16H41c-4-4-9-8-9-16z" />
      <path d="M35 62h30v7H35z" />
      <path d="M41 69h18c0 16 14 29 22 49H19c8-20 22-33 22-49z" />
    </>
  ),
}

const BASE = (
  <>
    <path d="M22 116h56l4 9H18z" />
    <path d="M14 125h72a3 3 0 0 1 3 3v6H11v-6a3 3 0 0 1 3-3z" />
  </>
)

export function ChessPiece({ type = 'pawn', variant = 'solid', className = '', ...rest }) {
  const body = (
    <>
      {SHAPES[type] || SHAPES.pawn}
      {BASE}
    </>
  )
  return (
    <svg
      viewBox="0 0 100 140"
      className={`ejv-piece ejv-piece--${variant} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g className="ejv-piece__fill">{body}</g>
      {variant === '3d' && (
        <g fill="url(#ejv-shine)" style={{ mixBlendMode: 'overlay' }}>
          {body}
        </g>
      )}
    </svg>
  )
}

// Se renderiza una sola vez por página: define los degradados usados por las piezas 3D.
export function PieceDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ejv-grad3d" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
          <stop offset="0" stopColor="#8fb0ff" />
          <stop offset=".42" stopColor="#0648E8" />
          <stop offset=".78" stopColor="#0a2cb0" />
          <stop offset="1" stopColor="#071C83" />
        </linearGradient>
        <linearGradient id="ejv-gradLight" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".5" stopColor="#dbe6ff" />
          <stop offset="1" stopColor="#7f9fff" />
        </linearGradient>
        <linearGradient id="ejv-shine" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="140">
          <stop offset="0" stopColor="#fff" stopOpacity=".75" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
      </defs>
    </svg>
  )
}
