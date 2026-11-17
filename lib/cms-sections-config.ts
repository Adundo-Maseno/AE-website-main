export type PageTabKey = 'home' | 'about' | 'our-work' | 'our-impact' | 'contact'

export interface SectionConfig {
  key: string
  page: PageTabKey
  title: string
  desc: string
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasContent?: boolean
  hasMedia?: boolean
  subtitleLabel?: string
  contentLabel?: string
  mediaLabel?: string
}

export const SECTION_TABS: { id: PageTabKey; label: string }[] = [
  { id: 'home', label: 'Home Page' },
  { id: 'about', label: 'About Us' },
  { id: 'our-work', label: 'Our Work & 6 Pillars' },
  { id: 'our-impact', label: 'Our Impact' },
  { id: 'contact', label: 'Contact Us' },
]

export const SECTION_CONFIGS: SectionConfig[] = [
  // ── HOME PAGE ──
  {
    key: 'home_hero',
    page: 'home',
    title: 'Home Hero Headline & Tagline',
    desc: 'The prominent editorial headline and sub-statement displayed on the homepage hero.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    contentLabel: 'CTA Button Label',
    subtitleLabel: 'Hero Subtitle / Description',
  },
  {
    key: 'why_agri_header',
    page: 'home',
    title: '"Why Agri Experience" Header & Tagline',
    desc: 'The title and category pill introducing the advantage section.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Section Eyebrow / Tagline (e.g. Our Advantage)',
  },
  {
    key: 'beliefs_header',
    page: 'home',
    title: '"What We Believe" Header',
    desc: 'The section heading for core agricultural philosophy.',
    hasTitle: true,
  },
  {
    key: 'partners_header',
    page: 'home',
    title: '"Our Partners" Header & Narrative',
    desc: 'Heading and descriptive lead text above the institutional partner marquee.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Partnership Impact Narrative',
  },
  {
    key: 'home_cta',
    page: 'home',
    title: 'Home Page CTA Banner',
    desc: 'Bottom conversion banner inviting partnerships on the home page.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Button Label',
  },

  // ── ABOUT PAGE ──
  {
    key: 'about_hero',
    page: 'about',
    title: 'About Page Hero Headline',
    desc: 'The header title and lead paragraph introducing the organisation on /about.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Lead Introduction Paragraph',
  },
  {
    key: 'about_vision',
    page: 'about',
    title: 'Our Vision Statement',
    desc: 'The overarching organizational vision for African agriculture.',
    hasTitle: true,
    hasContent: true,
    contentLabel: 'Vision Statement Body',
  },
  {
    key: 'about_mission',
    page: 'about',
    title: 'Our Mission Statement',
    desc: 'The core operational mission driving Agri Experience interventions.',
    hasTitle: true,
    hasContent: true,
    contentLabel: 'Mission Statement Body',
  },
  {
    key: 'about_goal',
    page: 'about',
    title: 'Our Strategic Goal',
    desc: 'The strategic impact goal and SDG commitments.',
    hasTitle: true,
    hasContent: true,
    contentLabel: 'Goal Statement Body',
  },
  {
    key: 'expertise_header',
    page: 'about',
    title: '"Our Expertise" Header & Intro',
    desc: 'Heading and narrative introducing the 5 service domains on /about.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Scope of Expertise Summary',
  },
  {
    key: 'about_cta',
    page: 'about',
    title: 'About Page CTA Banner',
    desc: 'Bottom conversion banner inviting inquiries on /about.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Button Label',
  },

  // ── OUR WORK & 6 PILLARS ──
  {
    key: 'our_work_hero',
    page: 'our-work',
    title: 'Our Work: Main Overview Hero',
    desc: 'The primary headline and lead narrative on the main /our-work portal.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Overview Subtitle / Narrative',
  },
  {
    key: 'digital_platforms_hero',
    page: 'our-work',
    title: 'Pillar 1: Digital Platforms Hero',
    desc: 'Hero headline and subtitle on /our-work/digital-platforms.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'technical_studies_hero',
    page: 'our-work',
    title: 'Pillar 2: Technical Studies Hero',
    desc: 'Hero headline and subtitle on /our-work/technical-studies.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'project_implementation_hero',
    page: 'our-work',
    title: 'Pillar 3: Project Implementation Hero',
    desc: 'Hero headline and subtitle on /our-work/project-implementation.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'client_advisory_hero',
    page: 'our-work',
    title: 'Pillar 4: Client Advisory Hero',
    desc: 'Hero headline and subtitle on /our-work/client-advisory.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'capacity_building_hero',
    page: 'our-work',
    title: 'Pillar 5: Capacity Building Hero',
    desc: 'Hero headline and subtitle on /our-work/capacity-building.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'stakeholder_convenings_hero',
    page: 'our-work',
    title: 'Pillar 6: Stakeholder Convenings Hero',
    desc: 'Hero headline and subtitle on /our-work/stakeholder-convenings.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },

  // ── OUR IMPACT ──
  {
    key: 'our_impact_hero',
    page: 'our-impact',
    title: 'Our Impact: Hero Headline',
    desc: 'Headline and introduction above the interactive Pan-African impact map.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Impact Lead Subtitle',
  },
  {
    key: 'our_impact_sdgs',
    page: 'our-impact',
    title: 'Sustainable Development Goals (SDGs) Alignment Header',
    desc: 'Section headline, category tag, and narrative introducing the SDG alignment cards.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'Header Eyebrow Tagline (e.g. Strategic Alignment)',
    contentLabel: 'Narrative Lead Description',
  },
  {
    key: 'our_impact_cta',
    page: 'our-impact',
    title: 'Our Impact: Bottom CTA Banner',
    desc: 'Call-to-action banner inviting partners to collaborate on seed systems.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Primary Button Label',
  },

  // ── CONTACT US ──
  {
    key: 'contact_hero',
    page: 'contact',
    title: 'Contact Us: Hero Headline',
    desc: 'Headline and welcome subtitle on /contact.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Welcome Subtitle',
  },
  {
    key: 'contact_info',
    page: 'contact',
    title: 'Regional Headquarters & Inquiry Card',
    desc: 'Physical office address, general contact email, and office location card title.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'Physical Office Address',
    contentLabel: 'Inquiry Email Address',
  },
]
