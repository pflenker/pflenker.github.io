---
{"dg-permalink":"2019/08/01/poor-web-performance-is-unethical/","created-date":"2019-08-01T00:00:00","dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Poor web performance is unethical","aliases":["Poor web performance is unethical"],"linter-yaml-title-alias":"Poor web performance is unethical","updated-date":"2025-05-05T17:44:21","tags":["dgarticle","Performance","Web","Miscellaneous"],"dg-path":"2019-08-01-poor-web-performance-is-unethical.md","permalink":"/2019/08/01/poor-web-performance-is-unethical/","dgPassFrontmatter":true}
---


[Tim Kadlec makes a great point about the Ethics of Web Performance:](https://timkadlec.com/remembers/2019-01-09-the-ethics-of-performance/)
> [!quote]
> There is a growing gap between what a high-end device can handle and what a middle to low-end device can handle. When we build sites and applications that include a lot of CPU-bound tasks[...], at best, those sites and applications become painfully slow on people using those more affordable, more constrained devices. At worst, we ensure that our site will not work for them at all.

This is not well-known, even though the effects can be profound, as [this example from YouTube shows.](https://blog.chriszacharias.com/page-weight-matters) They have reduced the page size of a video page from 1.2MB to less than 100 KB and observed the following:

> [!quote]
> The average aggregate page latency under Feather had actually INCREASED. I had decreased the total page weight and number of requests to a tenth of what they were previously and somehow the numbers were showing that it was taking LONGER for videos to load on Feather. This could not be possible. [...]
>
> When we plotted the data geographically [...], there was a disproportionate increase in traffic from places like Southeast Asia, South America, Africa, and even remote regions of Siberia. Further investigation revealed that, in these places, the average page load time under Feather was over TWO MINUTES! This meant that a regular video page, at over a megabyte, was taking more than TWENTY MINUTES to load!

When reading this, keep in mind that the full "War and Peace" by Tolstoi is 1.9MB - so the original video page was almost transferring a full >1200 pages novel to all the devices.
