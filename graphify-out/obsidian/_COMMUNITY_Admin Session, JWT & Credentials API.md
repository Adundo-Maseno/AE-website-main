---
type: community
cohesion: 0.16
members: 22
---

# Admin Session, JWT & Credentials API

**Cohesion:** 0.16 - loosely connected
**Members:** 22 nodes

## Members
- [[AdminSessionPayload]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_EMAIL]] - code - lib/auth.ts
- [[DEFAULT_ADMIN_PASSWORD]] - code - lib/auth.ts
- [[GET()]] - code - app/api/admin/auth/change-password/route.ts
- [[JWT_SECRET]] - code - lib/auth.ts
- [[LOCAL_CREDENTIALS_PATH]] - code - lib/auth.ts
- [[LocalAdminCredentials]] - code - lib/auth.ts
- [[POST()]] - code - app/api/admin/auth/change-password/route.ts
- [[POST()_1]] - code - app/api/admin/auth/login/route.ts
- [[POST()_2]] - code - app/api/admin/auth/logout/route.ts
- [[SESSION_COOKIE_NAME]] - code - lib/auth.ts
- [[auth.ts]] - code - lib/auth.ts
- [[bcryptjs]] - concept - package.json
- [[bcryptjs@3.0.3]] - code - package.json
- [[change-passwordroute.ts]] - code - app/api/admin/auth/change-password/route.ts
- [[loginroute.ts]] - code - app/api/admin/auth/login/route.ts
- [[logoutroute.ts]] - code - app/api/admin/auth/logout/route.ts
- [[readLocalAdminCredentials()]] - code - lib/auth.ts
- [[signSessionToken()]] - code - lib/auth.ts
- [[verifyAdminCredentials()]] - code - lib/auth.ts
- [[verifySessionToken()]] - code - lib/auth.ts
- [[writeLocalAdminCredentials()]] - code - lib/auth.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Session_JWT__Credentials_API
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 9 edges to [[_COMMUNITY_Protected Admin API Routes (Projects & Gallery)]]
- 6 edges to [[_COMMUNITY_Home Page & Partners API Routes]]
- 5 edges to [[_COMMUNITY_Sections API, Terms & SEO Routes]]
- 5 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 2 edges to [[_COMMUNITY_Expertise Pillars Service & API Routes]]
- 2 edges to [[_COMMUNITY_Field Insights Service, API & Public View]]
- 2 edges to [[_COMMUNITY_Impact Map Service & API Routes]]
- 2 edges to [[_COMMUNITY_Resources Service & API Routes]]
- 2 edges to [[_COMMUNITY_Team Service & API Routes]]
- 2 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 2 edges to [[_COMMUNITY_Runtime Package Dependencies]]
- 1 edge to [[_COMMUNITY_Admin Layout Shell & Header]]
- 1 edge to [[_COMMUNITY_Gallery Item Service & Route Handlers]]
- 1 edge to [[_COMMUNITY_Admin Settings UI & Contact Page]]
- 1 edge to [[_COMMUNITY_Dev Dependencies & Tooling]]

## Top bridge nodes
- [[auth.ts]] - degree 53, connects to 16 communities
- [[change-passwordroute.ts]] - degree 15, connects to 4 communities
- [[POST()]] - degree 6, connects to 2 communities
- [[bcryptjs]] - degree 5, connects to 2 communities
- [[loginroute.ts]] - degree 6, connects to 1 community