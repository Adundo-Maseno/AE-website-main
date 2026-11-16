---
type: community
cohesion: 0.22
members: 27
---

# Admin Dashboard & DB Seeding

**Cohesion:** 0.22 - loosely connected
**Members:** 27 nodes

## Members
- [[AdminDashboardPage()]] - code - app/admin/page.tsx
- [[PublicDownload]] - code - lib/public-downloads.ts
- [[SeedButton()]] - code - components/admin/seed-button.tsx
- [[adminpage.tsx]] - code - app/admin/page.tsx
- [[countrySeeds]] - code - components/country-data.ts
- [[createSeedGuard()]] - code - lib/services/service-utils.ts
- [[db.ts]] - code - lib/db.ts
- [[expertise-service.ts]] - code - lib/services/expertise-service.ts
- [[globalForPrisma]] - code - lib/db.ts
- [[isDatabaseConnected()]] - code - lib/db.ts
- [[map-service.ts]] - code - lib/services/map-service.ts
- [[prisma]] - code - lib/db.ts
- [[projects-service.ts]] - code - lib/services/projects-service.ts
- [[public-downloads.ts]] - code - lib/public-downloads.ts
- [[publicDownloads]] - code - lib/public-downloads.ts
- [[seed-button.tsx]] - code - components/admin/seed-button.tsx
- [[seedroute.ts]] - code - app/api/admin/seed/route.ts
- [[service-utils.ts]] - code - lib/services/service-utils.ts
- [[staticBeliefs]] - code - lib/services/beliefs-service.ts
- [[staticExpertisePillars]] - code - lib/services/expertise-service.ts
- [[staticGalleryItems]] - code - lib/services/gallery-service.ts
- [[staticPartners]] - code - lib/services/partners-service.ts
- [[staticProjects]] - code - lib/services/projects-service.ts
- [[staticTeamMembers]] - code - lib/services/team-service.ts
- [[staticWhyAgriCards]] - code - lib/services/why-agri-service.ts
- [[team-service.ts]] - code - lib/services/team-service.ts
- [[why-agri-service.ts]] - code - lib/services/why-agri-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Dashboard__DB_Seeding
SORT file.name ASC
```

## Connections to other communities
- 17 edges to [[_COMMUNITY_Impact Map Country Data & Services]]
- 15 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 15 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 15 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 11 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 10 edges to [[_COMMUNITY_Admin Philosophy, Insights & Form Modals]]
- 10 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 10 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 9 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 8 edges to [[_COMMUNITY_Gallery Items Service & API Routes]]
- 8 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 7 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 7 edges to [[_COMMUNITY_Page Sections API & Work Overview]]
- 6 edges to [[_COMMUNITY_Client Advisory & Projects API]]
- 6 edges to [[_COMMUNITY_Map Country Service & ID Resolution]]
- 6 edges to [[_COMMUNITY_Projects Service & ID Resolution]]
- 6 edges to [[_COMMUNITY_Team Service & ID Resolution]]
- 5 edges to [[_COMMUNITY_About Page & Expertise Bento Grid]]
- 5 edges to [[_COMMUNITY_Our Work Pillar Client Views & Admin]]
- 5 edges to [[_COMMUNITY_Admin Content Pages & Sections Config]]
- 4 edges to [[_COMMUNITY_Public Team Showcase & Bio Cards]]
- 3 edges to [[_COMMUNITY_Resource Library & PDF Preview]]
- 2 edges to [[_COMMUNITY_Digital Platforms Pillar Page]]
- 2 edges to [[_COMMUNITY_Project Implementation Pillar Page]]
- 2 edges to [[_COMMUNITY_Stakeholder Convenings Pillar Page]]
- 2 edges to [[_COMMUNITY_Technical Studies & Scroll Accordion]]
- 1 edge to [[_COMMUNITY_Interactive Mapbox Canvas & Controls]]
- 1 edge to [[_COMMUNITY_Runtime Package Dependencies]]
- 1 edge to [[_COMMUNITY_Field Gallery Service & Showcase]]

## Top bridge nodes
- [[isDatabaseConnected()]] - degree 39, connects to 17 communities
- [[seedroute.ts]] - degree 35, connects to 9 communities
- [[projects-service.ts]] - degree 34, connects to 9 communities
- [[db.ts]] - degree 21, connects to 9 communities
- [[adminpage.tsx]] - degree 28, connects to 8 communities