---
type: community
cohesion: 0.43
members: 8
---

# Home Page Data Hydration

**Cohesion:** 0.43 - moderately connected
**Members:** 8 nodes

## Members
- [[HomePage()]] - code - app/[locale]/page.tsx
- [[POST()_12]] - code - app/api/admin/seed/route.ts
- [[localepage.tsx]] - code - app/[locale]/page.tsx
- [[getBeliefs()]] - code - lib/services/beliefs-service.ts
- [[getPartners()]] - code - lib/services/partners-service.ts
- [[getWhyAgriCards()]] - code - lib/services/why-agri-service.ts
- [[isDatabaseConnected()]] - code - lib/db.ts
- [[revalidate_14]] - code - app/[locale]/page.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Home_Page_Data_Hydration
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 5 edges to [[_COMMUNITY_Our Work Pillar Pages]]
- 4 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 4 edges to [[_COMMUNITY_Team & Page Sections API]]
- 4 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 3 edges to [[_COMMUNITY_Localized Metadata & Home Sections]]
- 3 edges to [[_COMMUNITY_Interactive Impact Map & Services]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 2 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 2 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 2 edges to [[_COMMUNITY_Field Gallery CMS & Showcase]]
- 2 edges to [[_COMMUNITY_Resources Library & Metadata Layouts]]
- 1 edge to [[_COMMUNITY_About & Services Bento Grid]]
- 1 edge to [[_COMMUNITY_Insights Service & API Routes]]
- 1 edge to [[_COMMUNITY_Public Insights Page & Content]]
- 1 edge to [[_COMMUNITY_App Layouts & Global Shell]]
- 1 edge to [[_COMMUNITY_Admin Media & Content Modals]]

## Top bridge nodes
- [[isDatabaseConnected()]] - degree 39, connects to 17 communities
- [[localepage.tsx]] - degree 13, connects to 7 communities
- [[HomePage()]] - degree 6, connects to 2 communities
- [[POST()_12]] - degree 3, connects to 2 communities
- [[getBeliefs()]] - degree 4, connects to 1 community