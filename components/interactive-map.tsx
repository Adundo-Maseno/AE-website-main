'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Crosshair,
  Globe,
  Info,
  Layers3,
  MapPin,
  Sparkles,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { getCountrySeeds, createGenericProjects } from './country-data'

const InteractiveMapbox = dynamic(
  () => import('./map/interactive-mapbox').then((mod) => mod.InteractiveMapbox),
  { ssr: false, loading: () => <div className="w-full h-full bg-primary-ivory animate-pulse" /> }
)
import { getOptimalZoom } from './map/map-utils'
import { MapSearch } from './map/map-search'

type Region = 'East Africa' | 'West Africa' | 'Central Africa' | 'Southern Africa'

export interface CountryProject {
  title: string
  location: string
  summary: string
  outcome: string
  partners: string[]
  evidence: string[]
  methods: string[]
  timeline?: string
  budget_scope?: string
  key_deliverables?: string[]
}

export interface CountryRecord {
  id?: number
  name: string
  geoName?: string
  code: string
  region: Region
  projects: number
  engagement: number
  overview: string
  focus: string[]
  impact: string[]
  locations: string[]
  stats: Array<{ label: string; value: string }>
  workDone: string[]
}

export interface DetailedCountryRecord extends CountryRecord {
  projectBlueprints?: CountryProject[]
}

export const regionFill = (region: Region) => {
  switch (region) {
    case 'West Africa':
      return 'rgba(180, 83, 9, 0.30)'
    case 'Central Africa':
      return 'rgba(22, 101, 52, 0.28)'
    case 'Southern Africa':
      return 'rgba(22, 163, 74, 0.24)'
    default:
      return 'rgba(15, 61, 49, 0.34)'
  }
}

export const formatFarmers = (engagement: number) => `${Math.round(engagement / 1000)}K+`

export const cityCoordinates: Record<string, [number, number]> = {
  'Nairobi': [36.8219, -1.2921],
  'Kisumu': [34.7617, -0.0917],
  'Nakuru': [36.0800, -0.3031],
  'Kitui': [38.0106, -1.3694],
  'Tharaka Nithi': [37.9833, -0.2500],
  'Kampala': [32.5825, 0.3476],
  'Gulu': [32.2989, 2.7667],
  'Mbarara': [30.6545, -0.6105],
  'Dar es Salaam': [39.2622, -6.7924],
  'Dodoma': [35.7516, -6.1630],
  'Morogoro': [37.6668, -8.3685],
  'Njombe': [34.7667, -9.3333],
  'Arusha': [36.6833, -3.3667],
  'Msimba Farm': [37.2833, -7.0333],
  'Kigali': [30.0619, -1.9441],
  'Musanze': [29.6349, -1.4998],
  'Huye': [29.7434, -2.5966],
  'Addis Ababa': [38.7469, 9.0227],
  'Hawassa': [38.4805, 7.0504],
  'Bahir Dar': [37.3939, 11.5936],
  'Lusaka': [28.2833, -15.4167],
  'Chipata': [32.6500, -13.6333],
  'Ndola': [28.6366, -12.9587],
  'Accra': [-0.1870, 5.6037],
  'Kumasi': [-1.6244, 6.6884],
  'Tamale': [-0.8393, 9.4008],
  'Kinshasa': [15.3150, -4.3317],
  'Goma': [29.2215, -1.6585],
  'Lubumbashi': [27.4794, -11.6609],
  'Bukavu': [28.8628, -2.5083],
  'Abuja': [7.3986, 9.0765],
  'Kano': [8.5167, 11.9964],
  'Ibadan': [3.8996, 7.3775],
  'Bujumbura': [29.3561, -3.3822],
  'Gitega': [29.9246, -3.4270],
  'Ngozi': [29.8306, -2.8797],
  'East Africa corridor': [34.0, 0.0],
  'Eastern and Southern DRC': [27.0, -6.0],
  'West Africa': [2.0, 9.0],
  'Southern Africa corridor': [29.0, -16.0],
  'Nigeria': [8.0, 10.0],
  'Ghana / regional': [-1.0, 8.0],
}

