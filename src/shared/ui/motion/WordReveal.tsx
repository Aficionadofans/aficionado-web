'use client'

import { motion } from 'motion/react'

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export function WordReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  as = 'h2',
}: WordRevealProps) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  }


  const Tag = motion[as] as any

  return (
    <Tag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em] last:mr-0 align-baseline"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
