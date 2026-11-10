'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { RollingText } from '@/components/ui/rolling-text'

export interface ConsultingButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'white' | 'dark-outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
  external?: boolean
  className?: string
  disabled?: boolean
}

export function ConsultingButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon = true,
  external = false,
  className = '',
  disabled = false,
}: ConsultingButtonProps) {
  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 active:scale-95 cursor-pointer'

  const sizeStyles = {
    sm: 'text-xs px-5 py-2.5 gap-2',
    md: 'text-xs sm:text-sm px-7 py-3.5 gap-2.5 shadow-xs',
    lg: 'text-sm sm:text-base px-8 py-4 gap-3 shadow-md',
  }

  const variantStyles = {
    primary:
      'bg-deep-forest text-white hover:bg-primary-green shadow-[0_4px_14px_rgba(15,36,23,0.15)] hover:shadow-[0_6px_20px_rgba(26,77,46,0.25)]',
    secondary:
      'bg-white text-deep-forest border border-black/15 hover:border-deep-forest/40 hover:bg-mist',
    white:
      'bg-white text-deep-forest hover:bg-primary-green hover:text-white shadow-lg hover:shadow-xl',
    'dark-outline':
      'border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm',
    ghost:
      'bg-transparent text-deep-forest hover:text-primary-green p-0 shadow-none active:scale-100',
  }

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 18,
  }

  const content = (
    <RollingText className={`gap-2 items-center ${sizeStyles[size]}`}>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          size={iconSizes[size]}
          className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
        />
      )}
    </RollingText>
  )

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
          {content}
        </a>
      )
    }

    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </button>
  )
}