/*
const countrySeeds: DetailedCountryRecord[] = [
  {
    name: 'Kenya',
    code: 'KE',
    region: 'East Africa',
    projects: 8,
    engagement: 124000,
    overview: 'Seed regulation reform, MbeguChoice, and county agrodealer systems made Kenya the strongest public-facing portfolio.',
    focus: ['Seed certification', 'Market linkages', 'Traceability'],
    impact: ['Updated seed rules', 'Better market trust', 'Stronger last-mile distribution'],
    locations: ['Nairobi', 'Kisumu', 'Nakuru'],
    stats: [
      { label: 'Active projects', value: '8' },
      { label: 'Farmers reached', value: '124K+' },
      { label: 'County hubs', value: '16' },
    ],
    projectBlueprints: [
      {
        title: 'Kenya Crops Seed Sector Project',
        location: 'National / Multiple Counties',
        summary: 'A comprehensive multi-year initiative that modernized seed commercialization, empowered agrodealers, and launched pioneering digital tools for farmers.',
        outcome: 'Dramatically improved seed traceability, market transparency, and farmer access to quality climate-smart varieties.',
        partners: ['MoA', 'KEPHIS', 'STAK', 'Seed Companies', 'Agrodealers'],
        evidence: [
          '60+ seed companies strengthened',
          '3,000+ agrodealers trained across 20 counties',
          '500+ demos and 50 field days',
          '7,000+ MbeguChoice app users'
        ],
        methods: ['Capacity Building', 'Digital Innovation', 'Field Demos', 'Governance Support'],
        timeline: '2013-2018',
        budget_scope: 'National Scale',
        key_deliverables: [
          'Established 16 county agrodealer associations for governance and advocacy',
          'Deployed MbeguChoice offline App and the Seed Sector Platform',
          'Pioneered the introduction of seed scratch-off labels to protect against counterfeits'
        ],
      },
      {
        title: 'Seed Systems Support for Development (S34D)',
        location: 'National',
        summary: 'Focused on expanding crop diversity in certified seed classes, strengthening quality surveillance, and increasing farmer awareness of quality seed.',
        outcome: 'Expanded the availability of certified seed for non-maize crops and established direct reporting lines between farmers and regulators.',
        partners: ['KEPHIS', 'National Media', 'Agrodealers'],
        evidence: [
          '16 crops introduced as Standard Certified Seed',
          '10,000+ farmers connected via feedback mechanism',
          'National radio campaign rollout'
        ],
        methods: ['Regulatory Expansion', 'Public Awareness', 'Surveillance Systems'],
        timeline: 'Ongoing',
        budget_scope: 'National Scale',
        key_deliverables: [
          'Introduced 16 crops under the Standard Certified Seed class',
          'Developed a national farmer feedback mechanism for KEPHIS',
          'Implemented a national radio awareness campaign promoting certified seed'
        ],
      }
    ],
  },
  {
    name: 'Uganda',
    code: 'UG',
    region: 'East Africa',
    projects: 6,
    engagement: 92000,
    overview: 'Virtual training and practical seed company support keep the Ugandan portfolio field-ready and exportable.',
    focus: ['Seed company management', 'Certification', 'Training'],
    impact: ['Improved technical capacity', 'Better quality assurance', 'Wider training access'],
    locations: ['Kampala', 'Gulu', 'Mbarara'],
    stats: [
      { label: 'Active projects', value: '6' },
      { label: 'People trained', value: '92K+' },
      { label: 'Learning modes', value: 'Hybrid' },
    ],
    projectBlueprints: [
      {
        title: 'Virtual seed company and inspector training',
        location: 'Kampala',
        summary: 'A five-day online training model brought seed company staff and inspectors into one learning track during COVID-19.',
        outcome: 'Expanded access to technical training without losing content quality or engagement.',
        partners: ['USTA', 'National Seed Certification Unit', 'Subject matter experts'],
        evidence: ['70+ company staff', '15 inspectors', 'Online delivery model'],
        methods: ['Remote facilitation', 'Technical curriculum', 'Interactive case work'],
        timeline: '2020',
        budget_scope: 'Emergency Response Tier',
        key_deliverables: ['Virtual curriculum', 'Cross-sector integration', 'Post-training audits'],
      },
      {
        title: 'Seed company management coaching',
        location: 'Kampala',
        summary: 'Business development support helped firms strengthen planning, finance, and customer-facing operations.',
        outcome: 'Companies gained more practical tools for production, marketing, and bookkeeping.',
        partners: ['Seed companies', 'Business mentors', 'Training partners'],
        evidence: ['Group training', 'One-on-one coaching', 'Business tools'],
        methods: ['Coaching', 'Workshops', 'Enterprise support'],
        timeline: '2021-2023',
        budget_scope: 'Enterprise Tier',
        key_deliverables: ['Business plan templates', 'Financial modeling tools', 'Market strategy workshops'],
      },
    ],
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    region: 'East Africa',
    projects: 9,
    engagement: 109000,
    overview: 'Digital certification, input transparency, and anti-counterfeit reporting anchor the Tanzania portfolio under the ESSETA program.',
    focus: ['Digital systems', 'Seed certification', 'Quality control'],
    impact: ['More transparent seed data', 'Better lab efficiency', 'Stronger regulator tools'],
    locations: ['Dar es Salaam', 'Dodoma', 'Morogoro'],
    stats: [
      { label: 'Active projects', value: '9' },
      { label: 'Stakeholders consulted', value: '2,000+' },
      { label: 'Priority crops', value: '13' },
    ],
    projectBlueprints: [
      {
        title: 'Enhancing the Seed Sector in Tanzania (ESSETA)',
        location: 'National',
        summary: 'A comprehensive initiative to modernize the national seed sector through digitalization, infrastructure upgrades, and strategic governance.',
        outcome: 'Significantly increased seed processing capacity, improved seed quality assurance, and enhanced national certification efficiency.',
        partners: ['Ministry of Agriculture', 'ASA', 'TOSCI'],
        evidence: [
          'Digitized the national seed certification system, improving efficiency and transparency',
          'Upgraded 3 ISTA-standard seed laboratories, strengthening seed quality assurance',
          'Installed a modern 3-tonne-per-hour seed processing plant at ASA\'s Msimba Farm'
        ],
        methods: ['Digitalization', 'Infrastructure Upgrades', 'Capacity Building', 'Strategic Planning'],
        timeline: '2019-2024',
        budget_scope: 'National System Tier',
        key_deliverables: [
          'Built the capacity of 800+ seed sector professionals',
          'Developed national Seed Demand Forecasting for 10 priority crops',
          'Established Seed Coordination Unit within the Ministry of Agriculture',
          'Developed the Tanzania Seed Investment Plan'
        ],
      }
    ],
  },
  {
    name: 'Rwanda',
    code: 'RW',
    region: 'East Africa',
    projects: 5,
    engagement: 61000,
    overview: 'Rwanda is treated as a coordination and exchange market, with practical support for associations and learning visits.',
    focus: ['Association development', 'Peer learning', 'Capacity building'],
    impact: ['Stronger sector coordination', 'Better regional links', 'Practical training support'],
    locations: ['Kigali', 'Musanze', 'Huye'],
    stats: [
      { label: 'Active projects', value: '5' },
      { label: 'Engagement', value: '61K+' },
      { label: 'Learning visits', value: '4' },
    ],
  },
  {
    name: 'Ethiopia',
    code: 'ET',
    region: 'East Africa',
    projects: 6,
    engagement: 70000,
    overview: 'Evidence-led maize seed research and policy support anchor the Ethiopian portfolio.',
    focus: ['Maize seed systems', 'Policy', 'Field evidence'],
    impact: ['Stronger research base', 'Better market understanding', 'Regional insight'],
    locations: ['Addis Ababa', 'Hawassa', 'Bahir Dar'],
    stats: [
      { label: 'Active projects', value: '6' },
      { label: 'Engagement', value: '70K+' },
      { label: 'Research streams', value: '3' },
    ],
  },
  {
    name: 'Malawi',
    code: 'MW',
    region: 'Southern Africa',
    projects: 4,
    engagement: 47000,
    overview: 'Malawi is represented as a strong Southern Africa partner market with practical seed system learning.',
    focus: ['Seed logistics', 'Training', 'Regional links'],
    impact: ['Better cross-border learning', 'Practical market access', 'Training support'],
    locations: ['Lilongwe', 'Blantyre', 'Mzuzu'],
    stats: [
      { label: 'Active projects', value: '4' },
      { label: 'Engagement', value: '47K+' },
      { label: 'Partner links', value: 'Regional' },
    ],
  },
  {
    name: 'Zambia',
    code: 'ZM',
    region: 'Southern Africa',
    projects: 7,
    engagement: 76000,
    overview: 'Hybrid training and certification work in Zambia made the system more scalable and accessible.',
    focus: ['Certification', 'Digital training', 'Quality assurance'],
    impact: ['Tripled enrollment', 'Lower travel burden', 'Cross-border participation'],
    locations: ['Lusaka', 'Chipata', 'Ndola'],
    stats: [
      { label: 'Active projects', value: '7' },
      { label: 'People trained', value: '76K+' },
      { label: 'Training mode', value: 'Hybrid' },
    ],
    projectBlueprints: [
      {
        title: 'Hybrid seed inspector training',
        location: 'Lusaka',
        summary: 'Transitioned the annual in-person seed inspector training to a hybrid digital model during the COVID-19 pandemic.',
        outcome: 'Tripled annual enrollment and reduced costs, enabling cross-border participation from Malawi and Mozambique.',
        partners: ['SCCI', 'CRS'],
        evidence: ['Digital curriculum', 'Tripled enrollment', 'Cross-border trainees'],
        methods: ['Digital facilitation', 'Instructional design', 'Remote learning'],
        timeline: '2020-2021',
        budget_scope: 'Digital Transition Tier',
        key_deliverables: ['LMS configuration', 'Blended module rollout', 'Regional onboarding'],
      },
    ],
  },
  {
    name: 'Zimbabwe',
    code: 'ZW',
    region: 'Southern Africa',
    projects: 5,
    engagement: 53000,
    overview: 'Zimbabwe sits in the southern portfolio with a mix of market learning, seed access, and practical coordination work.',
    focus: ['Market access', 'Training', 'Regional learning'],
    impact: ['Shared regional methods', 'Practical advisory support', 'Better network building'],
    locations: ['Harare', 'Bulawayo', 'Masvingo'],
    stats: [
      { label: 'Active projects', value: '5' },
      { label: 'Engagement', value: '53K+' },
      { label: 'Regional links', value: 'Strong' },
    ],
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    region: 'Southern Africa',
    projects: 5,
    engagement: 44000,
    overview: 'Mozambique is framed as a logistics and market-access market where cross-border learning matters.',
    focus: ['Supply chain', 'Market access', 'Regional learning'],
    impact: ['Better logistics thinking', 'Field learning', 'Distribution support'],
    locations: ['Maputo', 'Beira', 'Nampula'],
    stats: [
      { label: 'Active projects', value: '5' },
      { label: 'Engagement', value: '44K+' },
      { label: 'Corridors', value: '3' },
    ],
  },
  {
    name: 'Senegal',
    code: 'SN',
    region: 'West Africa',
    projects: 5,
    engagement: 50000,
    overview: 'Senegal supports market analysis and youth-focused learning inside the West Africa portfolio.',
    focus: ['Youth engagement', 'Markets', 'Association support'],
    impact: ['Better market visibility', 'Youth-centered learning', 'More practical programming'],
    locations: ['Dakar', 'Thiès', 'Saint-Louis'],
    stats: [
      { label: 'Active projects', value: '5' },
      { label: 'Engagement', value: '50K+' },
      { label: 'Market studies', value: '2' },
    ],
  },
  {
    name: 'Burkina Faso',
    code: 'BF',
    region: 'West Africa',
    projects: 4,
    engagement: 42000,
    overview: 'Burkina Faso is used as a West African reference market for production and farmer-school style support.',
    focus: ['Production systems', 'Education', 'Resilience'],
    impact: ['Better local learning', 'Improved seed multiplication', 'Strong farmer linkages'],
    locations: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'],
    stats: [
      { label: 'Active projects', value: '4' },
      { label: 'Engagement', value: '42K+' },
      { label: 'Learning sites', value: '3' },
    ],
  },
  {
    name: 'Mali',
    code: 'ML',
    region: 'West Africa',
    projects: 4,
    engagement: 36000,
    overview: 'Mali reflects the portfolio’s attention to regional trade, nutrition, and practical seed support.',
    focus: ['Trade', 'Nutrition', 'Food security'],
    impact: ['Regional coordination', 'Practical systems thinking', 'Food-security framing'],
    locations: ['Bamako', 'Sikasso', 'Ségou'],
    stats: [
      { label: 'Active projects', value: '4' },
      { label: 'Engagement', value: '36K+' },
      { label: 'Markets', value: 'Regional' },
    ],
  },
  {
    name: 'Ghana',
    code: 'GH',
    region: 'West Africa',
    projects: 6,
    engagement: 73000,
    overview: 'Ghana connects university training, seed business management, and association support.',
    focus: ['Digital support', 'Training', 'Business management'],
    impact: ['Stronger graduate capacity', 'Practical sector links', 'Better business tools'],
    locations: ['Accra', 'Kumasi', 'Tamale'],
    stats: [
      { label: 'Active projects', value: '6' },
      { label: 'Engagement', value: '73K+' },
      { label: 'Training cohorts', value: 'Multiple' },
    ],
  },
  {
    name: 'Congo',
    geoName: 'Dem. Rep. Congo',
    code: 'CD',
    region: 'Central Africa',
    projects: 6,
    engagement: 66000,
    overview: 'The DRC portfolio combines formal seed sector research with bilingual company support.',
    focus: ['Research', 'Logistics', 'Quality assurance'],
    impact: ['Better seed sector visibility', 'Practical bilingual support', 'Regional market insight'],
    locations: ['Kinshasa', 'Goma', 'Lubumbashi'],
    stats: [
      { label: 'Active projects', value: '6' },
      { label: 'Engagement', value: '66K+' },
      { label: 'Languages', value: '2' },
    ],
    projectBlueprints: [
      {
        title: 'Formal seed sector status study',
        location: 'Eastern and Southern DRC',
        summary: 'Profiled the status of the formal seed sector in Eastern and Southern DRC to identify systemic bottlenecks.',
        outcome: 'Provided strong recommendations to improve the system and created a practical base for reform discussions.',
        partners: ['Seed sector actors', 'Researchers'],
        evidence: ['Status report', 'Gap analysis', 'Policy recommendations'],
        methods: ['Field research', 'Stakeholder interviews', 'Evidence synthesis'],
        timeline: '2021-2022',
        budget_scope: 'Research Tier',
        key_deliverables: ['Comprehensive bottleneck report', 'Policy roadmap', 'Stakeholder alignment brief'],
      },
      {
        title: 'Bilingual Seed Enterprise Training',
        location: 'Goma',
        summary: 'Delivered bilingual (English and French) training to 15 seed companies and agrodealers focusing on business development and quality assurance.',
        outcome: 'Equipped emerging companies with practical tools adapted to the Eastern and Southern DRC market context.',
        partners: ['Seed companies', 'Agrodealers'],
        evidence: ['Bilingual training materials', 'Case studies', 'Participant action plans'],
        methods: ['Enterprise coaching', 'Quality assurance training', 'Case-based learning'],
        timeline: '2022-2023',
        budget_scope: 'Enterprise Tier',
        key_deliverables: ['Translated SOPs', 'Field coaching logs', 'Enterprise health checks'],
      },
    ],
  },
  {
    name: 'Nigeria',
    code: 'NG',
    region: 'West Africa',
    projects: 6,
    engagement: 98000,
    overview: 'Nigeria is used as a large-scale West African market for enterprise support and association building.',
    focus: ['Enterprise strengthening', 'Association growth', 'Regional scale'],
    impact: ['Broader enterprise learning', 'Stronger professional networks', 'Regional exchange'],
    locations: ['Abuja', 'Kano', 'Ibadan'],
    stats: [
      { label: 'Active projects', value: '6' },
      { label: 'Engagement', value: '98K+' },
      { label: 'Scale', value: 'Large' },
    ],
  },
  {
    name: 'South Sudan',
    geoName: 'S. Sudan',
    code: 'SS',
    region: 'East Africa',
    projects: 3,
    engagement: 28000,
    overview: 'South Sudan reflects recovery-oriented seed support and resilience programming.',
    focus: ['Recovery', 'Food security', 'Resilience'],
    impact: ['Emergency-aware programming', 'Practical support', 'Regional visibility'],
    locations: ['Juba', 'Wau', 'Malakal'],
    stats: [
      { label: 'Active projects', value: '3' },
      { label: 'Engagement', value: '28K+' },
      { label: 'Focus', value: 'Recovery' },
    ],
  },
  {
    name: 'Burundi',
    code: 'BI',
    region: 'East Africa',
    projects: 4,
    engagement: 30000,
    overview: 'Burundi gets targeted training and business development support for emerging seed firms.',
    focus: ['Emerging companies', 'Training', 'Business development'],
    impact: ['Stronger technical capacity', 'French and English support', 'Practical coaching'],
    locations: ['Bujumbura', 'Gitega', 'Ngozi'],
    stats: [
      { label: 'Active projects', value: '4' },
      { label: 'Engagement', value: '30K+' },
      { label: 'Languages', value: '2' },
    ],
    projectBlueprints: [
      {
        title: 'Emerging Enterprise Training',
        location: 'Bujumbura',
        summary: 'Delivered targeted training and business development support to emerging seed companies in both English and French.',
        outcome: 'Strengthened technical capacity and operational sustainability for seed enterprises.',
        partners: ['Emerging seed companies', 'Technical trainers'],
        evidence: ['Bilingual training materials', 'Business plans', 'Agronomic protocols'],
        methods: ['Training', 'Coaching', 'Peer learning'],
        timeline: '2021-2023',
        budget_scope: 'Enterprise Tier',
        key_deliverables: ['Custom enterprise blueprints', 'Quality assurance workshops'],
      },
      {
        title: 'Seed Association Learning Trip',
        location: 'Bujumbura',
        summary: 'Facilitated a learning trip for members of the Burundi seed association to Kenya to observe mature industry practices.',
        outcome: 'Exposed association leaders to advanced governance, advocacy, and quality assurance methods.',
        partners: ['Burundi Seed Association', 'STAK (Kenya)'],
        evidence: ['Exchange visit report', 'Shared governance tools', 'Action plans'],
        methods: ['Learning trip', 'Benchmarking', 'Convening'],
        timeline: '2022',
        budget_scope: 'Regional Integration Tier',
        key_deliverables: ['Post-trip implementation roadmap', 'Governance restructuring protocol'],
      }
    ],
  },
  {
    name: 'Liberia',
    code: 'LR',
    region: 'West Africa',
    projects: 3,
    engagement: 26000,
    overview: 'Liberia is represented as an early-stage market where partner mapping and seed system learning matter.',
    focus: ['Market mapping', 'Learning', 'Partnerships'],
    impact: ['Early-stage system insight', 'Practical partner support', 'Regional learning'],
    locations: ['Monrovia', 'Gbarnga', 'Harper'],
    stats: [
      { label: 'Active projects', value: '3' },
      { label: 'Engagement', value: '26K+' },
      { label: 'Market maturity', value: 'Emerging' },
    ],
  },
  {
    name: 'South Africa',
    code: 'ZA',
    region: 'Southern Africa',
    projects: 4,
    engagement: 41000,
    overview: 'South Africa is used as a southern benchmark market for learning, convening, and evidence exchange.',
    focus: ['Benchmarking', 'Learning trips', 'Regional coordination'],
    impact: ['Southern Africa perspective', 'Practical comparisons', 'Partner convening'],
    locations: ['Pretoria', 'Johannesburg', 'Cape Town'],
    stats: [
      { label: 'Active projects', value: '4' },
      { label: 'Engagement', value: '41K+' },
      { label: 'Benchmarks', value: 'Regional' },
    ],
  },
  {
    name: 'Sierra Leone',
    code: 'SL',
    region: 'West Africa',
    projects: 3,
    engagement: 25000,
    overview: 'Sierra Leone is treated as an emerging seed market for practical coaching and field learning.',
    focus: ['Coaching', 'Field learning', 'Market growth'],
    impact: ['Practical support', 'Emerging market visibility', 'Regional knowledge transfer'],
    locations: ['Freetown', 'Bo', 'Kenema'],
    stats: [
      { label: 'Active projects', value: '3' },
      { label: 'Engagement', value: '25K+' },
      { label: 'Market stage', value: 'Emerging' },
    ],
  },
]

const countriesData = Object.fromEntries(countrySeeds.map((country) => [country.name, country])) as Record<string, DetailedCountryRecord>
const countriesByGeoName = Object.fromEntries(countrySeeds.map((country) => [country.geoName ?? country.name, country])) as Record<string, DetailedCountryRecord>

const createGenericProjects = (country: DetailedCountryRecord): CountryProject[] => {
  const firstLocation = country.locations[0] ?? country.name
  const secondLocation = country.locations[1] ?? firstLocation
  const thirdLocation = country.locations[2] ?? country.region
  const focusA = country.focus[0] ?? country.region
  const focusB = country.focus[1] ?? focusA

  return [
    {
      title: `${country.name} portfolio review`,
      location: firstLocation,
      summary: country.overview,
      outcome: `${country.projects} initiatives coordinated around ${focusA.toLowerCase()}.`,
      partners: ['Local ministries', 'Seed associations', 'Private partners'],
      evidence: ['Country brief', 'Field notes', 'Stakeholder map'],
      methods: ['Desk review', 'Field visits', 'Stakeholder interviews'],
      timeline: 'Ongoing',
      budget_scope: 'Review Phase',
      key_deliverables: ['Annual system health report', 'Stakeholder map']
    },
    {
      title: `${country.name} implementation support`,
      location: secondLocation,
      summary: `Operational support focused on ${focusB.toLowerCase()} and practical delivery in ${secondLocation}.`,
      outcome: `Built on ${formatFarmers(country.engagement)} farmer-level and partner engagement touchpoints.`,
      partners: ['Implementing partners', 'Extension officers', 'Private sector'],
      evidence: ['Partner sessions', 'Training notes', 'Delivery checklists'],
      methods: ['Coaching', 'Work planning', 'Technical support'],
      timeline: '2020-Present',
      budget_scope: 'Execution Phase',
      key_deliverables: ['Quarterly training sprints', 'Local partner integration']
    },
    {
      title: `${country.name} learning and market support`,
      location: thirdLocation,
      summary: `Market access, regulatory learning, and field feedback shaped the ${country.region} program.`,
      outcome: `Reinforced sector coordination across the wider ${country.region.toLowerCase()} network.`,
      partners: ['Sector actors', 'Development partners', 'Regional peers'],
      evidence: ['Learning exchange', 'Workshop outputs', 'Action logs'],
      methods: ['Convening', 'Benchmarking', 'Advisory support'],
      timeline: '2022-2024',
      budget_scope: 'Advisory Phase',
      key_deliverables: ['Regional synthesis document', 'Shared toolkit deployment']
    },
  ]
}

const buildCountryProjectsOriginal = (country: DetailedCountryRecord): CountryProject[] => country.projectBlueprints ?? createGenericProjects(country)
*/

