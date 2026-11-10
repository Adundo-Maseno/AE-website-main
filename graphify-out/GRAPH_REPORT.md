# Graph Report - AE-website-main  (2026-11-10)

## Corpus Check
- 127 files · ~143,693 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 612 nodes · 1310 edges · 38 communities (29 shown, 9 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d52bccb7`
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
- resources-service.ts
- our-team-content.tsx
- projects/page.tsx
- admin/resources/page.tsx
- admin/layout.tsx
- projects/route.ts
- postcss.config.mjs
- optimize_images.sh

## God Nodes (most connected - your core abstractions)
1. `next` - 57 edges
2. `react` - 49 edges
3. `next-intl` - 47 edges
4. `lucide-react` - 42 edges
5. `Link` - 37 edges
6. `RollingText()` - 34 edges
7. `cn()` - 26 edges
8. `framer-motion` - 24 edges
9. `getSession()` - 23 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/auth/session/route.ts → lib/auth.ts
- `POST()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/projects/route.ts → lib/auth.ts
- `PUT()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/resources/[id]/route.ts → lib/auth.ts
- `DELETE()` --calls--> `getSession()`  [EXTRACTED]
  app/api/admin/resources/[id]/route.ts → lib/auth.ts
- `GET()` --calls--> `getResources()`  [EXTRACTED]
  app/api/admin/resources/route.ts → lib/services/resources-service.ts

## Import Cycles
- None detected.

## Communities (38 total, 9 thin omitted)

### Community 0 - "react"
Cohesion: 0.08
Nodes (40): MapPage(), countrySeeds, countrySeedsFr, createGenericProjects(), getCountrySeeds(), cityCoordinates, InteractiveMap(), InteractiveMapbox (+32 more)

### Community 1 - "next-intl"
Cohesion: 0.09
Nodes (45): AboutPage(), ContactPage(), InsightsPage(), NewsletterPage(), OurImpactPage(), CapacityBuildingPage(), ClientAdvisoryPage(), DigitalPlatformsPage() (+37 more)

### Community 2 - "email.ts"
Cohesion: 0.08
Nodes (27): POST(), GET(), getLogoDataUri(), sampleSubmissionEn, sampleSubmissionFr, ContactSubmission, escapeHtml(), generateRespondentAcknowledgmentEmail() (+19 more)

### Community 3 - "cn"
Cohesion: 0.16
Nodes (25): MapSearch(), PremiumSearchProps, Badge(), badgeVariants, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+17 more)

### Community 4 - "package.json"
Cohesion: 0.08
Nodes (35): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, prisma@^6.4.1, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3 (+27 more)

### Community 5 - "dependencies"
Cohesion: 0.06
Nodes (31): dependencies, bcryptjs@^3.0.3, class-variance-authority@^0.7.1, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, gsap@^3.15.0, @gsap/react@^2.1.2 (+23 more)

### Community 6 - "header.tsx"
Cohesion: 0.12
Nodes (16): generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter(), LiquidGlass(), LiquidGlassProps, fragmentShaders, FragmentShaderType (+8 more)

### Community 7 - "react"
Cohesion: 0.10
Nodes (24): AdminTeamPage(), bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, TeamFormModal(), TeamFormModalProps (+16 more)

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
Cohesion: 0.12
Nodes (14): GET(), AboutLayout(), OurImpactLayout(), OurWorkLayout(), ResourcesLayout(), ResourcesPage(), revalidate, BreadcrumbJsonLd() (+6 more)

### Community 12 - "office-plants-gallery.tsx"
Cohesion: 0.18
Nodes (13): GalleryPage(), easeInCubic(), easeOutCirc(), OfficePlantsGallery(), PlantFrame(), plantImages, SETTLED_POSITIONS, @react-three/drei@^10.7.7 (+5 more)

### Community 13 - "Agri Experience Organization"
Cohesion: 0.20
Nodes (12): Next.js Agent Guidelines & Rules, Agri Experience Organization, Contact & Receipt Email Pipeline, Editorial Design System, ESSETA Seed Program Initiative, Hostinger Production Deployment, Bilingual i18n & Auto-Translate Pipeline, Interactive Mapbox Map (+4 more)

### Community 14 - "team-service.ts"
Cohesion: 0.36
Nodes (8): AdminDashboardPage(), POST(), SeedButton(), globalForPrisma, isDatabaseConnected(), prisma, staticProjects, staticTeamMembers

### Community 15 - "getSession"
Cohesion: 0.24
Nodes (11): GET(), DELETE(), PUT(), DELETE(), PUT(), getSession(), verifySessionToken(), deleteProject() (+3 more)

### Community 16 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, lint, postinstall, prepare, preview:emails, start (+1 more)

### Community 19 - "client-logos.tsx"
Cohesion: 0.40
Nodes (5): ClientLogo, ClientLogos(), LogoItem(), row1Logos, row2Logos

### Community 20 - "auth.ts"
Cohesion: 0.23
Nodes (9): POST(), AdminSessionPayload, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, JWT_SECRET, SESSION_COOKIE_NAME, signSessionToken(), verifyAdminCredentials() (+1 more)

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

### Community 28 - "resources-service.ts"
Cohesion: 0.29
Nodes (8): DELETE(), PUT(), POST(), PublicDownload, publicDownloads, createResource(), deleteResource(), updateResource()

### Community 29 - "our-team-content.tsx"
Cohesion: 0.24
Nodes (9): GET(), POST(), OurTeamPage(), revalidate, OurTeamContent(), STATIC_IMAGE_CONFIG, TeamCard, createTeamMember() (+1 more)

### Community 31 - "projects/page.tsx"
Cohesion: 0.39
Nodes (6): AdminProjectsPage(), PILLARS, PROJECT_CATEGORIES, ProjectFormModal(), ProjectFormModalProps, ProjectItem

### Community 33 - "admin/resources/page.tsx"
Cohesion: 0.39
Nodes (6): AdminResourcesPage(), CATEGORIES, CATEGORIES, ResourceFormModal(), ResourceFormModalProps, ResourceItem

### Community 34 - "admin/layout.tsx"
Cohesion: 0.47
Nodes (3): AdminLayout(), metadata, AdminHeader()

### Community 35 - "projects/route.ts"
Cohesion: 0.60
Nodes (4): GET(), POST(), createProject(), getProjects()

## Knowledge Gaps
- **5 isolated node(s):** `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment`, `High-Performance Motion Design`, `Resource Library & PDF Preview`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 197 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `project-implementation/layout.tsx`, `next-intl`, `admin/layout.tsx`, `projects/route.ts`, `email.ts`, `react`, `package.json`, `react`, `dependencies`, `BreadcrumbJsonLd`, `team-service.ts`, `getSession`, `client-logos.tsx`, `auth.ts`, `insights/layout.tsx`, `resources-service.ts`, `our-team-content.tsx`, `client-advisory/layout.tsx`?**
  _High betweenness centrality (0.270) - this node is a cross-community bridge._
- **What connects `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08311688311688312 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `react`, `admin/resources/page.tsx`, `next-intl`, `cn`, `package.json`, `dependencies`, `header.tsx`, `BreadcrumbJsonLd`, `office-plants-gallery.tsx`, `team-service.ts`, `our-team-content.tsx`, `projects/page.tsx`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Should `next-intl` be split into smaller, more focused modules?**
  _Cohesion score 0.08902691511387163 - nodes in this community are weakly interconnected._
- **Why does `next-intl` connect `next-intl` to `project-implementation/layout.tsx`, `react`, `package.json`, `dependencies`, `react`, `BreadcrumbJsonLd`, `office-plants-gallery.tsx`, `next`, `next.config.mjs`, `insights/layout.tsx`, `our-team-content.tsx`, `client-advisory/layout.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `email.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07823613086770982 - nodes in this community are weakly interconnected._