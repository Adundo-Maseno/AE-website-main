---
type: community
cohesion: 0.23
members: 13
---

# Media Upload & Gallery Scanning

**Cohesion:** 0.23 - loosely connected
**Members:** 13 nodes

## Members
- [[ALLOWED_MIME_TYPES]] - code - app/api/admin/upload/route.ts
- [[GET()_4]] - code - app/api/admin/gallery/route.ts
- [[GET()_8]] - code - app/api/admin/pdf-gallery/route.ts
- [[POST()_14]] - code - app/api/admin/upload/route.ts
- [[PdfFileItem]] - code - app/api/admin/pdf-gallery/route.ts
- [[formatBytes()]] - code - app/api/admin/pdf-gallery/route.ts
- [[galleryroute.ts]] - code - app/api/admin/gallery/route.ts
- [[pdf-galleryroute.ts]] - code - app/api/admin/pdf-gallery/route.ts
- [[ref_fs]] - concept
- [[ref_path]] - concept
- [[scanAllUploads()]] - code - app/api/admin/gallery/route.ts
- [[scanDirectory()]] - code - app/api/admin/gallery/route.ts
- [[uploadroute.ts]] - code - app/api/admin/upload/route.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Media_Upload__Gallery_Scanning
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 4 edges to [[_COMMUNITY_Contact & Email Templates]]
- 3 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 3 edges to [[_COMMUNITY_Team & Page Sections API]]
- 2 edges to [[_COMMUNITY_Email Preview CLI Script]]
- 1 edge to [[_COMMUNITY_i18n Auto-Translation Script]]

## Top bridge nodes
- [[galleryroute.ts]] - degree 8, connects to 3 communities
- [[pdf-galleryroute.ts]] - degree 8, connects to 3 communities
- [[uploadroute.ts]] - degree 7, connects to 3 communities
- [[ref_fs]] - degree 7, connects to 3 communities
- [[ref_path]] - degree 6, connects to 2 communities