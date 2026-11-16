---
type: community
cohesion: 0.33
members: 11
---

# Site Settings & Feature Flag Persistence

**Cohesion:** 0.33 - loosely connected
**Members:** 11 nodes

## Members
- [[GET()_13]] - code - app/api/admin/settings/route.ts
- [[LOCAL_SETTINGS_CACHE_PATH]] - code - lib/services/settings-service.ts
- [[PUT()_8]] - code - app/api/admin/settings/route.ts
- [[defaultSiteSettings]] - code - lib/services/settings-service.ts
- [[getSiteSettings()]] - code - lib/services/settings-service.ts
- [[parseFeatureFlags()]] - code - lib/services/settings-service.ts
- [[readLocalSettingsCache()]] - code - lib/services/settings-service.ts
- [[settings-service.ts]] - code - lib/services/settings-service.ts
- [[settingsroute.ts]] - code - app/api/admin/settings/route.ts
- [[updateSiteSettings()]] - code - lib/services/settings-service.ts
- [[writeLocalSettingsCache()]] - code - lib/services/settings-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Site_Settings__Feature_Flag_Persistence
SORT file.name ASC
```

## Connections to other communities
- 5 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 5 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 3 edges to [[_COMMUNITY_Contact Page & About Content]]
- 3 edges to [[_COMMUNITY_Root Localized Layout, Fonts & Docs]]
- 3 edges to [[_COMMUNITY_Admin Settings UI, Footer & Why-Agri]]
- 3 edges to [[_COMMUNITY_Protected Admin API Auth Guards]]
- 2 edges to [[_COMMUNITY_Admin Login & SEO Route Handlers]]
- 2 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 1 edge to [[_COMMUNITY_Admin Session, JWT & Credentials API]]

## Top bridge nodes
- [[settings-service.ts]] - degree 21, connects to 7 communities
- [[getSiteSettings()]] - degree 13, connects to 4 communities
- [[settingsroute.ts]] - degree 8, connects to 3 communities
- [[updateSiteSettings()]] - degree 6, connects to 1 community
- [[GET()_13]] - degree 3, connects to 1 community