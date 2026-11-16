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
- 11 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 8 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 5 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 3 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 2 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 2 edges to [[_COMMUNITY_Gallery Items Service & API Routes]]
- 2 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 2 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 2 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 2 edges to [[_COMMUNITY_Runtime Package Dependencies]]
- 1 edge to [[_COMMUNITY_Admin Philosophy, Insights & Form Modals]]
- 1 edge to [[_COMMUNITY_Map Country Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Impact Map Country Data & Services]]
- 1 edge to [[_COMMUNITY_Projects Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Client Advisory & Projects API]]
- 1 edge to [[_COMMUNITY_Page Sections API & Work Overview]]
- 1 edge to [[_COMMUNITY_Team Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Dev Dependencies & Tooling]]

## Top bridge nodes
- [[auth.ts]] - degree 46, connects to 18 communities
- [[change-passwordroute.ts]] - degree 12, connects to 3 communities
- [[bcryptjs]] - degree 5, connects to 3 communities
- [[POST()]] - degree 4, connects to 2 communities
- [[loginroute.ts]] - degree 6, connects to 1 community