---
type: community
cohesion: 0.23
members: 19
---

# Home & About Page Data Hydration

**Cohesion:** 0.23 - loosely connected
**Members:** 19 nodes

## Members
- [[AboutPage()]] - code - app/[locale]/about/page.tsx
- [[HomeContent()]] - code - components/home-content.tsx
- [[HomePage()]] - code - app/[locale]/page.tsx
- [[localepage.tsx]] - code - app/[locale]/page.tsx
- [[aboutpage.tsx]] - code - app/[locale]/about/page.tsx
- [[createSeedGuard()]] - code - lib/services/service-utils.ts
- [[db.ts]] - code - lib/db.ts
- [[expertise-service.ts]] - code - lib/services/expertise-service.ts
- [[getBeliefs()]] - code - lib/services/beliefs-service.ts
- [[getExpertisePillars()]] - code - lib/services/expertise-service.ts
- [[getPartners()]] - code - lib/services/partners-service.ts
- [[getWhyAgriCards()]] - code - lib/services/why-agri-service.ts
- [[globalForPrisma]] - code - lib/db.ts
- [[isDatabaseConnected()]] - code - lib/db.ts
- [[prisma]] - code - lib/db.ts
- [[revalidate]] - code - app/[locale]/about/page.tsx
- [[revalidate_14]] - code - app/[locale]/page.tsx
- [[service-utils.ts]] - code - lib/services/service-utils.ts
- [[why-agri-service.ts]] - code - lib/services/why-agri-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Home__About_Page_Data_Hydration
SORT file.name ASC
```

## Connections to other communities
- 14 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 11 edges to [[_COMMUNITY_Page Sections API & Client Advisory]]
- 11 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 8 edges to [[_COMMUNITY_Admin Settings UI, Footer & Why-Agri]]
- 8 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 8 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 8 edges to [[_COMMUNITY_Protected Admin API Auth Guards]]
- 6 edges to [[_COMMUNITY_Expertise Pillars Service & ID Resolution]]
- 6 edges to [[_COMMUNITY_Why-Agri Service & ID Resolution]]
- 6 edges to [[_COMMUNITY_Field Gallery Admin & Showcase]]
- 6 edges to [[_COMMUNITY_Field Insights Admin & Public Showcase]]
- 6 edges to [[_COMMUNITY_Pan-African Impact Map & Admin UI]]
- 6 edges to [[_COMMUNITY_Projects Service & Capacity Building]]
- 6 edges to [[_COMMUNITY_Resource Library & PDF Preview]]
- 6 edges to [[_COMMUNITY_Team Service, Roster Admin & Showcase]]
- 5 edges to [[_COMMUNITY_Contact Page & About Content]]
- 5 edges to [[_COMMUNITY_Site Settings & Feature Flag Persistence]]
- 3 edges to [[_COMMUNITY_Admin Expertise UI & Bento Grid]]
- 2 edges to [[_COMMUNITY_Impact Map Data, Merging & Controls]]
- 2 edges to [[_COMMUNITY_Site Header & Language Switcher]]
- 2 edges to [[_COMMUNITY_Admin Login & SEO Route Handlers]]
- 1 edge to [[_COMMUNITY_Admin Partners & Sections Config]]
- 1 edge to [[_COMMUNITY_Runtime Package Dependencies]]

## Top bridge nodes
- [[isDatabaseConnected()]] - degree 41, connects to 13 communities
- [[db.ts]] - degree 21, connects to 13 communities
- [[prisma]] - degree 17, connects to 12 communities
- [[expertise-service.ts]] - degree 26, connects to 8 communities
- [[service-utils.ts]] - degree 14, connects to 8 communities