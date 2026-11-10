# Graph Report - AE-website-main  (2026-11-10)

## Corpus Check
- 130 files · ~146,191 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 620 nodes · 1333 edges · 33 communities (27 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4070443`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- next-intl
- email.ts
- cn
- package.json
- dependencies
- header.tsx
- react
- components.json
- compilerOptions
- overrides
- BreadcrumbJsonLd
- office-plants-gallery.tsx
- Agri Experience Organization
- team-service.ts
- getSession
- scripts
- next
- client-logos.tsx
- auth.ts
- eslint-config-next
- next.config.mjs
- packageManager
- overrides
- resolutions
- team/[id]/route.ts
- our-team-content.tsx
- projects/page.tsx
- resources-service.ts
- postcss.config.mjs
- optimize_images.sh

## God Nodes (most connected - your core abstractions)
1. `next` - 61 edges
2. `react` - 51 edges
3. `next-intl` - 47 edges
4. `lucide-react` - 43 edges
5. `Link` - 37 edges
6. `RollingText()` - 34 edges
7. `getSession()` - 27 edges
8. `cn()` - 26 edges
9. `framer-motion` - 24 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AdminDashboardPage()` --calls--> `getSession()`  [EXTRACTED]
  app/admin/page.tsx → lib/auth.ts
- `GET()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/gallery/route.ts → lib/auth.ts
- `POST()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/upload/route.ts → lib/auth.ts
- `TeamFormModalProps` --references--> `TeamMemberItem`  [EXTRACTED]
  components/admin/team-form-modal.tsx → lib/services/team-service.ts
- `ResourceFormModalProps` --references--> `ResourceItem`  [EXTRACTED]
  components/admin/resource-form-modal.tsx → lib/services/resources-service.ts

## Import Cycles
- None detected.

## Communities (33 total, 6 thin omitted)

### Community 0 - "react"
Cohesion: 0.08
Nodes (46): MapPage(), countrySeeds, countrySeedsFr, createGenericProjects(), getCountrySeeds(), cityCoordinates, InteractiveMap(), InteractiveMapbox (+38 more)

### Community 1 - "next-intl"
Cohesion: 0.09
Nodes (44): AboutPage(), ContactPage(), InsightsPage(), NewsletterPage(), OurImpactPage(), CapacityBuildingPage(), ClientAdvisoryPage(), DigitalPlatformsPage() (+36 more)

### Community 2 - "email.ts"
Cohesion: 0.08
Nodes (25): POST(), GET(), getLogoDataUri(), sampleSubmissionEn, sampleSubmissionFr, ContactSubmission, escapeHtml(), generateRespondentAcknowledgmentEmail() (+17 more)

### Community 3 - "cn"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 4 - "package.json"
Cohesion: 0.08
Nodes (35): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3 (+27 more)

### Community 5 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, gsap@^3.15.0, @gsap/react@^2.1.2, jose@^6.2.16, lucide-react@^0.564.0 (+23 more)

### Community 6 - "header.tsx"
Cohesion: 0.12
Nodes (16): generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter(), LiquidGlass(), LiquidGlassProps, fragmentShaders, FragmentShaderType (+8 more)

### Community 7 - "react"
Cohesion: 0.13
Nodes (19): bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, GoogleAnalytics(), Window, AnimatedHamburger() (+11 more)

### Community 8 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 9 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "overrides"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, prisma, @prisma/client, @prisma/engines, sharp, @swc/core, unrs-resolver (+8 more)

### Community 11 - "BreadcrumbJsonLd"
Cohesion: 0.23
Nodes (6): AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), BreadcrumbJsonLd(), ResourcesJsonLd()

### Community 12 - "office-plants-gallery.tsx"
Cohesion: 0.18
Nodes (13): GalleryPage(), easeInCubic(), easeOutCirc(), OfficePlantsGallery(), PlantFrame(), plantImages, SETTLED_POSITIONS, @react-three/drei@^10.7.7 (+5 more)

