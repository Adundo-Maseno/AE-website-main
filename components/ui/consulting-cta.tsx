'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ConsultingButton } from './consulting-button'

export interface ConsultingCTAProps {
  tag?: string
  title: string
  description: string
  primaryButton?: {
    label: string
    href: string
  }
  secondaryButton?: {
    label: string
    href: string
  }
  className?: string
}

export function ConsultingCTA({
  tag = 'Collaborate With Agri Experience',
  title,
  description,
  primaryButton = {
    label: 'Initiate a Consultation',
    href: '/contact',
  },
  secondaryButton,
  className = '',
}: ConsultingCTAProps) {
  return (
    <section
      className={`w-full relative overflow-hidden bg-deep-forest text-white py-20 lg:py-28 ${className}`}
    >
      {/* Editorial ambient radial atmospheric lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,180,74,0.18),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(194,155,56,0.12),_transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center space-y-8">
        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider"
          >
            <span>{tag}</span>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight"
          style={{ fontSize: 'clamp(2.25rem, 1.8rem + 2.5vw, 4.5rem)' }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {primaryButton && (
            <ConsultingButton
              href={primaryButton.href}
              variant="white"
              size="lg"
            >
              {primaryButton.label}
            </ConsultingButton>
          )}

          {secondaryButton && (
            <ConsultingButton
              href={secondaryButton.href}
              variant="dark-outline"
              size="lg"
            >
              {secondaryButton.label}
            </ConsultingButton>
          )}
        </motion.div>
      </div>
    </section>
  )
}
