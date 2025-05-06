---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"created-date":"2025-04-28T14:06:10","updated-date":"2025-05-05T21:12:26","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"All Articles","dg-path":"All Articles.md","permalink":"/all-articles/","dgPassFrontmatter":true,"created":"2025-04-28T14:06:10","updated":"2025-05-05T21:12:26"}
---

```dataview
LIST WITHOUT ID "📆 `" + dateformat(created-date, "MMM dd, yyyy") + "` [[" + file.name + "|" + title + "]]"
FROM "public"
WHERE dg-publish AND type = "post"
SORT created-date DESC
```
