# Graph Report - AE-website-main  (2026-11-16)

## Corpus Check
- 380 files · ~184,270 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 893 nodes · 2293 edges · 57 communities (43 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Impact Map Data, Merging & Controls
- Media Upload, Contact & Email Pipeline
- Dev Dependencies & ESLint Config
- Resource Library & PDF Preview
- Pan-African Impact Map & Admin UI
- Root Localized Layout, Fonts & Docs
- Map Search & Dialog Primitives
- Team Service, Roster Admin & Showcase
- Field Gallery Admin & Showcase
- Admin Partners & Sections Config
- Field Insights Admin & Public Showcase
- Runtime Package Dependencies
- Site Header & Language Switcher
- Liquid Glass Shader Effects
- Admin Settings UI, Footer & Why-Agri
- Shadcn UI Registry Config
- Admin Session, JWT & Credentials API
- Projects Service & Capacity Building
- Home & About Page Data Hydration
- TypeScript Compiler Configuration
- Contact Page & About Content
- Admin Dashboard & DB Seeding
- Our Work Pillar Client Views & Admin
- pnpm Build & Workspace Rules
- Protected Admin API Auth Guards
- Beliefs Service & API Routes
- Partners Service & API Routes
- Page Sections API & Client Advisory
- Section Layouts & Structured JSON-LD
- Admin Login & SEO Route Handlers
- Office Plants Motion Gallery
- Site Settings & Feature Flag Persistence
- Admin Expertise UI & Bento Grid
- Package Build & Dev Scripts
- Expertise Pillars Service & ID Resolution
- Why-Agri Service & ID Resolution
- Beliefs Admin Page & Form Modal
- Admin Layout Shell & Navigation
- Digital Platforms Pillar Page
- Project Implementation Pillar Page
- Package Version Overrides
- Package Dependency Resolutions
- Technical Studies Pillar Page
- Package Manager Engine Spec
- PostCSS Tailwind Configuration
- Image Optimization Shell Script

## God Nodes (most connected - your core abstractions)
1. `next` - 95 edges
2. `getSession()` - 85 edges
3. `react` - 80 edges
4. `lucide-react` - 60 edges
5. `next-intl` - 47 edges
6. `isDatabaseConnected()` - 41 edges
7. `Link` - 36 edges
8. `RollingText()` - 34 edges
9. `stripManagedFields()` - 29 edges
10. `getPageSections()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Editorial Design System` --references--> `playfairDisplay`  [EXTRACTED]
  D:/AE-website-main/README.md → app/[locale]/layout.tsx
- `Editorial Design System` --references--> `dmSans`  [EXTRACTED]
  D:/AE-website-main/README.md → app/[locale]/layout.tsx
- `Agri Experience Organization` --references--> `Footer()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/footer.tsx
- `Agri Experience Organization` --references--> `InteractiveMap()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/interactive-map.tsx
- `Editorial Design System` --references--> `LiquidGlass()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/liquid-glass/index.tsx

## Import Cycles
- None detected.

## Communities (57 total, 14 thin omitted)

### Community 0 - "Impact Map Data, Merging & Controls"
Cohesion: 0.07
Nodes (49): MapPage(), revalidate, cityCoordinates, CmsCountryInput, createGenericProjects(), getCountrySeeds(), mergeCountriesWithCms(), parseCountryList() (+41 more)

### Community 1 - "Media Upload, Contact & Email Pipeline"
Cohesion: 0.06
Nodes (37): GET(), scanAllUploads(), scanDirectory(), formatBytes(), GET(), PdfFileItem, ALLOWED_MIME_TYPES, POST() (+29 more)

### Community 2 - "Dev Dependencies & ESLint Config"
Cohesion: 0.07
Nodes (38): config, devDependencies, eslint@10.9.1, eslint-config-next@16.3.3, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0 (+30 more)

### Community 3 - "Resource Library & PDF Preview"
Cohesion: 0.09
Nodes (29): AdminResourcesPage(), CATEGORIES, DELETE(), PUT(), GET(), POST(), ResourcesPage(), revalidate (+21 more)

### Community 4 - "Pan-African Impact Map & Admin UI"
Cohesion: 0.10
Nodes (28): AdminMapPage(), DELETE(), PUT(), GET(), POST(), OurImpactPage(), revalidate, CountryFormModal() (+20 more)

### Community 5 - "Root Localized Layout, Fonts & Docs"
Cohesion: 0.10
Nodes (22): Next.js Agent Guidelines & Rules, bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, CookieToast(), Footer() (+14 more)

### Community 6 - "Map Search & Dialog Primitives"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 7 - "Team Service, Roster Admin & Showcase"
Cohesion: 0.14
Nodes (22): AdminTeamPage(), shouldUnoptimize(), DELETE(), PUT(), GET(), POST(), OurTeamPage(), revalidate (+14 more)

### Community 8 - "Field Gallery Admin & Showcase"
Cohesion: 0.13
Nodes (22): AdminGalleryPage(), CATEGORIES, shouldUnoptimize(), DELETE(), PUT(), GET(), POST(), GalleryPage() (+14 more)

### Community 9 - "Admin Partners & Sections Config"
Cohesion: 0.12
Nodes (21): AdminPartnersPage(), CATEGORY_LABELS, AdminSectionsPage(), SectionRecord, ImageUploader(), ImageUploaderProps, shouldUnoptimize(), CATEGORIES (+13 more)

### Community 10 - "Field Insights Admin & Public Showcase"
Cohesion: 0.16
Nodes (19): AdminInsightsPage(), DELETE(), PUT(), GET(), POST(), InsightsPage(), revalidate, InsightFormModal() (+11 more)

### Community 11 - "Runtime Package Dependencies"
Cohesion: 0.08
Nodes (26): dependencies, bcryptjs@^3.0.3, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, jose@^6.2.16, lucide-react@^0.564.0, mapbox-gl@^3.24.0 (+18 more)

### Community 12 - "Site Header & Language Switcher"
Cohesion: 0.15
Nodes (19): PrivacyPage(), AnimatedHamburger(), Header(), HeaderProps, navItems, triggerLanguageSwitch(), LiquidGlass(), BentoCard() (+11 more)

### Community 13 - "Liquid Glass Shader Effects"
Cohesion: 0.13
Nodes (15): generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter(), LiquidGlassProps, fragmentShaders, FragmentShaderType, length() (+7 more)

### Community 14 - "Admin Settings UI, Footer & Why-Agri"
Cohesion: 0.16
Nodes (15): AdminWhyAgriPage(), WhyAgriFormModal(), WhyAgriFormModalProps, FooterProps, HomeContentProps, WhyAgriExperience(), WhyAgriExperienceProps, PageSectionData (+7 more)

### Community 15 - "Shadcn UI Registry Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 16 - "Admin Session, JWT & Credentials API"
Cohesion: 0.20
Nodes (14): POST(), POST(), AdminSessionPayload, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, JWT_SECRET, LOCAL_CREDENTIALS_PATH, LocalAdminCredentials (+6 more)

### Community 17 - "Projects Service & Capacity Building"
Cohesion: 0.22
Nodes (14): DELETE(), PUT(), GET(), POST(), CapacityBuildingClient(), CapacityBuildingPage(), revalidate, createProject() (+6 more)

### Community 18 - "Home & About Page Data Hydration"
Cohesion: 0.23
Nodes (13): AboutPage(), revalidate, HomePage(), revalidate, HomeContent(), globalForPrisma, isDatabaseConnected(), prisma (+5 more)

### Community 19 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 20 - "Contact Page & About Content"
Cohesion: 0.24
Nodes (12): ContactPage(), revalidate, NewsletterPage(), AboutContent(), ContactClientContent(), ContactClientContentProps, DesktopStickyAccordion(), MobileFallbackAccordion() (+4 more)

### Community 21 - "Admin Dashboard & DB Seeding"
Cohesion: 0.21
Nodes (13): AdminDashboardPage(), POST(), SeedButton(), countrySeeds, PublicDownload, publicDownloads, staticBeliefs, staticExpertisePillars (+5 more)

### Community 22 - "Our Work Pillar Client Views & Admin"
Cohesion: 0.17
Nodes (13): AdminProjectsPage(), PILLARS, CapacityBuildingClientProps, ClientAdvisoryClientProps, revalidate, StakeholderConveningsPage(), StakeholderConveningsClient(), StakeholderConveningsClientProps (+5 more)

### Community 23 - "pnpm Build & Workspace Rules"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, prisma, @prisma/client, @prisma/engines, sharp, @swc/core, unrs-resolver (+8 more)

### Community 24 - "Protected Admin API Auth Guards"
Cohesion: 0.22
Nodes (12): GET(), GET(), GET(), POST(), GET(), POST(), getSession(), verifySessionToken() (+4 more)

### Community 25 - "Beliefs Service & API Routes"
Cohesion: 0.30
Nodes (12): DELETE(), PUT(), GET(), POST(), createBelief(), deleteBelief(), ensureSeeded(), getAllBeliefsAdmin() (+4 more)

### Community 26 - "Partners Service & API Routes"
Cohesion: 0.27
Nodes (12): DELETE(), PUT(), GET(), POST(), createPartner(), deletePartner(), ensureSeeded(), getAllPartnersAdmin() (+4 more)

### Community 27 - "Page Sections API & Client Advisory"
Cohesion: 0.23
Nodes (10): GET(), POST(), ClientAdvisoryClient(), ClientAdvisoryPage(), revalidate, OurWorkPage(), revalidate, defaultPageSections (+2 more)

### Community 28 - "Section Layouts & Structured JSON-LD"
Cohesion: 0.23
Nodes (6): AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), BreadcrumbJsonLd(), ResourcesJsonLd()

### Community 30 - "Office Plants Motion Gallery"
Cohesion: 0.20
Nodes (11): easeInCubic(), easeOutCirc(), PlantFrame(), plantImages, SETTLED_POSITIONS, @react-three/drei@^10.7.7, @react-three/fiber@^9.6.1, three@^0.184.0 (+3 more)

### Community 31 - "Site Settings & Feature Flag Persistence"
Cohesion: 0.33
Nodes (9): GET(), PUT(), defaultSiteSettings, getSiteSettings(), LOCAL_SETTINGS_CACHE_PATH, parseFeatureFlags(), readLocalSettingsCache(), updateSiteSettings() (+1 more)

### Community 32 - "Admin Expertise UI & Bento Grid"
Cohesion: 0.33
Nodes (7): AdminExpertisePage(), AboutContentProps, ExpertiseFormModal(), ExpertiseFormModalProps, ROUTE_OPTIONS, ServicesBentoGridProps, ExpertisePillarData

### Community 33 - "Package Build & Dev Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 34 - "Expertise Pillars Service & ID Resolution"
Cohesion: 0.39
Nodes (7): DELETE(), PUT(), deleteExpertisePillar(), ensureSeeded(), resolveExpertiseId(), seedGuard, updateExpertisePillar()

### Community 35 - "Why-Agri Service & ID Resolution"
Cohesion: 0.39
Nodes (7): DELETE(), PUT(), deleteWhyAgriCard(), ensureSeeded(), resolveWhyAgriId(), seedGuard, updateWhyAgriCard()

### Community 36 - "Beliefs Admin Page & Form Modal"
Cohesion: 0.60
Nodes (4): AdminBeliefsPage(), BeliefFormModal(), BeliefFormModalProps, BeliefData

### Community 37 - "Admin Layout Shell & Navigation"
Cohesion: 0.47
Nodes (3): AdminLayout(), metadata, AdminHeader()

### Community 38 - "Digital Platforms Pillar Page"
Cohesion: 0.47
Nodes (4): DigitalPlatformsClient(), DigitalPlatformsClientProps, DigitalPlatformsPage(), revalidate

### Community 39 - "Project Implementation Pillar Page"
Cohesion: 0.47
Nodes (4): ProjectImplementationPage(), revalidate, ProjectImplementationClient(), ProjectImplementationClientProps

### Community 40 - "Package Version Overrides"
Cohesion: 0.33
Nodes (6): overrides, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 41 - "Package Dependency Resolutions"
Cohesion: 0.33
Nodes (6): resolutions, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 42 - "Technical Studies Pillar Page"
Cohesion: 0.60
Nodes (3): revalidate, TechnicalStudiesPage(), TechnicalStudiesClient()

### Community 44 - "Package Manager Engine Spec"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

## Knowledge Gaps
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Admin Login & SEO Route Handlers` to `Impact Map Data, Merging & Controls`, `Media Upload, Contact & Email Pipeline`, `Dev Dependencies & ESLint Config`, `Resource Library & PDF Preview`, `Pan-African Impact Map & Admin UI`, `Root Localized Layout, Fonts & Docs`, `Team Service, Roster Admin & Showcase`, `Field Gallery Admin & Showcase`, `Admin Partners & Sections Config`, `Field Insights Admin & Public Showcase`, `Runtime Package Dependencies`, `Site Header & Language Switcher`, `Admin Settings UI, Footer & Why-Agri`, `Admin Session, JWT & Credentials API`, `Projects Service & Capacity Building`, `Home & About Page Data Hydration`, `Contact Page & About Content`, `Admin Dashboard & DB Seeding`, `Our Work Pillar Client Views & Admin`, `Protected Admin API Auth Guards`, `Beliefs Service & API Routes`, `Partners Service & API Routes`, `Page Sections API & Client Advisory`, `Section Layouts & Structured JSON-LD`, `Site Settings & Feature Flag Persistence`, `Expertise Pillars Service & ID Resolution`, `Why-Agri Service & ID Resolution`, `Admin Layout Shell & Navigation`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Technical Studies Pillar Page`, `Contact Page Metadata Layout`, `Insights Page Metadata Layout`, `Our Team Metadata Layout`, `Capacity Building Metadata Layout`, `Client Advisory Metadata Layout`, `Digital Platforms Metadata Layout`, `Project Implementation Metadata Layout`, `Stakeholder Convenings Metadata Layout`, `Technical Studies Metadata Layout`?**
  _High betweenness centrality (0.292) - this node is a cross-community bridge._
- **Should `Impact Map Data, Merging & Controls` be split into smaller, more focused modules?**
  _Cohesion score 0.07459207459207459 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Impact Map Data, Merging & Controls` to `Dev Dependencies & ESLint Config`, `Resource Library & PDF Preview`, `Pan-African Impact Map & Admin UI`, `Root Localized Layout, Fonts & Docs`, `Map Search & Dialog Primitives`, `Team Service, Roster Admin & Showcase`, `Field Gallery Admin & Showcase`, `Admin Partners & Sections Config`, `Field Insights Admin & Public Showcase`, `Runtime Package Dependencies`, `Site Header & Language Switcher`, `Liquid Glass Shader Effects`, `Admin Settings UI, Footer & Why-Agri`, `Projects Service & Capacity Building`, `Home & About Page Data Hydration`, `Contact Page & About Content`, `Admin Dashboard & DB Seeding`, `Our Work Pillar Client Views & Admin`, `Page Sections API & Client Advisory`, `Section Layouts & Structured JSON-LD`, `Admin Login & SEO Route Handlers`, `Office Plants Motion Gallery`, `Admin Expertise UI & Bento Grid`, `Beliefs Admin Page & Form Modal`, `Admin Layout Shell & Navigation`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Technical Studies Pillar Page`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Should `Media Upload, Contact & Email Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.0611764705882353 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Admin Settings UI, Footer & Why-Agri` to `Impact Map Data, Merging & Controls`, `Dev Dependencies & ESLint Config`, `Resource Library & PDF Preview`, `Pan-African Impact Map & Admin UI`, `Root Localized Layout, Fonts & Docs`, `Map Search & Dialog Primitives`, `Team Service, Roster Admin & Showcase`, `Field Gallery Admin & Showcase`, `Admin Partners & Sections Config`, `Field Insights Admin & Public Showcase`, `Runtime Package Dependencies`, `Site Header & Language Switcher`, `Projects Service & Capacity Building`, `Contact Page & About Content`, `Admin Dashboard & DB Seeding`, `Our Work Pillar Client Views & Admin`, `Page Sections API & Client Advisory`, `Admin Login & SEO Route Handlers`, `Office Plants Motion Gallery`, `Admin Expertise UI & Bento Grid`, `Beliefs Admin Page & Form Modal`, `Admin Layout Shell & Navigation`, `Digital Platforms Pillar Page`, `Project Implementation Pillar Page`, `Technical Studies Pillar Page`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Should `Dev Dependencies & ESLint Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07051282051282051 - nodes in this community are weakly interconnected._
- **Should `Resource Library & PDF Preview` be split into smaller, more focused modules?**
  _Cohesion score 0.09446693657219973 - nodes in this community are weakly interconnected._