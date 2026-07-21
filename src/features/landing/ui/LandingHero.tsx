import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0C]">
      {/* Hero gradient overlay */}
      <div className="clipcut-hero-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient teal orb blob */}
      <div
        className="animate-breathe-calm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 212, 200, 0.12) 0%, rgba(0, 212, 200, 0.04) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6 max-w-5xl mx-auto">
        {/* Badge */}
        <span className="clipcut-pill px-4 py-1.5">
          Creator Platform
        </span>

        {/* H1 */}
        <h1
          className="font-heading font-black text-[40px] md:text-[56px] lg:text-[80px] text-foreground leading-[1.05]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Your Voice.{" "}
          <span className="text-primary">Your Empire.</span>
        </h1>

        {/* Sub-headline */}
        <p className="font-sans text-xl text-muted-foreground max-w-xl leading-relaxed">
          The creator platform that puts you in control — monetise your content,
          build your community, and own your audience. No algorithms, no
          interference.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-base px-8 py-3 transition-all duration-200 hover:bg-primary-hover hover:shadow-[0_0_24px_rgba(0,212,200,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Get Started Free
          </Link>

          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-foreground font-semibold text-base px-8 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-white/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            See Features
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground/60">
        <span className="text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
