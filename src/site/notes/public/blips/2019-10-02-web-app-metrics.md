---
{"dg-publish":true,"dg-path":"blips/2019-10-02-web-app-metrics.md","dg-permalink":"2019/10/02/web-app-metrics/","permalink":"/2019/10/02/web-app-metrics/","title":"philipp @ 2019-10-02"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


> [!summary] **philipp**:
>
> #Misc
>
> [Performance Metrics for fast web apps](https://blog.superhuman.com/performance-metrics-for-blazingly-fast-web-apps-ec12efa26bcb). This article handles lots of quirks of JavaScript in a browser. In conclusion, it's not obvious which metrics should be used, but once you know it, it's not too difficult:
>
> > Measure time starting at event.timeStamp
> >
> > Measure time ending at performance.now() in a requestAnimationFrame()
> >
> > Ignore anything that happened while the tab was not focused
> >
> > Aggregate data using “% of events that are under target”
> >
> > Visualize multiple thresholds
> - - -
>
> 🗓️ `$= "<code>"+ dv.pages('"public/blips/2019-10-02-web-app-metrics"')[0]["created-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>"` `$= (!dv.pages('"public/blips/2019-10-02-web-app-metrics"')[0]["created-date"].hasSame(dv.pages('"public/blips/2019-10-02-web-app-metrics"')[0]["updated-date"], "day") ? " · ✏️ <code> " + dv.pages('"public/blips/2019-10-02-web-app-metrics"')[0]["updated-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>" : "")`  · [[public/blips/2019-10-02-web-app-metrics\|🔗]]
{ #blip}


- - -

 👾
