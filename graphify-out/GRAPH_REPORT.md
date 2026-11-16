# Graph Report - AE-website-main  (2026-11-16)

## Corpus Check
- 379 files · ~185,021 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 880 nodes · 2226 edges · 58 communities (45 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c1f81bd5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Interactive Impact Map & Services
- Admin Media & Content Modals
- Resources Library & Metadata Layouts
- Dev Dependencies & Tooling
- App Layouts & Global Shell
- Map Search & Dialog Primitives
- Runtime Package Dependencies
- Field Gallery CMS & Showcase
- Our Work Pillar Pages
- Our Work Client Views
- Team & Page Sections API
- Liquid Glass Shader Effects
- About & Services Bento Grid
- Shadcn UI Registry Config
- Protected Admin CRUD Routes
- TypeScript Compiler Configuration
- Admin Dashboard & DB Seeding
- Partners Service & API Routes
- Localized Metadata & Home Sections
- pnpm Build & Workspace Rules
- Admin Session & JWT Auth
- Contact & Email Templates
- Beliefs & Why-Agri Admin UI
- Beliefs Service & API Routes
- Expertise Pillars Service & API
- Insights Service & API Routes
- Why-Agri Service & API Routes
- Header Navigation & i18n Routing
- Footer Settings & PDF Preview
- Media Upload & Gallery Scanning
- Agri Experience Architecture Docs
- Email Preview CLI Script
- Impact Page & SDG Alignment
- Package Build & Dev Scripts
- Home Page Data Hydration
- i18n Auto-Translation Script
- Admin Expertise Management UI
- Admin Insights Management UI
- GSAP Scroll Accordion Motion
- Core UI & 3D Libraries
- Package Version Overrides
- Package Dependency Resolutions
- Public Insights Page & Content
- ESLint Next.js Configuration
- Next.js & Intl Configuration
- Package Manager Engine Spec
- PostCSS Tailwind Configuration
- Image Optimization Shell Script
- Radix Dialog Package Dependency
- React Three Fiber Dependency

## God Nodes (most connected - your core abstractions)
1. `next` - 94 edges
2. `getSession()` - 84 edges
3. `react` - 80 edges
4. `lucide-react` - 60 edges
5. `next-intl` - 47 edges
6. `isDatabaseConnected()` - 39 edges
7. `Link` - 37 edges
8. `RollingText()` - 32 edges
9. `stripManagedFields()` - 29 edges
10. `getPageSections()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/upload/route.ts → lib/auth.ts
- `ExpertiseFormModalProps` --references--> `ExpertisePillarData`  [EXTRACTED]
  components/admin/expertise-form-modal.tsx → lib/services/expertise-service.ts
- `ProjectFormModalProps` --references--> `ProjectItem`  [EXTRACTED]
  components/admin/project-form-modal.tsx → lib/services/projects-service.ts
- `AboutLayout()` --calls--> `BreadcrumbJsonLd()`  [EXTRACTED]
  app/[locale]/about/layout.tsx → components/json-ld.tsx
- `AboutPage()` --calls--> `getPageSections()`  [EXTRACTED]
  app/[locale]/about/page.tsx → lib/services/page-sections-service.ts

## Import Cycles
- None detected.

## Communities (58 total, 13 thin omitted)

### Community 0 - "Interactive Impact Map & Services"
Cohesion: 0.05
Nodes (64): AdminMapPage(), DELETE(), PUT(), GET(), POST(), MapPage(), revalidate, OurImpactPage() (+56 more)

### Community 1 - "Admin Media & Content Modals"
Cohesion: 0.06
Nodes (37): AdminPartnersPage(), CATEGORY_LABELS, AdminProjectsPage(), PILLARS, AdminSectionsPage(), PageTabKey, SECTION_CONFIGS, SectionConfig (+29 more)

### Community 2 - "Resources Library & Metadata Layouts"
Cohesion: 0.08
Nodes (26): AdminResourcesPage(), CATEGORIES, AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), ResourcesPage(), revalidate (+18 more)

### Community 3 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (35): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3 (+27 more)

### Community 4 - "App Layouts & Global Shell"
Cohesion: 0.10
Nodes (20): AdminLayout(), metadata, ContactPage(), revalidate, bebasNeue, dmSans, playfairDisplay, RootLayout() (+12 more)

### Community 5 - "Map Search & Dialog Primitives"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 6 - "Runtime Package Dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bcryptjs@^3.0.3, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, gsap@^3.15.0, @gsap/react@^2.1.2, lucide-react@^0.564.0 (+23 more)

### Community 7 - "Field Gallery CMS & Showcase"
Cohesion: 0.12
Nodes (24): AdminGalleryPage(), CATEGORIES, shouldUnoptimize(), DELETE(), PUT(), GalleryPage(), revalidate, GALLERY_CATEGORIES (+16 more)

### Community 8 - "Our Work Pillar Pages"
Cohesion: 0.14
Nodes (22): GET(), POST(), CapacityBuildingPage(), revalidate, ClientAdvisoryPage(), revalidate, DigitalPlatformsPage(), revalidate (+14 more)

### Community 9 - "Our Work Client Views"
Cohesion: 0.15
Nodes (18): NewsletterPage(), CapacityBuildingClient(), CapacityBuildingClientProps, ClientAdvisoryClient(), ClientAdvisoryClientProps, DigitalPlatformsClient(), DigitalPlatformsClientProps, ProjectImplementationClient() (+10 more)

### Community 10 - "Team & Page Sections API"
Cohesion: 0.13
Nodes (15): GET(), POST(), DELETE(), PUT(), GET(), POST(), defaultPageSections, upsertPageSection() (+7 more)

### Community 11 - "Liquid Glass Shader Effects"
Cohesion: 0.12
Nodes (16): generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter(), LiquidGlass(), LiquidGlassProps, fragmentShaders, FragmentShaderType (+8 more)

### Community 12 - "About & Services Bento Grid"
Cohesion: 0.16
Nodes (17): AboutPage(), revalidate, OurWorkPage(), revalidate, PrivacyPage(), AboutContent(), AboutContentProps, CookieToast() (+9 more)

### Community 13 - "Shadcn UI Registry Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 14 - "Protected Admin CRUD Routes"
Cohesion: 0.18
Nodes (13): GET(), GET(), POST(), DELETE(), PUT(), DELETE(), PUT(), GET() (+5 more)

### Community 15 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 16 - "Admin Dashboard & DB Seeding"
Cohesion: 0.22
Nodes (12): AdminDashboardPage(), SeedButton(), globalForPrisma, prisma, staticBeliefs, staticExpertisePillars, staticGalleryItems, staticPartners (+4 more)

### Community 17 - "Partners Service & API Routes"
Cohesion: 0.26
Nodes (13): DELETE(), PUT(), GET(), POST(), createPartner(), deletePartner(), ensureSeeded(), getAllPartnersAdmin() (+5 more)

### Community 18 - "Localized Metadata & Home Sections"
Cohesion: 0.14
Nodes (3): HomeContent(), WhyAgriExperience(), next-intl

### Community 19 - "pnpm Build & Workspace Rules"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, prisma, @prisma/client, @prisma/engines, sharp, @swc/core, unrs-resolver (+8 more)

### Community 20 - "Admin Session & JWT Auth"
Cohesion: 0.23
Nodes (11): POST(), POST(), AdminSessionPayload, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, JWT_SECRET, SESSION_COOKIE_NAME, signSessionToken() (+3 more)

### Community 21 - "Contact & Email Templates"
Cohesion: 0.27
Nodes (12): POST(), GET(), getLogoDataUri(), sampleSubmissionEn, sampleSubmissionFr, ContactSubmission, escapeHtml(), generateRespondentAcknowledgmentEmail() (+4 more)

### Community 22 - "Beliefs & Why-Agri Admin UI"
Cohesion: 0.23
Nodes (10): AdminBeliefsPage(), AdminWhyAgriPage(), BeliefFormModal(), BeliefFormModalProps, WhyAgriFormModal(), WhyAgriFormModalProps, HomeContentProps, WhyAgriExperienceProps (+2 more)

### Community 23 - "Beliefs Service & API Routes"
Cohesion: 0.30
Nodes (11): DELETE(), PUT(), GET(), POST(), createBelief(), deleteBelief(), ensureSeeded(), getAllBeliefsAdmin() (+3 more)

### Community 24 - "Expertise Pillars Service & API"
Cohesion: 0.30
Nodes (11): DELETE(), PUT(), GET(), POST(), createExpertisePillar(), deleteExpertisePillar(), ensureSeeded(), getAllExpertisePillarsAdmin() (+3 more)

### Community 25 - "Insights Service & API Routes"
Cohesion: 0.27
Nodes (11): DELETE(), PUT(), GET(), POST(), createInsight(), deleteInsight(), ensureSeeded(), resolveInsightId() (+3 more)

### Community 26 - "Why-Agri Service & API Routes"
Cohesion: 0.30
Nodes (11): DELETE(), PUT(), GET(), POST(), createWhyAgriCard(), deleteWhyAgriCard(), ensureSeeded(), getAllWhyAgriCardsAdmin() (+3 more)

### Community 27 - "Header Navigation & i18n Routing"
Cohesion: 0.23
Nodes (10): AnimatedHamburger(), Header(), navItems, triggerLanguageSwitch(), getPathname, redirect, routing, usePathname (+2 more)

### Community 28 - "Footer Settings & PDF Preview"
Cohesion: 0.22
Nodes (7): Footer(), FooterProps, categories, PdfPreview, ResourcesContent(), SiteSettingsData, lucide-react

### Community 29 - "Media Upload & Gallery Scanning"
Cohesion: 0.23
Nodes (8): GET(), scanAllUploads(), scanDirectory(), formatBytes(), GET(), PdfFileItem, ALLOWED_MIME_TYPES, POST()

### Community 30 - "Agri Experience Architecture Docs"
Cohesion: 0.20
Nodes (12): Next.js Agent Guidelines & Rules, Agri Experience Organization, Contact & Receipt Email Pipeline, Editorial Design System, ESSETA Seed Program Initiative, Hostinger Production Deployment, Bilingual i18n & Auto-Translate Pipeline, Interactive Mapbox Map (+4 more)

### Community 31 - "Email Preview CLI Script"
Cohesion: 0.18
Nodes (8): { execSync }, fs, logoUri, outDir, path, previewIndexPath, sampleSubmissionEn, sampleSubmissionFr

### Community 32 - "Impact Page & SDG Alignment"
Cohesion: 0.29
Nodes (8): ImpactPageContent(), AccordionRow(), AccordionSlice(), displaySdgs, ImpactAlignment(), ImpactCard, relevantSdgs, sdgData

### Community 33 - "Package Build & Dev Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 34 - "Home Page Data Hydration"
Cohesion: 0.43
Nodes (7): POST(), HomePage(), revalidate, isDatabaseConnected(), getBeliefs(), getPartners(), getWhyAgriCards()

### Community 35 - "i18n Auto-Translation Script"
Cohesion: 0.29
Nodes (5): fs, https, main(), traverseAndTranslate(), translateText()

### Community 36 - "Admin Expertise Management UI"
Cohesion: 0.47
Nodes (4): AdminExpertisePage(), ExpertiseFormModal(), ExpertiseFormModalProps, ROUTE_OPTIONS

### Community 37 - "Admin Insights Management UI"
Cohesion: 0.60
Nodes (4): AdminInsightsPage(), InsightFormModal(), InsightFormModalProps, InsightItem

### Community 38 - "GSAP Scroll Accordion Motion"
Cohesion: 0.47
Nodes (5): DesktopStickyAccordion(), MobileFallbackAccordion(), ScrollAccordion(), gsap, @gsap/react

### Community 39 - "Core UI & 3D Libraries"
Cohesion: 0.20
Nodes (6): class-variance-authority@^0.7.1, jose@^6.2.16, three@^0.184.0, class-variance-authority, jose, three

### Community 40 - "Package Version Overrides"
Cohesion: 0.33
Nodes (6): overrides, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 41 - "Package Dependency Resolutions"
Cohesion: 0.33
Nodes (6): resolutions, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 42 - "Public Insights Page & Content"
Cohesion: 0.60
Nodes (4): InsightsPage(), revalidate, InsightsContent(), getInsights()

### Community 43 - "ESLint Next.js Configuration"
Cohesion: 0.50
Nodes (3): config, eslint-config-next@16.3.3, eslint-config-next

### Community 46 - "Package Manager Engine Spec"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

## Knowledge Gaps
- **5 isolated node(s):** `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment`, `High-Performance Motion Design`, `Resource Library & PDF Preview`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 228 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Team & Page Sections API` to `Interactive Impact Map & Services`, `Admin Media & Content Modals`, `Resources Library & Metadata Layouts`, `Dev Dependencies & Tooling`, `App Layouts & Global Shell`, `Runtime Package Dependencies`, `Field Gallery CMS & Showcase`, `Our Work Pillar Pages`, `Our Work Client Views`, `About & Services Bento Grid`, `Protected Admin CRUD Routes`, `Admin Dashboard & DB Seeding`, `Partners Service & API Routes`, `Localized Metadata & Home Sections`, `Admin Session & JWT Auth`, `Contact & Email Templates`, `Beliefs Service & API Routes`, `Expertise Pillars Service & API`, `Insights Service & API Routes`, `Why-Agri Service & API Routes`, `Header Navigation & i18n Routing`, `Footer Settings & PDF Preview`, `Media Upload & Gallery Scanning`, `Impact Page & SDG Alignment`, `GSAP Scroll Accordion Motion`, `Contact Page Metadata Layout`, `Insights Page Metadata Layout`, `Newsletter Page Metadata Layout`, `Capacity Building Metadata Layout`, `Digital Platforms Metadata Layout`, `Stakeholder Convenings Metadata Layout`?**
  _High betweenness centrality (0.307) - this node is a cross-community bridge._
- **What connects `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Interactive Impact Map & Services` be split into smaller, more focused modules?**
  _Cohesion score 0.05362614913176711 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Interactive Impact Map & Services` to `Admin Media & Content Modals`, `Resources Library & Metadata Layouts`, `Dev Dependencies & Tooling`, `App Layouts & Global Shell`, `Map Search & Dialog Primitives`, `Runtime Package Dependencies`, `Field Gallery CMS & Showcase`, `Our Work Pillar Pages`, `Our Work Client Views`, `Liquid Glass Shader Effects`, `About & Services Bento Grid`, `Admin Dashboard & DB Seeding`, `Localized Metadata & Home Sections`, `Beliefs & Why-Agri Admin UI`, `Header Navigation & i18n Routing`, `Footer Settings & PDF Preview`, `Impact Page & SDG Alignment`, `Home Page Data Hydration`, `Admin Expertise Management UI`, `Admin Insights Management UI`, `GSAP Scroll Accordion Motion`, `Public Insights Page & Content`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Should `Admin Media & Content Modals` be split into smaller, more focused modules?**
  _Cohesion score 0.06382978723404255 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Footer Settings & PDF Preview` to `Interactive Impact Map & Services`, `Admin Media & Content Modals`, `Resources Library & Metadata Layouts`, `Impact Page & SDG Alignment`, `Admin Expertise Management UI`, `Admin Insights Management UI`, `App Layouts & Global Shell`, `Field Gallery CMS & Showcase`, `Map Search & Dialog Primitives`, `Our Work Client Views`, `GSAP Scroll Accordion Motion`, `Dev Dependencies & Tooling`, `About & Services Bento Grid`, `Runtime Package Dependencies`, `Admin Dashboard & DB Seeding`, `Localized Metadata & Home Sections`, `Beliefs & Why-Agri Admin UI`, `Header Navigation & i18n Routing`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `Resources Library & Metadata Layouts` be split into smaller, more focused modules?**
  _Cohesion score 0.08130081300813008 - nodes in this community are weakly interconnected._