# Graph Report - AE-website-main  (2026-11-16)

## Corpus Check
- 381 files · ~182,943 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 883 nodes · 2263 edges · 59 communities (47 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Admin Philosophy, Insights & Form Modals
- Media Upload, Contact & Email Pipeline
- Impact Map Country Data & Services
- Interactive Mapbox Canvas & Controls
- Admin Content Pages & Sections Config
- Dev Dependencies & Tooling
- Map Search & Dialog Primitives
- Admin Dashboard & DB Seeding
- Runtime Package Dependencies
- Root Localized Layout, Fonts & Footer
- Liquid Glass Shader Effects
- Protected Admin CRUD API Routes
- Shadcn UI Registry Config
- TypeScript Compiler Configuration
- Field Gallery Service & Showcase
- Localized Metadata & Privacy Pages
- pnpm Build & Workspace Rules
- Our Work Pillar Client Views & Admin
- Admin Session & JWT Auth
- Page Sections API & Work Overview
- About Page & Expertise Bento Grid
- Beliefs Service & API Routes
- Insights Service & API Routes
- Section Layouts & Structured JSON-LD
- Home Page Data Hydration
- Partners Service & API Routes
- Site Settings, SEO & Terms Routes
- Technical Studies & Scroll Accordion
- Expertise Pillars Service & API
- Gallery Items Service & API Routes
- Why-Agri Service & API Routes
- Resource Library & PDF Preview
- Client Advisory & Projects API
- Package Build & Dev Scripts
- Next.js Config & Deployment Docs
- Map Country Service & ID Resolution
- Projects Service & ID Resolution
- Team Service & ID Resolution
- Public Team Showcase & Bio Cards
- Header Navigation & i18n Routing
- Digital Platforms Pillar Page
- Project Implementation Pillar Page
- Stakeholder Convenings Pillar Page
- Package Version Overrides
- Package Dependency Resolutions
- ESLint Next.js Configuration
- Package Manager Engine Spec
- PostCSS Tailwind Configuration
- Image Optimization Shell Script

## God Nodes (most connected - your core abstractions)
1. `next` - 94 edges
2. `getSession()` - 84 edges
3. `react` - 80 edges
4. `lucide-react` - 60 edges
5. `next-intl` - 47 edges
6. `isDatabaseConnected()` - 39 edges
7. `Link` - 36 edges
8. `RollingText()` - 34 edges
9. `stripManagedFields()` - 29 edges
10. `getPageSections()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Editorial Design System` --references--> `playfairDisplay`  [EXTRACTED]
  D:/AE-website-main/README.md → app/[locale]/layout.tsx
- `Editorial Design System` --references--> `dmSans`  [EXTRACTED]
  D:/AE-website-main/README.md → app/[locale]/layout.tsx
- `Next.js Agent Guidelines & Rules` --references--> `RootLayout()`  [EXTRACTED]
  D:/AE-website-main/AGENTS.md → app/[locale]/layout.tsx
- `ESSETA Seed Program Initiative` --references--> `countrySeeds`  [EXTRACTED]
  D:/AE-website-main/README.md → components/country-data.ts
- `Agri Experience Organization` --references--> `Footer()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/footer.tsx

## Import Cycles
- None detected.

## Communities (59 total, 12 thin omitted)

### Community 0 - "Admin Philosophy, Insights & Form Modals"
Cohesion: 0.06
Nodes (36): AdminBeliefsPage(), AdminExpertisePage(), AdminInsightsPage(), AdminLayout(), metadata, AdminMapPage(), AdminResourcesPage(), CATEGORIES (+28 more)

### Community 1 - "Media Upload, Contact & Email Pipeline"
Cohesion: 0.06
Nodes (37): GET(), scanAllUploads(), scanDirectory(), formatBytes(), GET(), PdfFileItem, ALLOWED_MIME_TYPES, POST() (+29 more)

### Community 2 - "Impact Map Country Data & Services"
Cohesion: 0.08
Nodes (38): GET(), POST(), MapPage(), revalidate, OurImpactPage(), revalidate, CountryFormModalProps, cityCoordinates (+30 more)

### Community 3 - "Interactive Mapbox Canvas & Controls"
Cohesion: 0.10
Nodes (33): getCategoryIcon(), InteractiveMapbox(), InteractiveMapboxProps, SelectedLocation, MapActiveProjectFlyTo(), MapActiveProjectFlyToProps, MapAutoCenter(), MapAutoCenterProps (+25 more)

### Community 4 - "Admin Content Pages & Sections Config"
Cohesion: 0.08
Nodes (33): AdminGalleryPage(), CATEGORIES, shouldUnoptimize(), AdminPartnersPage(), CATEGORY_LABELS, AdminSectionsPage(), SectionRecord, AdminTeamPage() (+25 more)

### Community 5 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (35): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3 (+27 more)

### Community 6 - "Map Search & Dialog Primitives"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 7 - "Admin Dashboard & DB Seeding"
Cohesion: 0.22
Nodes (16): AdminDashboardPage(), SeedButton(), countrySeeds, globalForPrisma, isDatabaseConnected(), prisma, PublicDownload, publicDownloads (+8 more)

### Community 8 - "Runtime Package Dependencies"
Cohesion: 0.08
Nodes (26): dependencies, bcryptjs@^3.0.3, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, jose@^6.2.16, lucide-react@^0.564.0, mapbox-gl@^3.24.0 (+18 more)

### Community 9 - "Root Localized Layout, Fonts & Footer"
Cohesion: 0.13
Nodes (18): bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, CookieToast(), Footer(), FooterProps (+10 more)

### Community 10 - "Liquid Glass Shader Effects"
Cohesion: 0.13
Nodes (15): generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter(), LiquidGlassProps, fragmentShaders, FragmentShaderType, length() (+7 more)

### Community 11 - "Protected Admin CRUD API Routes"
Cohesion: 0.18
Nodes (16): GET(), DELETE(), PUT(), GET(), POST(), POST(), GET(), POST() (+8 more)

### Community 12 - "Shadcn UI Registry Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 13 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 14 - "Field Gallery Service & Showcase"
Cohesion: 0.16
Nodes (15): GalleryPage(), revalidate, easeInCubic(), easeOutCirc(), OfficePlantsGallery(), PlantFrame(), plantImages, SETTLED_POSITIONS (+7 more)

### Community 15 - "Localized Metadata & Privacy Pages"
Cohesion: 0.16
Nodes (6): PrivacyPage(), getPathname, redirect, routing, config, next-intl

### Community 16 - "pnpm Build & Workspace Rules"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, prisma, @prisma/client, @prisma/engines, sharp, @swc/core, unrs-resolver (+8 more)

### Community 17 - "Our Work Pillar Client Views & Admin"
Cohesion: 0.18
Nodes (12): AdminProjectsPage(), PILLARS, CapacityBuildingClient(), CapacityBuildingClientProps, CapacityBuildingPage(), revalidate, ClientAdvisoryClientProps, TechnicalStudiesClientProps (+4 more)

### Community 18 - "Admin Session & JWT Auth"
Cohesion: 0.23
Nodes (11): POST(), POST(), AdminSessionPayload, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, JWT_SECRET, SESSION_COOKIE_NAME, signSessionToken() (+3 more)

### Community 19 - "Page Sections API & Work Overview"
Cohesion: 0.21
Nodes (11): GET(), POST(), ContactPage(), revalidate, OurWorkPage(), revalidate, ContactClientContent(), ContactClientContentProps (+3 more)

### Community 20 - "About Page & Expertise Bento Grid"
Cohesion: 0.23
Nodes (13): AboutPage(), revalidate, AboutContent(), AboutContentProps, BentoCard(), BentoCardProps, ServicePillar, ServicesBentoGrid() (+5 more)

### Community 21 - "Beliefs Service & API Routes"
Cohesion: 0.30
Nodes (12): DELETE(), PUT(), GET(), POST(), createBelief(), deleteBelief(), ensureSeeded(), getAllBeliefsAdmin() (+4 more)

### Community 22 - "Insights Service & API Routes"
Cohesion: 0.27
Nodes (12): DELETE(), PUT(), GET(), POST(), createInsight(), deleteInsight(), ensureSeeded(), getInsights() (+4 more)

### Community 23 - "Section Layouts & Structured JSON-LD"
Cohesion: 0.23
Nodes (6): AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), BreadcrumbJsonLd(), ResourcesJsonLd()

### Community 24 - "Home Page Data Hydration"
Cohesion: 0.21
Nodes (12): HomePage(), revalidate, HomeContent(), WhyAgriExperience(), getBeliefs(), getPartners(), getWhyAgriCards(), gsap@^3.15.0 (+4 more)

### Community 25 - "Partners Service & API Routes"
Cohesion: 0.30
Nodes (11): DELETE(), PUT(), GET(), POST(), createPartner(), deletePartner(), ensureSeeded(), getAllPartnersAdmin() (+3 more)

### Community 26 - "Site Settings, SEO & Terms Routes"
Cohesion: 0.20
Nodes (6): GET(), PUT(), defaultSiteSettings, getSiteSettings(), updateSiteSettings(), next

### Community 27 - "Technical Studies & Scroll Accordion"
Cohesion: 0.26
Nodes (9): NewsletterPage(), revalidate, TechnicalStudiesPage(), TechnicalStudiesClient(), DesktopStickyAccordion(), MobileFallbackAccordion(), ScrollAccordion(), RollingText() (+1 more)

### Community 28 - "Expertise Pillars Service & API"
Cohesion: 0.23
Nodes (11): DELETE(), PUT(), GET(), POST(), createExpertisePillar(), deleteExpertisePillar(), ensureSeeded(), getAllExpertisePillarsAdmin() (+3 more)

### Community 29 - "Gallery Items Service & API Routes"
Cohesion: 0.31
Nodes (10): DELETE(), PUT(), GET(), POST(), createGalleryItem(), deleteGalleryItem(), ensureSeeded(), resolveGalleryItemId() (+2 more)

### Community 30 - "Why-Agri Service & API Routes"
Cohesion: 0.23
Nodes (11): DELETE(), PUT(), GET(), POST(), createWhyAgriCard(), deleteWhyAgriCard(), ensureSeeded(), getAllWhyAgriCardsAdmin() (+3 more)

### Community 31 - "Resource Library & PDF Preview"
Cohesion: 0.24
Nodes (10): ResourcesPage(), revalidate, PdfPreview(), categories, PdfPreview, ResourcesContent(), getResources(), react-pdf@^10.4.1 (+2 more)

### Community 32 - "Client Advisory & Projects API"
Cohesion: 0.31
Nodes (7): GET(), POST(), ClientAdvisoryClient(), ClientAdvisoryPage(), revalidate, createProject(), getProjects()

### Community 33 - "Package Build & Dev Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 34 - "Next.js Config & Deployment Docs"
Cohesion: 0.32
Nodes (6): Next.js Agent Guidelines & Rules, nextConfig, withNextIntl, Hostinger Production Deployment, High-Performance Motion Design, Next.js 16 Web Application Stack

### Community 35 - "Map Country Service & ID Resolution"
Cohesion: 0.39
Nodes (7): DELETE(), PUT(), deleteCountry(), ensureSeeded(), resolveCountryId(), seedGuard, updateCountry()

### Community 36 - "Projects Service & ID Resolution"
Cohesion: 0.39
Nodes (7): DELETE(), PUT(), deleteProject(), ensureSeeded(), resolveProjectId(), seedGuard, updateProject()

### Community 37 - "Team Service & ID Resolution"
Cohesion: 0.39
Nodes (7): DELETE(), PUT(), deleteTeamMember(), ensureSeeded(), resolveTeamMemberId(), seedGuard, updateTeamMember()

### Community 38 - "Public Team Showcase & Bio Cards"
Cohesion: 0.36
Nodes (6): OurTeamPage(), revalidate, OurTeamContent(), STATIC_IMAGE_CONFIG, TeamCard, getTeamMembers()

### Community 39 - "Header Navigation & i18n Routing"
Cohesion: 0.43
Nodes (7): AnimatedHamburger(), Header(), navItems, triggerLanguageSwitch(), LiquidGlass(), usePathname, useRouter

### Community 40 - "Digital Platforms Pillar Page"
Cohesion: 0.47
Nodes (4): DigitalPlatformsClient(), DigitalPlatformsClientProps, DigitalPlatformsPage(), revalidate

### Community 41 - "Project Implementation Pillar Page"
Cohesion: 0.47
Nodes (4): ProjectImplementationPage(), revalidate, ProjectImplementationClient(), ProjectImplementationClientProps

### Community 42 - "Stakeholder Convenings Pillar Page"
Cohesion: 0.47
Nodes (4): revalidate, StakeholderConveningsPage(), StakeholderConveningsClient(), StakeholderConveningsClientProps

### Community 43 - "Package Version Overrides"
Cohesion: 0.33
Nodes (6): overrides, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 44 - "Package Dependency Resolutions"
Cohesion: 0.33
Nodes (6): resolutions, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 45 - "ESLint Next.js Configuration"
Cohesion: 0.50
Nodes (3): config, eslint-config-next@16.3.3, eslint-config-next

### Community 47 - "Package Manager Engine Spec"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

## Knowledge Gaps
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Site Settings, SEO & Terms Routes` to `Admin Philosophy, Insights & Form Modals`, `Media Upload, Contact & Email Pipeline`, `Impact Map Country Data & Services`, `Admin Content Pages & Sections Config`, `Dev Dependencies & Tooling`, `Admin Dashboard & DB Seeding`, `Runtime Package Dependencies`, `Root Localized Layout, Fonts & Footer`, `Protected Admin CRUD API Routes`, `Field Gallery Service & Showcase`, `Localized Metadata & Privacy Pages`, `Our Work Pillar Client Views & Admin`, `Admin Session & JWT Auth`, `Page Sections API & Work Overview`, `About Page & Expertise Bento Grid`, `Beliefs Service & API Routes`, `Insights Service & API Routes`, `Section Layouts & Structured JSON-LD`, `Home Page Data Hydration`, `Partners Service & API Routes`, `Technical Studies & Scroll Accordion`, `Expertise Pillars Service & API`, `Gallery Items Service & API Routes`, `Why-Agri Service & API Routes`, `Resource Library & PDF Preview`, `Client Advisory & Projects API`, `Map Country Service & ID Resolution`, `Projects Service & ID Resolution`, `Team Service & ID Resolution`, `Public Team Showcase & Bio Cards`, `Header Navigation & i18n Routing`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Stakeholder Convenings Pillar Page`, `Contact Page Metadata Layout`, `Insights Page Metadata Layout`, `Newsletter Page Metadata Layout`, `Capacity Building Metadata Layout`, `Digital Platforms Metadata Layout`, `Project Implementation Metadata Layout`, `Stakeholder Convenings Metadata Layout`, `Technical Studies Metadata Layout`?**
  _High betweenness centrality (0.306) - this node is a cross-community bridge._
- **Should `Admin Philosophy, Insights & Form Modals` be split into smaller, more focused modules?**
  _Cohesion score 0.055523085914669784 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Interactive Mapbox Canvas & Controls` to `Admin Philosophy, Insights & Form Modals`, `Impact Map Country Data & Services`, `Admin Content Pages & Sections Config`, `Dev Dependencies & Tooling`, `Map Search & Dialog Primitives`, `Admin Dashboard & DB Seeding`, `Runtime Package Dependencies`, `Root Localized Layout, Fonts & Footer`, `Liquid Glass Shader Effects`, `Field Gallery Service & Showcase`, `Localized Metadata & Privacy Pages`, `Our Work Pillar Client Views & Admin`, `Page Sections API & Work Overview`, `About Page & Expertise Bento Grid`, `Section Layouts & Structured JSON-LD`, `Home Page Data Hydration`, `Technical Studies & Scroll Accordion`, `Resource Library & PDF Preview`, `Client Advisory & Projects API`, `Public Team Showcase & Bio Cards`, `Header Navigation & i18n Routing`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Stakeholder Convenings Pillar Page`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Should `Media Upload, Contact & Email Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.0611764705882353 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Admin Philosophy, Insights & Form Modals` to `Impact Map Country Data & Services`, `Interactive Mapbox Canvas & Controls`, `Admin Content Pages & Sections Config`, `Dev Dependencies & Tooling`, `Map Search & Dialog Primitives`, `Admin Dashboard & DB Seeding`, `Runtime Package Dependencies`, `Root Localized Layout, Fonts & Footer`, `Field Gallery Service & Showcase`, `Localized Metadata & Privacy Pages`, `Our Work Pillar Client Views & Admin`, `Page Sections API & Work Overview`, `About Page & Expertise Bento Grid`, `Home Page Data Hydration`, `Technical Studies & Scroll Accordion`, `Resource Library & PDF Preview`, `Client Advisory & Projects API`, `Public Team Showcase & Bio Cards`, `Header Navigation & i18n Routing`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Stakeholder Convenings Pillar Page`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `Impact Map Country Data & Services` be split into smaller, more focused modules?**
  _Cohesion score 0.08309178743961353 - nodes in this community are weakly interconnected._
- **Should `Interactive Mapbox Canvas & Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.10241545893719807 - nodes in this community are weakly interconnected._