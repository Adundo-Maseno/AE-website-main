---
type: community
cohesion: 0.22
members: 15
---

# Protected Admin API Auth Guards

**Cohesion:** 0.22 - loosely connected
**Members:** 15 nodes

## Members
- [[GET()]] - code - app/api/admin/auth/change-password/route.ts
- [[GET()_1]] - code - app/api/admin/auth/session/route.ts
- [[GET()_3]] - code - app/api/admin/expertise/route.ts
- [[GET()_15]] - code - app/api/admin/why-agri/route.ts
- [[POST()_4]] - code - app/api/admin/expertise/route.ts
- [[POST()_15]] - code - app/api/admin/why-agri/route.ts
- [[createExpertisePillar()]] - code - lib/services/expertise-service.ts
- [[createWhyAgriCard()]] - code - lib/services/why-agri-service.ts
- [[expertiseroute.ts]] - code - app/api/admin/expertise/route.ts
- [[getAllExpertisePillarsAdmin()]] - code - lib/services/expertise-service.ts
- [[getAllWhyAgriCardsAdmin()]] - code - lib/services/why-agri-service.ts
- [[getSession()]] - code - lib/auth.ts
- [[sessionroute.ts]] - code - app/api/admin/auth/session/route.ts
- [[verifySessionToken()]] - code - lib/auth.ts
- [[why-agriroute.ts]] - code - app/api/admin/why-agri/route.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Protected_Admin_API_Auth_Guards
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 8 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 8 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 6 edges to [[_COMMUNITY_Field Gallery Admin & Showcase]]
- 6 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 6 edges to [[_COMMUNITY_Field Insights Admin & Public Showcase]]
- 6 edges to [[_COMMUNITY_Pan-African Impact Map & Admin UI]]
- 6 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 6 edges to [[_COMMUNITY_Projects Service & Capacity Building]]
- 6 edges to [[_COMMUNITY_Resource Library & PDF Preview]]
- 6 edges to [[_COMMUNITY_Team Service, Roster Admin & Showcase]]
- 4 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 4 edges to [[_COMMUNITY_Expertise Pillars Service & ID Resolution]]
- 4 edges to [[_COMMUNITY_Why-Agri Service & ID Resolution]]
- 3 edges to [[_COMMUNITY_Admin Login & SEO Route Handlers]]
- 3 edges to [[_COMMUNITY_Page Sections API & Client Advisory]]
- 3 edges to [[_COMMUNITY_Site Settings & Feature Flag Persistence]]
- 2 edges to [[_COMMUNITY_Admin Layout Shell & Navigation]]

## Top bridge nodes
- [[getSession()]] - degree 85, connects to 16 communities
- [[expertiseroute.ts]] - degree 8, connects to 3 communities
- [[why-agriroute.ts]] - degree 8, connects to 3 communities
- [[createExpertisePillar()]] - degree 5, connects to 3 communities
- [[createWhyAgriCard()]] - degree 5, connects to 3 communities