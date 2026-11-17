# Graph Report - AE-website-main  (2026-11-17)

## Corpus Check
- 380 files · ~185,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 894 nodes · 2300 edges · 50 communities (44 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Pan-African Impact Map & Admin UI
- Root Localized Layout, Fonts & Docs
- Admin Gallery, Partners, Projects & Sections
- Media Upload, Contact & Email Pipeline
- Dev Dependencies & Tooling
- Our Work Pillar Client Views & Newsletter
- Map Search & Dialog Primitives
- Runtime Package Dependencies
- Localized Metadata Layouts (Contact, Insights, Team)
- Public Page Data Hydration & Revalidation
- Our Work, Privacy & About Content
- Admin Dashboard & DB Seeding
- Admin Session, JWT & Credentials API
- Home Page & Partners API Routes
- Shadcn UI Registry Config
- Admin Settings UI & Contact Page
- Protected Admin API Routes (Projects & Gallery)
- Localized Metadata Layouts (About, Impact, Work)
- TypeScript Compiler Configuration
- Field Insights Service, API & Public View
- Expertise Pillars Service & API Routes
- Gallery Page & Office Plants Motion
- pnpm Build & Workspace Rules
- Beliefs Service & API Routes
- Why-Agri Service & API Routes
- Impact Map Service & API Routes
- Resources Service & API Routes
- Team Service & API Routes
- Beliefs & Why-Agri Admin Pages
- Resources Admin & PDF Uploader
- Sections API, Terms & SEO Routes
- Gallery Item Service & Route Handlers
- Impact Page & SDG Alignment Motion
- Home Content & Why-Agri Experience
- Package Build & Dev Scripts
- Next.js Config, Deployment & Agent Rules
- Admin Layout Shell & Header
- Our Team Page & Roster Showcase
- Resource Library & PDF Preview
- Admin Expertise Page & Form Modal
- Admin Insights Page & Form Modal
- Package Version Overrides
- Package Dependency Resolutions
- ESLint Next.js Configuration
- Package Manager Engine Spec
- PostCSS Tailwind Configuration
- Image Optimization Shell Script

## God Nodes (most connected - your core abstractions)
1. `next` - 97 edges
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
- `Next.js Agent Guidelines & Rules` --references--> `RootLayout()`  [EXTRACTED]
  D:/AE-website-main/AGENTS.md → app/[locale]/layout.tsx
- `Interactive Mapbox Map` --references--> `mergeCountriesWithCms()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/country-data.ts
- `Agri Experience Organization` --references--> `Footer()`  [EXTRACTED]
  D:/AE-website-main/README.md → components/footer.tsx

## Import Cycles
- None detected.

## Communities (50 total, 6 thin omitted)

### Community 0 - "Pan-African Impact Map & Admin UI"
Cohesion: 0.06
Nodes (55): AdminMapPage(), MapPage(), revalidate, CountryFormModal(), CountryFormModalProps, cityCoordinates, CmsCountryInput, countrySeedsFr (+47 more)

### Community 1 - "Root Localized Layout, Fonts & Docs"
Cohesion: 0.06
Nodes (37): bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, GoogleAnalytics(), Window, AnimatedHamburger() (+29 more)

### Community 2 - "Admin Gallery, Partners, Projects & Sections"
Cohesion: 0.07
Nodes (37): AdminGalleryPage(), CATEGORIES, shouldUnoptimize(), AdminPartnersPage(), CATEGORY_LABELS, AdminProjectsPage(), PILLARS, AdminSectionsPage() (+29 more)

### Community 3 - "Media Upload, Contact & Email Pipeline"
Cohesion: 0.06
Nodes (35): GET(), scanAllUploads(), scanDirectory(), formatBytes(), GET(), PdfFileItem, ALLOWED_MIME_TYPES, POST() (+27 more)

### Community 4 - "Dev Dependencies & Tooling"
Cohesion: 0.08
Nodes (35): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3 (+27 more)

### Community 5 - "Our Work Pillar Client Views & Newsletter"
Cohesion: 0.13
Nodes (23): NewsletterPage(), CapacityBuildingClient(), CapacityBuildingClientProps, ClientAdvisoryClient(), ClientAdvisoryClientProps, DigitalPlatformsClient(), DigitalPlatformsClientProps, ProjectImplementationClient() (+15 more)

### Community 6 - "Map Search & Dialog Primitives"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 7 - "Runtime Package Dependencies"
Cohesion: 0.06
Nodes (31): dependencies, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, gsap@^3.15.0, @gsap/react@^2.1.2, jose@^6.2.16, lucide-react@^0.564.0 (+23 more)

### Community 9 - "Public Page Data Hydration & Revalidation"
Cohesion: 0.13
Nodes (19): AboutPage(), revalidate, OurImpactPage(), revalidate, CapacityBuildingPage(), revalidate, ClientAdvisoryPage(), revalidate (+11 more)

### Community 10 - "Our Work, Privacy & About Content"
Cohesion: 0.14
Nodes (16): OurWorkPage(), revalidate, PrivacyPage(), AboutContent(), CookieToast(), Footer(), BentoCard(), BentoCardProps (+8 more)

### Community 11 - "Admin Dashboard & DB Seeding"
Cohesion: 0.16
Nodes (17): AdminDashboardPage(), POST(), SeedButton(), countrySeeds, globalForPrisma, prisma, PublicDownload, publicDownloads (+9 more)

### Community 12 - "Admin Session, JWT & Credentials API"
Cohesion: 0.16
Nodes (17): GET(), POST(), POST(), AdminSessionPayload, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, JWT_SECRET, LOCAL_CREDENTIALS_PATH (+9 more)

### Community 13 - "Home Page & Partners API Routes"
Cohesion: 0.20
Nodes (17): DELETE(), PUT(), GET(), POST(), HomePage(), revalidate, isDatabaseConnected(), getBeliefs() (+9 more)

### Community 14 - "Shadcn UI Registry Config"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 15 - "Admin Settings UI & Contact Page"
Cohesion: 0.18
Nodes (14): GET(), PUT(), ContactPage(), revalidate, ContactClientContent(), FooterProps, defaultSiteSettings, getSiteSettings() (+6 more)

### Community 16 - "Protected Admin API Routes (Projects & Gallery)"
Cohesion: 0.22
Nodes (14): GET(), GET(), POST(), DELETE(), PUT(), GET(), POST(), getSession() (+6 more)

### Community 17 - "Localized Metadata Layouts (About, Impact, Work)"
Cohesion: 0.18
Nodes (9): AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), ResourcesPage(), revalidate, BreadcrumbJsonLd(), ResourcesJsonLd() (+1 more)

### Community 18 - "TypeScript Compiler Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 19 - "Field Insights Service, API & Public View"
Cohesion: 0.22
Nodes (14): DELETE(), PUT(), GET(), POST(), InsightsPage(), revalidate, InsightsContent(), createInsight() (+6 more)

### Community 20 - "Expertise Pillars Service & API Routes"
Cohesion: 0.26
Nodes (13): DELETE(), PUT(), GET(), POST(), createExpertisePillar(), deleteExpertisePillar(), ensureSeeded(), getAllExpertisePillarsAdmin() (+5 more)

### Community 21 - "Gallery Page & Office Plants Motion"
Cohesion: 0.16
Nodes (15): GalleryPage(), revalidate, easeInCubic(), easeOutCirc(), OfficePlantsGallery(), PlantFrame(), plantImages, SETTLED_POSITIONS (+7 more)

### Community 22 - "pnpm Build & Workspace Rules"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, prisma, @prisma/client, @prisma/engines, sharp, @swc/core, unrs-resolver (+8 more)

### Community 23 - "Beliefs Service & API Routes"
Cohesion: 0.27
Nodes (12): DELETE(), PUT(), GET(), POST(), createBelief(), deleteBelief(), ensureSeeded(), getAllBeliefsAdmin() (+4 more)

### Community 24 - "Why-Agri Service & API Routes"
Cohesion: 0.27
Nodes (12): DELETE(), PUT(), GET(), POST(), createWhyAgriCard(), deleteWhyAgriCard(), ensureSeeded(), getAllWhyAgriCardsAdmin() (+4 more)

### Community 25 - "Impact Map Service & API Routes"
Cohesion: 0.30
Nodes (11): DELETE(), PUT(), GET(), POST(), createCountry(), deleteCountry(), ensureSeeded(), getCountries() (+3 more)

### Community 26 - "Resources Service & API Routes"
Cohesion: 0.27
Nodes (10): DELETE(), PUT(), GET(), POST(), createResource(), deleteResource(), ensureSeeded(), resolveResourceId() (+2 more)

### Community 27 - "Team Service & API Routes"
Cohesion: 0.27
Nodes (11): DELETE(), PUT(), GET(), POST(), createTeamMember(), deleteTeamMember(), ensureSeeded(), resolveTeamMemberId() (+3 more)

### Community 28 - "Beliefs & Why-Agri Admin Pages"
Cohesion: 0.26
Nodes (9): AdminBeliefsPage(), AdminWhyAgriPage(), BeliefFormModal(), BeliefFormModalProps, WhyAgriFormModal(), WhyAgriFormModalProps, HomeContentProps, BeliefData (+1 more)

### Community 29 - "Resources Admin & PDF Uploader"
Cohesion: 0.26
Nodes (9): AdminResourcesPage(), CATEGORIES, PdfFileItem, PdfUploader(), PdfUploaderProps, CATEGORIES, ResourceFormModal(), ResourceFormModalProps (+1 more)

### Community 30 - "Sections API, Terms & SEO Routes"
Cohesion: 0.21
Nodes (4): GET(), POST(), upsertPageSection(), next

### Community 31 - "Gallery Item Service & Route Handlers"
Cohesion: 0.42
Nodes (8): DELETE(), PUT(), createGalleryItem(), deleteGalleryItem(), ensureSeeded(), resolveGalleryItemId(), seedGuard, updateGalleryItem()

### Community 32 - "Impact Page & SDG Alignment Motion"
Cohesion: 0.29
Nodes (8): ImpactPageContent(), AccordionRow(), AccordionSlice(), displaySdgs, ImpactAlignment(), ImpactCard, relevantSdgs, sdgData

### Community 33 - "Home Content & Why-Agri Experience"
Cohesion: 0.33
Nodes (7): AboutContentProps, HomeContent(), WhyAgriExperience(), WhyAgriExperienceProps, PageSectionData, gsap, @gsap/react

### Community 34 - "Package Build & Dev Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 35 - "Next.js Config, Deployment & Agent Rules"
Cohesion: 0.32
Nodes (6): Next.js Agent Guidelines & Rules, nextConfig, withNextIntl, Hostinger Production Deployment, Interactive Mapbox Map, Next.js 16 Web Application Stack

### Community 36 - "Admin Layout Shell & Header"
Cohesion: 0.32
Nodes (3): AdminLayout(), metadata, AdminHeader()

### Community 37 - "Our Team Page & Roster Showcase"
Cohesion: 0.36
Nodes (6): OurTeamPage(), revalidate, OurTeamContent(), STATIC_IMAGE_CONFIG, TeamCard, getTeamMembers()

### Community 38 - "Resource Library & PDF Preview"
Cohesion: 0.39
Nodes (6): PdfPreview(), categories, PdfPreview, ResourcesContent(), Resource Library & PDF Preview, lucide-react

### Community 39 - "Admin Expertise Page & Form Modal"
Cohesion: 0.48
Nodes (5): AdminExpertisePage(), ExpertiseFormModal(), ExpertiseFormModalProps, ROUTE_OPTIONS, ExpertisePillarData

### Community 40 - "Admin Insights Page & Form Modal"
Cohesion: 0.60
Nodes (4): AdminInsightsPage(), InsightFormModal(), InsightFormModalProps, InsightItem

### Community 41 - "Package Version Overrides"
Cohesion: 0.33
Nodes (6): overrides, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 42 - "Package Dependency Resolutions"
Cohesion: 0.33
Nodes (6): resolutions, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 43 - "ESLint Next.js Configuration"
Cohesion: 0.50
Nodes (3): config, eslint-config-next@16.3.3, eslint-config-next

### Community 45 - "Package Manager Engine Spec"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

## Knowledge Gaps
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Sections API, Terms & SEO Routes` to `Pan-African Impact Map & Admin UI`, `Root Localized Layout, Fonts & Docs`, `Admin Gallery, Partners, Projects & Sections`, `Media Upload, Contact & Email Pipeline`, `Dev Dependencies & Tooling`, `Our Work Pillar Client Views & Newsletter`, `Runtime Package Dependencies`, `Localized Metadata Layouts (Contact, Insights, Team)`, `Our Work, Privacy & About Content`, `Admin Dashboard & DB Seeding`, `Admin Session, JWT & Credentials API`, `Home Page & Partners API Routes`, `Admin Settings UI & Contact Page`, `Protected Admin API Routes (Projects & Gallery)`, `Localized Metadata Layouts (About, Impact, Work)`, `Field Insights Service, API & Public View`, `Expertise Pillars Service & API Routes`, `Gallery Page & Office Plants Motion`, `Beliefs Service & API Routes`, `Why-Agri Service & API Routes`, `Impact Map Service & API Routes`, `Resources Service & API Routes`, `Team Service & API Routes`, `Gallery Item Service & Route Handlers`, `Impact Page & SDG Alignment Motion`, `Home Content & Why-Agri Experience`, `Admin Layout Shell & Header`, `Our Team Page & Roster Showcase`, `Resource Library & PDF Preview`, `Admin Expertise Page & Form Modal`, `Client Advisory Metadata Layout`?**
  _High betweenness centrality (0.296) - this node is a cross-community bridge._
- **Should `Pan-African Impact Map & Admin UI` be split into smaller, more focused modules?**
  _Cohesion score 0.061754385964912284 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Pan-African Impact Map & Admin UI` to `Root Localized Layout, Fonts & Docs`, `Admin Gallery, Partners, Projects & Sections`, `Dev Dependencies & Tooling`, `Our Work Pillar Client Views & Newsletter`, `Map Search & Dialog Primitives`, `Runtime Package Dependencies`, `Public Page Data Hydration & Revalidation`, `Our Work, Privacy & About Content`, `Admin Dashboard & DB Seeding`, `Home Page & Partners API Routes`, `Admin Settings UI & Contact Page`, `Localized Metadata Layouts (About, Impact, Work)`, `Field Insights Service, API & Public View`, `Gallery Page & Office Plants Motion`, `Beliefs & Why-Agri Admin Pages`, `Resources Admin & PDF Uploader`, `Impact Page & SDG Alignment Motion`, `Home Content & Why-Agri Experience`, `Admin Layout Shell & Header`, `Our Team Page & Roster Showcase`, `Resource Library & PDF Preview`, `Admin Expertise Page & Form Modal`, `Admin Insights Page & Form Modal`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Should `Root Localized Layout, Fonts & Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.06386066763425254 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Resource Library & PDF Preview` to `Pan-African Impact Map & Admin UI`, `Root Localized Layout, Fonts & Docs`, `Admin Gallery, Partners, Projects & Sections`, `Dev Dependencies & Tooling`, `Our Work Pillar Client Views & Newsletter`, `Map Search & Dialog Primitives`, `Runtime Package Dependencies`, `Our Work, Privacy & About Content`, `Admin Dashboard & DB Seeding`, `Admin Settings UI & Contact Page`, `Gallery Page & Office Plants Motion`, `Beliefs & Why-Agri Admin Pages`, `Resources Admin & PDF Uploader`, `Impact Page & SDG Alignment Motion`, `Home Content & Why-Agri Experience`, `Admin Layout Shell & Header`, `Our Team Page & Roster Showcase`, `Admin Expertise Page & Form Modal`, `Admin Insights Page & Form Modal`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Should `Admin Gallery, Partners, Projects & Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.06887755102040816 - nodes in this community are weakly interconnected._
- **Should `Media Upload, Contact & Email Pipeline` be split into smaller, more focused modules?**
  _Cohesion score 0.06462585034013606 - nodes in this community are weakly interconnected._