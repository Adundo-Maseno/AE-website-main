---
type: community
cohesion: 0.39
members: 8
---

# Team Service & ID Resolution

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[DELETE()_8]] - code - app/api/admin/team/[id]/route.ts
- [[PUT()_9]] - code - app/api/admin/team/[id]/route.ts
- [[deleteTeamMember()]] - code - lib/services/team-service.ts
- [[ensureSeeded()_8]] - code - lib/services/team-service.ts
- [[resolveTeamMemberId()]] - code - lib/services/team-service.ts
- [[seedGuard_8]] - code - lib/services/team-service.ts
- [[teamidroute.ts]] - code - app/api/admin/team/[id]/route.ts
- [[updateTeamMember()]] - code - lib/services/team-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Team_Service__ID_Resolution
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 4 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 1 edge to [[_COMMUNITY_Admin Session & JWT Auth]]
- 1 edge to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 1 edge to [[_COMMUNITY_Beliefs Service & API Routes]]

## Top bridge nodes
- [[teamidroute.ts]] - degree 8, connects to 4 communities
- [[updateTeamMember()]] - degree 6, connects to 2 communities
- [[ensureSeeded()_8]] - degree 5, connects to 2 communities
- [[deleteTeamMember()]] - degree 5, connects to 1 community
- [[DELETE()_8]] - degree 3, connects to 1 community