### Community 13 - "Agri Experience Organization"
Cohesion: 0.20
Nodes (12): Next.js Agent Guidelines & Rules, Agri Experience Organization, Contact & Receipt Email Pipeline, Editorial Design System, ESSETA Seed Program Initiative, Hostinger Production Deployment, Bilingual i18n & Auto-Translate Pipeline, Interactive Mapbox Map (+4 more)

### Community 14 - "team-service.ts"
Cohesion: 0.21
Nodes (14): AdminDashboardPage(), GET(), POST(), POST(), SeedButton(), DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, globalForPrisma (+6 more)

### Community 15 - "getSession"
Cohesion: 0.13
Nodes (16): AdminLayout(), metadata, GET(), GET(), DELETE(), PUT(), DELETE(), PUT() (+8 more)

### Community 16 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 19 - "client-logos.tsx"
Cohesion: 0.40
Nodes (5): ClientLogo, ClientLogos(), LogoItem(), row1Logos, row2Logos

### Community 20 - "auth.ts"
Cohesion: 0.23
Nodes (9): POST(), AdminSessionPayload, JWT_SECRET, SESSION_COOKIE_NAME, signSessionToken(), verifyAdminCredentials(), verifySessionToken(), bcryptjs@^3.0.3 (+1 more)

### Community 21 - "eslint-config-next"
Cohesion: 0.50
Nodes (3): config, eslint-config-next@16.3.3, eslint-config-next

### Community 24 - "packageManager"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

### Community 25 - "overrides"
Cohesion: 0.33
Nodes (6): overrides, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 26 - "resolutions"
Cohesion: 0.33
Nodes (6): resolutions, brace-expansion, postcss, sharp, @types/react, @types/react-dom

### Community 27 - "team/[id]/route.ts"
Cohesion: 0.60
Nodes (4): DELETE(), PUT(), deleteTeamMember(), updateTeamMember()

### Community 29 - "our-team-content.tsx"
Cohesion: 0.17
Nodes (15): AdminTeamPage(), GET(), POST(), OurTeamPage(), revalidate, ImageUploader(), ImageUploaderProps, TeamFormModal() (+7 more)

### Community 31 - "projects/page.tsx"
Cohesion: 0.36
Nodes (6): AdminProjectsPage(), PILLARS, PROJECT_CATEGORIES, ProjectFormModal(), ProjectFormModalProps, ProjectItem

### Community 33 - "resources-service.ts"
Cohesion: 0.14
Nodes (17): AdminResourcesPage(), CATEGORIES, GET(), POST(), ResourcesPage(), revalidate, CATEGORIES, ResourceFormModal() (+9 more)

## Knowledge Gaps
- **5 isolated node(s):** `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment`, `High-Performance Motion Design`, `Resource Library & PDF Preview`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 199 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `react`, `resources-service.ts`, `email.ts`, `next-intl`, `package.json`, `dependencies`, `react`, `BreadcrumbJsonLd`, `team-service.ts`, `getSession`, `client-logos.tsx`, `auth.ts`, `team/[id]/route.ts`, `our-team-content.tsx`?**
  _High betweenness centrality (0.275) - this node is a cross-community bridge._
- **What connects `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07680491551459294 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `resources-service.ts`, `next-intl`, `cn`, `package.json`, `dependencies`, `header.tsx`, `react`, `BreadcrumbJsonLd`, `office-plants-gallery.tsx`, `team-service.ts`, `getSession`, `next`, `our-team-content.tsx`, `projects/page.tsx`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Should `next-intl` be split into smaller, more focused modules?**
  _Cohesion score 0.09086918349429324 - nodes in this community are weakly interconnected._
- **Why does `next-intl` connect `next-intl` to `react`, `resources-service.ts`, `package.json`, `dependencies`, `react`, `BreadcrumbJsonLd`, `office-plants-gallery.tsx`, `next`, `next.config.mjs`, `our-team-content.tsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `email.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08412698412698413 - nodes in this community are weakly interconnected._