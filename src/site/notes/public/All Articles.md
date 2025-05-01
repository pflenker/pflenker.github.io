---
{"dg-publish":true,"dg-path":"All Articles.md","permalink":"/all-articles/","title":"All Articles"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


# All Articles
```dataviewjs
dv.list(dv.pages('"public"')
  .where(p => p["dg-publish"] && p.type === "post")
  .sort(p => p["created-date"], 'desc')
.map(p => "📆 `" + p["created-date"].setLocale("en-US").toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) + "` [[public/" + p.file.name + "|" + p.title + "]]")
)
```

- - -
 
👾