export default function InteractiveMap() {
  const t = useTranslations('InteractiveMap')
  const locale = useLocale()
  
  const countrySeeds = useMemo(() => getCountrySeeds(locale), [locale])
  const countriesData = useMemo(() => Object.fromEntries(countrySeeds.map((c) => [c.name, c])) as Record<string, DetailedCountryRecord>, [countrySeeds])
  const countriesByGeoName = useMemo(() => Object.fromEntries(countrySeeds.map((c) => [c.geoName ?? c.name, c])) as Record<string, DetailedCountryRecord>, [countrySeeds])
  
  const buildCountryProjects = useCallback((country: DetailedCountryRecord): CountryProject[] => country.projectBlueprints ?? createGenericProjects(country, locale), [locale])
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const desktopDossierRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<DetailedCountryRecord | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [hoveredName, setHoveredName] = useState<string | null>(null)

  const mapboxMapRef = useRef<any>(null)

  const updateTooltipPos = useCallback((pos: { x: number; y: number }) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
    if (desktopDossierRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      if (!isMobile) {
        desktopDossierRef.current.style.transform = `translate3d(${pos.x + 40}px, ${pos.y - 100}px, 0)`
      } else {
        desktopDossierRef.current.style.transform = 'none'
      }
    }
  }, [])

  const activeProjects = useMemo(
    () => (selectedCountry ? buildCountryProjects(selectedCountry) : []),
    [selectedCountry, buildCountryProjects]
  )
  
  const closeCountryOverlay = () => {
    setSelectedCountry(null)
    setSelectedProjectIndex(null)
    setHoveredName(null)
    if (mapboxMapRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      mapboxMapRef.current.easeTo({
        center: [17.0, -2.0],
        zoom: getOptimalZoom(),
        pitch: 0,
        duration: 1000,
        essential: true
      });
    }
  }

  const handleCountryClickWrapper = (countryCode: string | null) => {
    if (!countryCode) {
      closeCountryOverlay()
      return
    }
    
    const country = Object.values(countriesData).find(c => c.code === countryCode)
    if (country) {
      setSelectedCountry(country)
      setSelectedProjectIndex(null)
      setHoveredName(null)
    }
  }

  return (
    <section className="w-full relative bg-primary-ivory h-[100vh] h-[100dvh] min-h-[550px] md:min-h-[750px] lg:min-h-[850px] flex flex-col overflow-hidden">
      {/* Main Interactive Workspace — full bleed, edge to edge */}
      <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden" ref={containerRef}>
        


        {/* Map Canvas - scales with flex-1 */}
        <div className="flex-1 relative h-full w-full transition-all duration-500 ease-in-out">
          <div className="absolute inset-0 z-0">
            <InteractiveMapbox 
              onMapReady={(m) => mapboxMapRef.current = m}
              onCountryClick={handleCountryClickWrapper}
              setHoveredName={setHoveredName}
              setTooltipPos={updateTooltipPos}
              selectedCountryName={selectedCountry?.code}
              activeProjects={activeProjects}
              selectedProjectIndex={selectedProjectIndex}
              setSelectedProjectIndex={setSelectedProjectIndex}
              cityCoordinates={cityCoordinates}
            />
          </div>

          <div
            ref={tooltipRef}
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              pointerEvents: 'none',
              zIndex: 50
            }}
          >
            <AnimatePresence>
              {!selectedCountry && hoveredName && (
                <motion.div
                  layoutId="country-dossier"
                  initial={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: 'center' }}
                  className="absolute top-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-md border border-white/10 bg-deep-forest/40 text-white shadow-md flex items-center justify-center"
                >
                  {hoveredName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dossier — Bottom Sheet on Mobile, Floating Overlay on Desktop */}
        <div 
          ref={desktopDossierRef} 
          className="absolute inset-0 pointer-events-none z-30 lg:left-0 lg:top-0 lg:inset-auto lg:w-105 lg:h-auto"
        >
          <AnimatePresence>
            {selectedCountry && (
              <motion.div
                layoutId="country-dossier"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
                className={[
                  'pointer-events-auto',
                  // Mobile: bottom sheet — fills width, sits at bottom
                  'absolute bottom-0 left-0 right-0 h-[calc(50vh+100px)]',
                  'rounded-t-3xl',
                  // Desktop: floating overlay card positioned right next to the selected country (which is centered)
                  'lg:relative lg:bottom-auto lg:left-auto lg:right-auto',
                  'lg:w-full lg:h-auto lg:max-h-[85vh]',
                  'lg:rounded-2xl',
                  // Shared glass styling matching the label
                  'bg-deep-forest/80 lg:bg-deep-forest/70 backdrop-blur-xl',
                  'border border-white/20',
                  'shadow-2xl',
                  'flex flex-col overflow-hidden',
                ].join(' ')}
              >
              {/* Drag indicator — mobile only */}
              <div className="lg:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="shrink-0 flex items-start justify-between gap-3 px-6 pt-4 lg:pt-6 pb-4 relative">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                    <Globe size={11} className="opacity-60" />
                    {selectedCountry.region}
                  </div>
                  <h3 className="text-white text-2xl lg:text-[28px] font-serif tracking-tight pb-2 leading-tight font-bold flex items-center gap-3">
                    <img 
                      src={`/flags/${selectedCountry.code.toLowerCase()}.png`}
                      alt={`${selectedCountry.code} flag`} 
                      className="w-8 h-8 lg:w-10 lg:h-10 object-contain shrink-0 drop-shadow-sm"
                    />
                    {selectedCountry.name}
                  </h3>
                </div>
                <button
                  onClick={closeCountryOverlay}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50 transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110"
                  aria-label="Close country dossier"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Subtle separator */}
              <div className="mx-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 pt-5 pb-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-6">

                  {/* Work Done Details */}
                  <div className="pt-2">
                    {/* Work Done Card */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                      <div className="text-sm font-bold uppercase tracking-widest text-accent-gold/90 mb-4 flex items-center gap-2">
                        <Target size={16} /> {t('work_done') || 'Work Done'}
                      </div>
                      <ul className="space-y-3">
                        {(selectedCountry.workDone || []).map((work, i) => (
                          <li key={`work-${i}`} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 mt-1.5 shrink-0" />
                            <span>{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      </div>
    </section>
  )
}
