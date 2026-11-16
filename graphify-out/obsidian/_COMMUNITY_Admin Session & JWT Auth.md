---
type: community
cohesion: 0.23
members: 16
---

# Admin Session & JWT Auth

**Cohesion:** 0.23 - loosely connected
**Members:** 16 nodes

## Members
- [[AdminSessionPayload]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_EMAIL]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_PASSWORD]] - code - lib/auth.ts
- [[JWT_SECRET]] - code - lib/auth.ts
- [[POST()]] - code - app/api/admin/auth/change-password/route.ts
- [[POST()_1]] - code - app/api/admin/auth/login/route.ts
- [[POST()_2]] - code - app/api/admin/auth/logout/route.ts
- [[SESSION_COOKIE_NAME]] - code - lib/auth.ts
- [[auth.ts]] - code - lib/auth.ts
- [[bcryptjs]] - concept - package.json
- [[change-passwordroute.ts]] - code - app/api/admin/auth/change-password/route.ts
- [[loginroute.ts]] - code - app/api/admin/auth/login/route.ts
- [[logoutroute.ts]] - code - app/api/admin/auth/logout/route.ts
- [[signSessionToken()]] - code - lib/auth.ts
- [[verifyAdminCredentials()]] - code - lib/auth.ts
- [[verifySessionToken()]] - code - lib/auth.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Session__JWT_Auth
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 9 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 7 edges to [[_COMMUNITY_Team & Page Sections API]]
- 3 edges to [[_COMMUNITY_Media Upload & Gallery Scanning]]
- 2 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 2 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 2 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 2 edges to [[_COMMUNITY_Interactive Impact Map & Services]]
- 2 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 2 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 1 edge to [[_COMMUNITY_App Layouts & Global Shell]]
- 1 edge to [[_COMMUNITY_Field Gallery CMS & Showcase]]
- 1 edge to [[_COMMUNITY_Our Work Pillar Pages]]
- 1 edge to [[_COMMUNITY_Core UI & 3D Libraries]]
- 1 edge to [[_COMMUNITY_Dev Dependencies & Tooling]]
- 1 edge to [[_COMMUNITY_Runtime Package Dependencies]]

## Top bridge nodes
- [[auth.ts]] - degree 46, connects to 14 communities
- [[change-passwordroute.ts]] - degree 12, connects to 4 communities
- [[bcryptjs]] - degree 5, connects to 3 communities
- [[POST()]] - degree 4, connects to 2 communities
- [[loginroute.ts]] - degree 6, connects to 1 community