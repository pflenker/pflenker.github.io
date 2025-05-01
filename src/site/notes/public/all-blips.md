---
{"dg-publish":true,"dg-path":"all-blips.md","permalink":"/all-blips/","title":"All Blips"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


#  All Blips

> [!question]- What's a Blip?
> **Short answer:**
> [[public/blips/20250428204625\|This is a blip.]]
> **Long answer:**
> I've moved away from doomscrolling and pretty much every social network out there. But I still like the idea of microblogging - that's what a blip is: my own little tweet, skeet, toot or however it is named out there.

```dataviewjs
const links = dv.pages('"public/blips"').sort(b => b["created-date"], "desc").map(page => `![[${page.file.name}#^blip]]`);
dv.span(links.join("\n- - -\n "));
```
- - -

👾
