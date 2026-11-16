---
type: community
cohesion: 0.33
members: 9
---

# Admin Expertise UI & Bento Grid

**Cohesion:** 0.33 - loosely connected
**Members:** 9 nodes

## Members
- [[AboutContentProps]] - code - components/about-content.tsx
- [[AdminExpertisePage()]] - code - app/admin/expertise/page.tsx
- [[ExpertiseFormModal()]] - code - components/admin/expertise-form-modal.tsx
- [[ExpertiseFormModalProps]] - code - components/admin/expertise-form-modal.tsx
- [[ExpertisePillarData]] - code - lib/services/expertise-service.ts
- [[ROUTE_OPTIONS]] - code - components/admin/expertise-form-modal.tsx
- [[ServicesBentoGridProps]] - code - components/motion/services-bento-grid.tsx
- [[expertise-form-modal.tsx]] - code - components/admin/expertise-form-modal.tsx
- [[expertisepage.tsx]] - code - app/admin/expertise/page.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Expertise_UI__Bento_Grid
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Admin Settings UI, Footer & Why-Agri]]
- 3 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 2 edges to [[_COMMUNITY_Impact Map Data, Merging & Controls]]
- 2 edges to [[_COMMUNITY_Contact Page & About Content]]
- 2 edges to [[_COMMUNITY_Site Header & Language Switcher]]

## Top bridge nodes
- [[expertise-form-modal.tsx]] - degree 8, connects to 3 communities
- [[ExpertisePillarData]] - degree 8, connects to 3 communities
- [[expertisepage.tsx]] - degree 7, connects to 3 communities
- [[AboutContentProps]] - degree 3, connects to 2 communities
- [[ServicesBentoGridProps]] - degree 3, connects to 2 communities