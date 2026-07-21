'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'
import { Sparkles, ArrowUpRight, Film, Target, TrendingUp, Play } from 'lucide-react'

const arms = [
  {
    id: 1,
    name: 'Arm 1',
    rotateY: 0,
    videoLeft: 'https://framerusercontent.com/assets/DbZSLkpXo1zcSnI9ysFDBJDfbA.mp4',
    videoRight: 'https://framerusercontent.com/assets/xwwcsY1bO4mvg40HfBIphxImK0.mp4',
    titleLeft: 'Studio Short Edit',
    titleRight: 'Visual Masterclass',
    viewsLeft: '1.2M Views',
    viewsRight: '840K Views',
  },
  {
    id: 2,
    name: 'Arm 2',
    rotateY: 30,
    videoLeft: 'https://framerusercontent.com/assets/0O56ed5D4Df3A8PfmCNF5GC9eno.mp4',
    videoRight: 'https://framerusercontent.com/assets/VLYpQEgJksWEMFbKP3YaHxFfVs.mp4',
    titleLeft: 'Lifestyle Vlog',
    titleRight: 'Tech Unboxing',
    viewsLeft: '623K Views',
    viewsRight: '1.1M Views',
  },
  {
    id: 3,
    name: 'Arm 3',
    rotateY: 60,
    videoLeft: 'https://framerusercontent.com/assets/4e6W2vHiUa5qeeiGAcxaDg11GbM.mp4',
    videoRight: 'https://framerusercontent.com/assets/4dSTZqfQShRZb2JWlBhMm2kAkA.mp4',
    titleLeft: 'Product Unboxing',
    titleRight: 'Fitness Reel',
    viewsLeft: '487K Views',
    viewsRight: '920K Views',
  },
  {
    id: 4,
    name: 'Arm 4',
    rotateY: 90,
    videoLeft: 'https://framerusercontent.com/assets/18EExDeOIlPsFnEV5Fcbku7gdmo.mp4',
    videoRight: 'https://framerusercontent.com/assets/09nVoDGdZaacUkvOk3LWbUqaFk.mp4',
    titleLeft: 'Master Edit',
    titleRight: 'Cinematic Ride',
    viewsLeft: '2.4M Views',
    viewsRight: '540K Views',
  },
  {
    id: 5,
    name: 'Arm 5',
    rotateY: 120,
    videoLeft: 'https://framerusercontent.com/assets/423HbpaxYIUVGK5fOFwnabw10.mp4',
    videoRight: 'https://framerusercontent.com/assets/OUh0BxMeGqmebqe3OU950qgZd5Q.mp4',
    titleLeft: 'Creator Interview',
    titleRight: 'Brand Drop',
    viewsLeft: '758K Views',
    viewsRight: '1.5M Views',
  },
  {
    id: 6,
    name: 'Arm 6',
    rotateY: 150,
    videoLeft: 'https://framerusercontent.com/assets/OF8Sj3bltaUyBpQsgUNxK11PKc.mp4',
    videoRight: 'https://framerusercontent.com/assets/aaDgCGVVmNL57iUOvyPa1FHrT0.mp4',
    titleLeft: 'Audiobook Spoken Word',
    titleRight: 'Motion Reel',
    viewsLeft: '390K Views',
    viewsRight: '980K Views',
  },
  {
    id: 7,
    name: 'Arm 7',
    rotateY: 180,
    videoLeft: 'https://framerusercontent.com/assets/FLMP26czSPqDNGSRZ1PfTOfD3E.mp4',
    videoRight: 'https://framerusercontent.com/assets/XosFZVpUimK3yaRwQcx2OVdsuY.mp4',
    titleLeft: 'VIP Circle Drop',
    titleRight: 'Live Stream Highlights',
    viewsLeft: '2.1M Views',
    viewsRight: '670K Views',
  },
]

export function LandingHero() {
  // Cursor 3D spring tilt physics matching Framer Motion engine
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const tiltRotateX = useTransform(springY, [-300, 300], [8, -8])
  const tiltRotateY = useTransform(springX, [-500, 500], [-12, 12])

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
      className="relative min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-between overflow-hidden bg-[#090401] perspective-[1000px]"
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

      {/* Framer 3D Cylindrical Revolving Carousel Viewport */}
      <motion.div
        style={{ rotateX: tiltRotateX, rotateY: tiltRotateY }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-16 md:mt-20 h-[380px] sm:h-[420px] flex items-center justify-center overflow-visible transform-gpu perspective-[1000px]"
      >
        {/* Continuous 3D Rotating Arms Container */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="relative w-[800px] sm:w-[1100px] md:w-[1300px] h-[320px] sm:h-[360px] flex items-center justify-center transform-style-3d cursor-grab active:cursor-grabbing"
        >
          {arms.map((arm) => (
            <div
              key={arm.id}
              style={{ transform: `rotateY(${arm.rotateY}deg)` }}
              className="absolute w-full h-[240px] flex items-center justify-between pointer-events-auto transform-style-3d px-2"
            >
              {/* Left Video Box */}
              <div
                style={{ transform: 'rotateY(90deg)' }}
                className="w-[170px] sm:w-[230px] md:w-[259px] h-[250px] sm:h-[340px] md:h-[389px] rounded-[24px] overflow-hidden border border-white/15 hover:border-[#E8501A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] group bg-[#100B08] glass-shimmer-sweep transform-style-3d transition-transform duration-300 hover:scale-105"
              >
                <video
                  src={arm.videoLeft}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between text-left opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#E8501A]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md backdrop-blur-md">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Drop #{arm.id}A</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white font-heading block drop-shadow-md">{arm.titleLeft}</span>
                    <span className="text-[10px] font-mono text-amber-300 font-semibold">{arm.viewsLeft}</span>
                  </div>
                </div>
              </div>

              {/* Right Video Box */}
              <div
                style={{ transform: 'rotateY(-90deg)' }}
                className="w-[170px] sm:w-[230px] md:w-[259px] h-[250px] sm:h-[340px] md:h-[389px] rounded-[24px] overflow-hidden border border-white/15 hover:border-[#E8501A] shadow-[0_24px_50px_rgba(0,0,0,0.85)] group bg-[#100B08] glass-shimmer-sweep transform-style-3d transition-transform duration-300 hover:scale-105"
              >
                <video
                  src={arm.videoRight}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between text-left opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#E8501A]/90 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md backdrop-blur-md">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Drop #{arm.id}B</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white font-heading block drop-shadow-md">{arm.titleRight}</span>
                    <span className="text-[10px] font-mono text-amber-300 font-semibold">{arm.viewsRight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Bottom Pill Badge */}
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

