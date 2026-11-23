import {
  Sprout,
  Globe,
  Settings,
  TrendingUp,
  ShieldCheck,
  Award,
  Laptop,
  BookOpen,
  Smartphone,
  Leaf,
  HandHeart,
  Wheat,
} from 'lucide-react'

export const MILESTONE_ICON_OPTIONS = [
  { value: 'sprout', label: 'Seedling / Sprout' },
  { value: 'globe', label: 'Africa / Global' },
  { value: 'settings', label: 'Systems / Gears' },
  { value: 'trending-up', label: 'Growth / Sector' },
  { value: 'shield-check', label: 'Quality / Resilience' },
  { value: 'award', label: 'Certification / Beta' },
  { value: 'laptop', label: 'Digital Platform' },
  { value: 'book-open', label: 'Digital Learning' },
  { value: 'smartphone', label: 'Mobile Catalogue' },
  { value: 'leaf', label: 'Environment' },
  { value: 'hand-holding', label: 'Investment / Care' },
  { value: 'wheat', label: 'Crops / Maize' },
] as const

export function MilestoneIcon({
  name,
  size = 26,
  className = '',
}: {
  name?: string | null
  size?: number
  className?: string
}) {
  switch (name) {
    case 'globe':
      return <Globe size={size} className={className} />
    case 'settings':
      return <Settings size={size} className={className} />
    case 'trending-up':
      return <TrendingUp size={size} className={className} />
    case 'shield-check':
      return <ShieldCheck size={size} className={className} />
    case 'award':
      return <Award size={size} className={className} />
    case 'laptop':
      return <Laptop size={size} className={className} />
    case 'book-open':
      return <BookOpen size={size} className={className} />
    case 'smartphone':
      return <Smartphone size={size} className={className} />
    case 'leaf':
      return <Leaf size={size} className={className} />
    case 'hand-holding':
      return <HandHeart size={size} className={className} />
    case 'wheat':
      return <Wheat size={size} className={className} />
    case 'sprout':
    default:
      return <Sprout size={size} className={className} />
  }
}
