'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { Sparkles, ArrowUpRight, Film, Target, TrendingUp, Play } from 'lucide-react'

const cards = [
  {
    id: 1,
    video: 'https://framerusercontent.com/assets/DbZSLkpXo1zcSnI9ysFDBJDfbA.mp4',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    title: 'Studio Short Edit',
    views: '1.2M Views',
    rotate: -9,
    yOffset: -18,
    width: 'w-[160px] sm:w-[230px] md:w-[260px]',
    height: 'h-[260px] sm:h-[350px] md:h-[400px]',
    borderRadius: 'rounded-[24px] sm:rounded-[32px]',
    delay: 0,
  },
  {
    id: 2,
    video: 'https://framerusercontent.com/assets/0O56ed5D4Df3A8PfmCNF5GC9eno.mp4',
    poster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    title: 'Lifestyle Vlog',
    views: '623K Views',
    rotate: -6,
    yOffset: -6,
    width: 'w-[130px] sm:w-[190px] md:w-[220px]',
    height: 'h-[220px] sm:h-[300px] md:h-[340px]',
    borderRadius: 'rounded-[20px] sm:rounded-[28px]',
    delay: 0.15,
  },
  {
    id: 3,
    video: 'https://framerusercontent.com/assets/4e6W2vHiUa5qeeiGAcxaDg11GbM.mp4',
    poster: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
    title: 'Product Unboxing',
    views: '487K Views',
    rotate: -3,
    yOffset: 6,
    width: 'w-[110px] sm:w-[160px] md:w-[190px]',
    height: 'h-[190px] sm:h-[260px] md:h-[290px]',
    borderRadius: 'rounded-[18px] sm:rounded-[24px]',
    delay: 0.3,
  },
  {
    id: 4,
    video: 'https://framerusercontent.com/assets/423HbpaxYIUVGK5fOFwnabw10.mp4',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    title: 'Master Edit',
    views: '2.4M Views',
    rotate: 0,
    yOffset: 14,
    width: 'w-[120px] sm:w-[170px] md:w-[200px]',
    height: 'h-[200px] sm:h-[270px] md:h-[300px]',
    borderRadius: 'rounded-[20px] sm:rounded-[26px]',
    delay: 0.45,
  },
  {
    id: 5,
    video: 'https://framerusercontent.com/assets/18EExDeOIlPsFnEV5Fcbku7gdmo.mp4',
    poster: 'https://images.unsplash.com/photo-1483721074892-4a858076436c?q=80&w=600&auto=format&fit=crop',
    title: 'Fitness Reel',
    views: '920K Views',
    rotate: 3,
    yOffset: 6,
    width: 'w-[110px] sm:w-[160px] md:w-[190px]',
    height: 'h-[190px] sm:h-[260px] md:h-[290px]',
    borderRadius: 'rounded-[18px] sm:rounded-[24px]',
    delay: 0.6,
  },
  {
    id: 6,
    video: 'https://framerusercontent.com/assets/OF8Sj3bltaUyBpQsgUNxK11PKc.mp4',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    title: 'Cinematic Ride',
    views: '540K Views',
    rotate: 6,
    yOffset: -6,
    width: 'w-[130px] sm:w-[190px] md:w-[220px]',
    height: 'h-[220px] sm:h-[300px] md:h-[340px]',
    borderRadius: 'rounded-[20px] sm:rounded-[28px]',
    delay: 0.75,
  },
  {
    id: 7,
    video: 'https://framerusercontent.com/assets/FLMP26czSPqDNGSRZ1PfTOfD3E.mp4',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    title: 'Creator Interview',
    views: '758K Views',
    rotate: 9,
    yOffset: -18,
    width: 'w-[160px] sm:w-[230px] md:w-[260px]',
    height: 'h-[260px] sm:h-[350px] md:h-[400px]',
    borderRadius: 'rounded-[24px] sm:rounded-[32px]',
    delay: 0.9,
  },
]


export function LandingHero() {
  // Cursor 3D spring tilt physics matching Framer Motion engine
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })
  const tiltRotateX = useTransform(springY, [-300, 300], [6, -6])
  const tiltRotateY = useTransform(springX, [-500, 500], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-between overflow-hidden bg-[#090401] perspective-[1200px]"
    >
      {/* Top-Left Gigantic Glowing Orange Radial Orb */}
      <div className="absolute top-[-120px] left-[-120px] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FF5500] via-[#E8501A] to-amber-700/20 blur-[140px] opacity-80 pointer-events-none z-0" />

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-[856px] mx-auto text-center flex flex-col items-center gap-6 mt-8">
        {/* Eyebrow Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/90 framer-badge backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-current" />
          <span>Trusted by 100+ creators & brands</span>
        </motion.div>

        {/* H1 Display Title (Exact Bricolage Grotesque Pure White Text) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="framer-h1 max-w-[856px]"
        >
          Short-form video editing that <br />
          actually gets results
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="framer-subtitle max-w-2xl"
        >
          We turn your raw clips into high-performing Reels, TikToks, and Shorts — designed to grab attention, boost engagement, and grow your audience faster.
        </motion.p>

        {/* Action Buttons (Exact Framer Button Class) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-row items-center gap-4 mt-2"
        >
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 framer-btn-primary"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="#showcase"
            className="inline-flex items-center justify-center gap-1.5 framer-btn-secondary"
          >
            <span>See Our Works</span>
          </a>
        </motion.div>
      </div>

      {/* 7-Card Fan-out Animated HTML5 Video Reel Container (80px gap from buttons) */}
      <motion.div
        style={{ rotateX: tiltRotateX, rotateY: tiltRotateY }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-16 md:mt-20 flex items-end justify-center gap-2 sm:gap-4 overflow-visible px-2 transform-gpu"
      >

        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [card.yOffset, card.yOffset - 12, card.yOffset],
            }}
            transition={{
              y: {
                duration: 5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
                delay: card.delay,
              },
              opacity: { duration: 0.5, delay: card.delay },
            }}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              y: card.yOffset - 24,
              zIndex: 50,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            style={{ rotate: card.rotate }}
            className={`relative ${card.width} ${card.height} ${card.borderRadius} overflow-hidden border border-white/12 hover:border-[#E8501A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] group bg-[#160F14] cursor-pointer flex-shrink-0 glass-shimmer-sweep`}
          >
            {/* HTML5 Autoplay Looping Video Reel */}
            <video
              src={card.video}
              poster={card.poster}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />

            {/* Play overlay gradient & glass shine */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between text-left opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#E8501A]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md backdrop-blur-md">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>Reel #{card.id}</span>
                </span>
                <span className="w-6 h-6 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-white font-heading block drop-shadow-md">{card.title}</span>
                <span className="text-[10px] font-mono text-amber-300 font-semibold">{card.views}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Bottom Pill Badge (Short Video Editing | Content Strategy | Growth Optimization) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="relative z-20 mt-6 inline-flex items-center justify-center gap-4 sm:gap-8 px-6 py-2.5 rounded-full bg-[#120B08]/90 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-semibold text-white/90"
      >
        <div className="flex items-center gap-2">
          <Film className="w-3.5 h-3.5 text-[#E8501A]" />
          <span>Short Video Editing</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span>Content Strategy</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>Growth Optimization</span>
        </div>
      </motion.div>
    </section>
  )
}
