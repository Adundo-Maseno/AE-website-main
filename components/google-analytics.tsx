'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const

export default function GoogleAnalytics({ gaId }: { gaId?: string }) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0ZV66F5FK6'

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    if (!window.gtag) {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }
    }

    let storedConsent: 'granted' | 'denied' = 'denied'
    try {
      if (localStorage.getItem('cookie_consent') === 'granted') {
        storedConsent = 'granted'
      }
    } catch {
      // Ignore localStorage access errors
    }

    window.gtag('consent', 'default', {
      analytics_storage: storedConsent,
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })

    let loaded = false
    let timeoutId: number | undefined
    let idleId: number | undefined

    const cleanup = () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, onInteraction)
      }
      window.removeEventListener('load', scheduleLoad)
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
        timeoutId = undefined
      }
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
        idleId = undefined
      }
    }

    const loadGtag = () => {
      if (loaded) return
      loaded = true
      cleanup()

      window.gtag?.('js', new Date())
      window.gtag?.('config', measurementId, {
        page_path: window.location.pathname,
      })

      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)
    }

    function onInteraction() {
      loadGtag()
    }

    function scheduleLoad() {
      timeoutId = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(loadGtag, { timeout: 2000 })
        } else {
          loadGtag()
        }
      }, 6500)
    }

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, onInteraction, { once: true, passive: true })
    }

    if (document.readyState === 'complete') {
      scheduleLoad()
    } else {
      window.addEventListener('load', scheduleLoad, { once: true })
    }

    return cleanup
  }, [measurementId])

  return null
}
