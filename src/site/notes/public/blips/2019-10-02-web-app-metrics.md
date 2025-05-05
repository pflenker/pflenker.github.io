---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"blip","created-date":"2019-10-02T00:00:00","disabled rules":["yaml-title","yaml-title-alias","file-name-heading"],"title":"philipp @ 2019-10-02","dg-permalink":"2019/10/02/web-app-metrics/","updated-date":"2025-04-30T22:27:35","dg-path":"blips/2019-10-02-web-app-metrics.md","permalink":"/2019/10/02/web-app-metrics/","dgPassFrontmatter":true,"created":"2019-10-02T00:00:00","updated":"2025-04-30T22:27:35"}
---

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
> 🗓️ `Wed, Oct 2, 2019` · [[public/blips/2019-10-02-web-app-metrics\|🔗]]
{ #blip}

