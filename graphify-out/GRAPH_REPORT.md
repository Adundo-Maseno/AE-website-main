# Graph Report - AE-website-main  (2026-11-09)

## Corpus Check
- 96 files · ~130,548 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 494 nodes · 999 edges · 41 communities (21 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7f7a2b9b`
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
- [locale]/layout.tsx
- components.json
- compilerOptions
- overrides
- next
- office-plants-gallery.tsx
- Agri Experience Organization
- interactive-map.tsx
- class-variance-authority
- scripts
- language-switch-provider.tsx
- client-logos.tsx
- eslint-config-next
- next.config.mjs
- packageManager
- overrides
- resolutions
- nodemailer
- three
- postcss.config.mjs
- optimize_images.sh
- @radix-ui/react-popover

## God Nodes (most connected - your core abstractions)
1. `next-intl` - 47 edges
2. `next` - 37 edges
3. `react` - 37 edges
4. `Link` - 37 edges
5. `RollingText()` - 34 edges
6. `lucide-react` - 32 edges
7. `cn()` - 26 edges
8. `framer-motion` - 24 edges
9. `compilerOptions` - 16 edges
10. `InteractiveMapbox()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `OurImpactPage()` --calls--> `InteractiveMap()`  [EXTRACTED]
  app/[locale]/our-impact/page.tsx → components/interactive-map.tsx
- `MapPage()` --calls--> `InteractiveMapbox()`  [EXTRACTED]
  app/[locale]/map/page.tsx → components/map/interactive-mapbox.tsx
- `Badge()` --calls--> `cn()`  [EXTRACTED]
  components/ui/badge.tsx → lib/utils.ts
- `Button()` --calls--> `cn()`  [EXTRACTED]
  components/ui/button.tsx → lib/utils.ts
- `ContactPage()` --calls--> `RollingText()`  [EXTRACTED]
  app/[locale]/contact/page.tsx → components/ui/rolling-text.tsx

## Import Cycles
- None detected.

## Communities (41 total, 20 thin omitted)

### Community 0 - "react"
Cohesion: 0.11
Nodes (26): MapPage(), getCategoryIcon(), InteractiveMapbox(), SelectedLocation, MapActiveProjectFlyTo(), MapAutoCenter(), MapAutoCenterProps, MapContext (+18 more)

### Community 1 - "next-intl"
Cohesion: 0.08
Nodes (46): AboutPage(), ContactPage(), InsightsPage(), NewsletterPage(), OurImpactPage(), TeamMember, CapacityBuildingPage(), ClientAdvisoryPage() (+38 more)

### Community 2 - "email.ts"
Cohesion: 0.08
Nodes (25): POST(), GET(), getLogoDataUri(), sampleSubmissionEn, sampleSubmissionFr, ContactSubmission, escapeHtml(), generateRespondentAcknowledgmentEmail() (+17 more)

### Community 3 - "cn"
Cohesion: 0.17
Nodes (23): MapSearch(), PremiumSearchProps, Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem() (+15 more)

### Community 4 - "package.json"
Cohesion: 0.09
Nodes (30): devDependencies, eslint@10.9.1, husky@^9.1.7, postcss@^8.5.25, tailwindcss@^4.2.0, @tailwindcss/postcss@^4.2.0, tw-animate-css@1.3.3, @types/mapbox-gl@^3.4.1 (+22 more)

### Community 5 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, clsx@^2.1.1, cmdk@1.1.1, framer-motion@^12.39.0, gsap@^3.15.0, @gsap/react@^2.1.2, lucide-react@^0.564.0, mapbox-gl@^3.24.0 (+19 more)

### Community 6 - "header.tsx"
Cohesion: 0.10
Nodes (22): AnimatedHamburger(), Header(), navItems, triggerLanguageSwitch(), generateShaderDisplacementMap(), getMap(), GlassContainer, GlassFilter() (+14 more)

### Community 7 - "[locale]/layout.tsx"
Cohesion: 0.17
Nodes (12): bebasNeue, dmSans, playfairDisplay, RootLayout(), spaceGrotesk, CookieToast(), Footer(), linkStyle (+4 more)

### Community 8 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 9 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "overrides"
Cohesion: 0.12
Nodes (16): allowBuilds, @parcel/watcher, sharp, @swc/core, unrs-resolver, minimumReleaseAgeExclude, overrides, brace-expansion (+8 more)

### Community 12 - "office-plants-gallery.tsx"
Cohesion: 0.36
Nodes (7): GalleryPage(), easeInCubic(), easeOutCirc(), OfficePlantsGallery(), PlantFrame(), plantImages, SETTLED_POSITIONS

### Community 13 - "Agri Experience Organization"
Cohesion: 0.20
Nodes (12): Next.js Agent Guidelines & Rules, Agri Experience Organization, Contact & Receipt Email Pipeline, Editorial Design System, ESSETA Seed Program Initiative, Hostinger Production Deployment, Bilingual i18n & Auto-Translate Pipeline, Interactive Mapbox Map (+4 more)

### Community 14 - "interactive-map.tsx"
Cohesion: 0.20
Nodes (16): countrySeeds, countrySeedsFr, createGenericProjects(), getCountrySeeds(), cityCoordinates, InteractiveMap(), InteractiveMapbox, InteractiveMapboxProps (+8 more)

### Community 15 - "class-variance-authority"
Cohesion: 0.20
Nodes (6): class-variance-authority@^0.7.1, @radix-ui/react-slot@1.2.4, @react-three/drei@^10.7.7, class-variance-authority, @radix-ui/react-slot, @react-three/drei

### Community 16 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, prepare, preview:emails, start, translate

### Community 19 - "client-logos.tsx"
Cohesion: 0.40
Nodes (5): ClientLogo, ClientLogos(), LogoItem(), row1Logos, row2Logos

### Community 21 - "eslint-config-next"
Cohesion: 0.50
Nodes (3): config, eslint-config-next@16.3.3, eslint-config-next

### Community 24 - "packageManager"
Cohesion: 0.50
Nodes (4): devEngines, packageManager, name, onFail

### Community 25 - "overrides"
Cohesion: 0.50
Nodes (4): overrides, brace-expansion, postcss, sharp

### Community 26 - "resolutions"
Cohesion: 0.50
Nodes (4): resolutions, brace-expansion, postcss, sharp

## Knowledge Gaps
- **5 isolated node(s):** `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment`, `High-Performance Motion Design`, `Resource Library & PDF Preview`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 184 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `next-intl`, `email.ts`, `package.json`, `dependencies`, `header.tsx`, `[locale]/layout.tsx`, `interactive-map.tsx`, `language-switch-provider.tsx`, `stakeholder-convenings/layout.tsx`, `client-logos.tsx`, `technical-studies/layout.tsx`, `about/layout.tsx`, `contact/layout.tsx`, `insights/layout.tsx`, `newsletter/layout.tsx`, `our-impact/layout.tsx`, `resources/layout.tsx`, `client-advisory/layout.tsx`, `our-work/layout.tsx`, `project-implementation/layout.tsx`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **What connects `Next.js Agent Guidelines & Rules`, `Editorial Design System`, `Hostinger Production Deployment` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.11265969802555169 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `next-intl`, `cn`, `package.json`, `dependencies`, `header.tsx`, `[locale]/layout.tsx`, `office-plants-gallery.tsx`, `interactive-map.tsx`, `language-switch-provider.tsx`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Should `next-intl` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `next-intl` connect `next-intl` to `react`, `package.json`, `dependencies`, `header.tsx`, `[locale]/layout.tsx`, `next`, `office-plants-gallery.tsx`, `interactive-map.tsx`, `stakeholder-convenings/layout.tsx`, `technical-studies/layout.tsx`, `next.config.mjs`, `about/layout.tsx`, `contact/layout.tsx`, `insights/layout.tsx`, `newsletter/layout.tsx`, `our-impact/layout.tsx`, `resources/layout.tsx`, `client-advisory/layout.tsx`, `our-work/layout.tsx`, `project-implementation/layout.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `email.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08412698412698413 - nodes in this community are weakly interconnected._