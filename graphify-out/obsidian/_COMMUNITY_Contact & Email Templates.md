---
type: community
cohesion: 0.27
members: 15
---

# Contact & Email Templates

**Cohesion:** 0.27 - loosely connected
**Members:** 15 nodes

## Members
- [[ContactSubmission]] - code - lib/email.ts
- [[GET()_15]] - code - app/api/email-preview/route.ts
- [[POST()_16]] - code - app/api/contact/route.ts
- [[contactroute.ts]] - code - app/api/contact/route.ts
- [[email-previewroute.ts]] - code - app/api/email-preview/route.ts
- [[email.ts]] - code - lib/email.ts
- [[escapeHtml()]] - code - lib/email.ts
- [[generateRespondentAcknowledgmentEmail()]] - code - lib/email.ts
- [[generateTeamNotificationEmail()]] - code - lib/email.ts
- [[getLogoAttachment()]] - code - lib/email.ts
- [[getLogoDataUri()]] - code - app/api/email-preview/route.ts
- [[getMailTransporter()]] - code - lib/email.ts
- [[sampleSubmissionEn]] - code - app/api/email-preview/route.ts
- [[sampleSubmissionFr]] - code - app/api/email-preview/route.ts
- [[sendContactEmails()]] - code - lib/email.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Contact__Email_Templates
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Media Upload & Gallery Scanning]]
- 2 edges to [[_COMMUNITY_Team & Page Sections API]]
- 1 edge to [[_COMMUNITY_Runtime Package Dependencies]]

## Top bridge nodes
- [[email.ts]] - degree 12, connects to 2 communities
- [[email-previewroute.ts]] - degree 11, connects to 2 communities
- [[contactroute.ts]] - degree 4, connects to 1 community