---
type: community
cohesion: 0.20
members: 19
---

# Admin Session, JWT & Credentials API

**Cohesion:** 0.20 - loosely connected
**Members:** 19 nodes

## Members
- [[AdminSessionPayload]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_EMAIL]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_PASSWORD]] - code - lib/auth.ts
- [[JWT_SECRET]] - code - lib/auth.ts
- [[LOCAL_CREDENTIALS_PATH]] - code - lib/auth.ts
- [[LocalAdminCredentials]] - code - lib/auth.ts
- [[POST()]] - code - app/api/admin/auth/change-password/route.ts
- [[POST()_1]] - code - app/api/admin/auth/login/route.ts
- [[POST()_2]] - code - app/api/admin/auth/logout/route.ts
- [[SESSION_COOKIE_NAME]] - code - lib/auth.ts
- [[auth.ts]] - code - lib/auth.ts
- [[bcryptjs]] - concept - package.json
- [[change-passwordroute.ts]] - code - app/api/admin/auth/change-password/route.ts
- [[loginroute.ts]] - code - app/api/admin/auth/login/route.ts
- [[logoutroute.ts]] - code - app/api/admin/auth/logout/route.ts
- [[readLocalAdminCredentials()]] - code - lib/auth.ts
- [[signSessionToken()]] - code - lib/auth.ts
- [[verifyAdminCredentials()]] - code - lib/auth.ts
- [[writeLocalAdminCredentials()]] - code - lib/auth.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Session_JWT__Credentials_API
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_Protected Admin API Auth Guards]]
- 8 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 5 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 5 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 4 edges to [[_COMMUNITY_Admin Login & SEO Route Handlers]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 2 edges to [[_COMMUNITY_Field Gallery Admin & Showcase]]
- 2 edges to [[_COMMUNITY_Field Insights Admin & Public Showcase]]
- 2 edges to [[_COMMUNITY_Pan-African Impact Map & Admin UI]]
- 2 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 2 edges to [[_COMMUNITY_Projects Service & Capacity Building]]
- 2 edges to [[_COMMUNITY_Resource Library & PDF Preview]]
- 2 edges to [[_COMMUNITY_Team Service, Roster Admin & Showcase]]
- 2 edges to [[_COMMUNITY_Runtime Package Dependencies]]
- 1 edge to [[_COMMUNITY_Admin Layout Shell & Navigation]]
- 1 edge to [[_COMMUNITY_Expertise Pillars Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Page Sections API & Client Advisory]]
- 1 edge to [[_COMMUNITY_Site Settings & Feature Flag Persistence]]
- 1 edge to [[_COMMUNITY_Why-Agri Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Dev Dependencies & ESLint Config]]

## Top bridge nodes
- [[auth.ts]] - degree 53, connects to 19 communities
- [[change-passwordroute.ts]] - degree 15, connects to 3 communities
- [[bcryptjs]] - degree 5, connects to 3 communities
- [[POST()]] - degree 6, connects to 2 communities
- [[loginroute.ts]] - degree 6, connects to 1 community