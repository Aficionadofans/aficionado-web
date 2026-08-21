'use client'

/**
 * Ambient background orbs — fiery orange + electric teal gradient theme.
 * Uses CSS custom properties (--orb-warm, --orb-accent, --orb-teal, --orb-blur, --orb-bg)
 * defined in globals.css so colors can be overridden contextually.
 */
export function AmbientOrbs() {
  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
      style={{ background: 'var(--orb-bg)' }}
    >
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen animate-breathe-calm"
        style={{
          background: 'color-mix(in srgb, var(--orb-warm) 10%, transparent)',
          filter: 'blur(var(--orb-blur))',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full mix-blend-screen animate-breathe-calm"
        style={{
          background: 'color-mix(in srgb, var(--orb-teal) 10%, transparent)',
          filter: 'blur(160px)',
          animationDelay: '3s',
        }}
      />
      <div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] rounded-full mix-blend-screen animate-breathe-calm"
        style={{
          background: 'color-mix(in srgb, var(--orb-accent) 8%, transparent)',
          filter: 'blur(140px)',
          animationDelay: '1.5s',
        }}
      />
    </div>
  )
}
