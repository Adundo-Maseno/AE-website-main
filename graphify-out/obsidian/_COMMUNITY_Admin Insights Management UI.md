---
type: community
cohesion: 0.60
members: 6
---

# Admin Insights Management UI

**Cohesion:** 0.60 - moderately connected
**Members:** 6 nodes

## Members
- [[AdminInsightsPage()]] - code - app/admin/insights/page.tsx
- [[InsightFormModal()]] - code - components/admin/insight-form-modal.tsx
- [[InsightFormModalProps]] - code - components/admin/insight-form-modal.tsx
- [[InsightItem]] - code - lib/services/insights-service.ts
- [[admininsightspage.tsx]] - code - app/admin/insights/page.tsx
- [[insight-form-modal.tsx]] - code - components/admin/insight-form-modal.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Insights_Management_UI
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 2 edges to [[_COMMUNITY_Footer Settings & PDF Preview]]
- 2 edges to [[_COMMUNITY_Interactive Impact Map & Services]]
- 1 edge to [[_COMMUNITY_Our Work Client Views]]

## Top bridge nodes
- [[admininsightspage.tsx]] - degree 7, connects to 3 communities
- [[insight-form-modal.tsx]] - degree 7, connects to 3 communities
- [[InsightItem]] - degree 5, connects to 2 communities