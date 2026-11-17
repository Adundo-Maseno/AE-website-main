---
type: community
cohesion: 0.27
members: 14
---

# Team Service & API Routes

**Cohesion:** 0.27 - loosely connected
**Members:** 14 nodes

## Members
- [[DELETE()_8]] - code - app/api/admin/team/[id]/route.ts
- [[GET()_14]] - code - app/api/admin/team/route.ts
- [[POST()_13]] - code - app/api/admin/team/route.ts
- [[PUT()_9]] - code - app/api/admin/team/[id]/route.ts
- [[createTeamMember()]] - code - lib/services/team-service.ts
- [[deleteTeamMember()]] - code - lib/services/team-service.ts
- [[ensureSeeded()_8]] - code - lib/services/team-service.ts
- [[resolveTeamMemberId()]] - code - lib/services/team-service.ts
- [[seedGuard_8]] - code - lib/services/team-service.ts
- [[staticTeamMembers]] - code - lib/services/team-service.ts
- [[team-service.ts]] - code - lib/services/team-service.ts
- [[teamidroute.ts]] - code - app/api/admin/team/[id]/route.ts
- [[teamroute.ts]] - code - app/api/admin/team/route.ts
- [[updateTeamMember()]] - code - lib/services/team-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Team_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 6 edges to [[_COMMUNITY_Protected Admin API Routes (Projects & Gallery)]]
- 5 edges to [[_COMMUNITY_Our Team Page & Roster Showcase]]
- 4 edges to [[_COMMUNITY_Expertise Pillars Service & API Routes]]
- 3 edges to [[_COMMUNITY_Admin Gallery, Partners, Projects & Sections]]
- 3 edges to [[_COMMUNITY_Sections API, Terms & SEO Routes]]
- 2 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 1 edge to [[_COMMUNITY_Home Page & Partners API Routes]]

## Top bridge nodes
- [[team-service.ts]] - degree 24, connects to 6 communities
- [[teamroute.ts]] - degree 8, connects to 4 communities
- [[teamidroute.ts]] - degree 8, connects to 3 communities
- [[GET()_14]] - degree 3, connects to 2 communities
- [[updateTeamMember()]] - degree 6, connects to 1 community