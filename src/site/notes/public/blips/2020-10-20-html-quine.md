---
{"dg-publish":true,"dg-path":"blips/2020-10-20-html-quine.md","dg-permalink":"2020/10/20/html-quine/","permalink":"/2020/10/20/html-quine/","title":"philipp @ 2020-10-20"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


> [!summary] **philipp**:
>
> #Coding #Quine
>
> ![2020-10-20-html-quine.png](/img/user/attachments/2020-10-20-html-quine.png)
>
> Here is a web quine- [a website where the result looks the same as the source
> code.](https://secretgeek.github.io/html_wysiwyg/html.html) This is quite
> similar to [an older example, which actually codes itself
> _live_.](https://www.strml.net/)
> - - -
>
> 🗓️ `$= "<code>"+ dv.pages('"public/blips/2020-10-20-html-quine"')[0]["created-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>"` `$= (!dv.pages('"public/blips/2020-10-20-html-quine"')[0]["created-date"].hasSame(dv.pages('"public/blips/2020-10-20-html-quine"')[0]["updated-date"], "day") ? " · ✏️ <code> " + dv.pages('"public/blips/2020-10-20-html-quine"')[0]["updated-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>" : "")`  · [[public/blips/2020-10-20-html-quine\|🔗]]
{ #blip}


- - -

 👾
