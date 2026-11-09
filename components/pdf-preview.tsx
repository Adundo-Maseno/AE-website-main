'use client'

import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ArrowRight, FileText } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up the pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

/** Lazy PDF preview — renders the first page using react-pdf */
export default function PdfPreview({ pdfUrl }: { pdfUrl: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noreferrer"
      className="block group/preview"
      aria-label="Open PDF"
    >
      <div
        ref={ref}
        className="relative w-full overflow-hidden bg-white aspect-[1/1.2]"
      >
        {/* Skeleton shimmer */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-mist animate-pulse z-0">
            <FileText size={32} className="text-primary-green/30" />
            <div className="h-2 w-2/3 rounded-full bg-primary-green/10" />
            <div className="h-2 w-1/2 rounded-full bg-primary-green/10" />
          </div>
        )}

        {visible && (
          <div className={`absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden transition-opacity duration-500 z-10 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Document
              file={pdfUrl}
              onLoadSuccess={() => setLoaded(true)}
              loading={null}
              error={null}
            >
              <Page
                pageNumber={1}
                width={600}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-sm [&>canvas]:!w-full [&>canvas]:!h-auto"
              />
            </Document>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary-green/0 group-hover/preview:bg-primary-green/5 transition-colors duration-200 flex items-center justify-center z-20">
          <span className="opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 bg-white/90 backdrop-blur-sm text-deep-forest text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <ArrowRight size={12} /> Open PDF
          </span>
        </div>
      </div>
    </a>
  )
}
