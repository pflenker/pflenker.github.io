---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"created-date":"2021-02-17T18:59:50","updated-date":"2025-05-05T17:44:21","type":"post","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"A Tale of Two Metrics","dg-permalink":"2021/02/17/two-metrics/","tags":["metrics"],"dg-path":"A Tale of Two Metrics.md","permalink":"/2021/02/17/two-metrics/","dgPassFrontmatter":true,"created":"2021-02-17T18:59:50","updated":"2025-05-05T17:44:21"}
---


![Pasted image 20250430190100.png|Stock Diagram showing a confused person faced with a lot of data](/img/user/attachments/Pasted%20image%2020250430190100.png)
The _Change Failure Rate_ is a metric which is calculated by dividing the number of production incidents by the number of production changes. This metric changes for the better if the number of production changes goes up while the number of production incidents go down. An often-heard question when introducing this metric is: Aren't these values skewed if production incidents are discovered much later? For example, if in Week 1 a lot of faulty changes go live, which are not discovered until Week 2, it seems that Week 2 was a bad week worth investigating, while Week 1 was the culprit.

The German _Robert Koch Institut (RKI)_ provides the data about how many infections there are for relevant diseases, such as COVID-19. They collect the data from the local health offices. However, there is a problem: Not all offices send their data on time. Most remarkably, several health offices to not send data on weekends. That means that on Tuesday, the RKI gets the data from most offices for Monday, and also from several offices for Sunday or Saturday.

## Accuracy vs Actionability

The RKI aims to provide the most accurate data, so they retroactively change the data - regardless of when a health office sends its data for, say, a Sunday, the value of that day is modified. The RKI's top priority is _data accuracy_.

This creates a serious problem: Many political decisions are based on the RKI's latest data, one way or the other - even data that spans multiple days only uses the most recent 7 days. No political decision is done by looking back at previous dates and checking whether or not the numbers have changed. For example, if the infection rate went below a certain threshold today, political leveraging measures could be decided and moved forward. But if a day later it turns out that due to the data being sent too late the number was actually a bit higher, these measures will not be corrected.

This is because politics is looking for _actionability_, or an actionable metric.

## How to Get The Actionability we Want With The Accuracy we Need
German Newspaper _Sueddeutsche Zeitung_ [investigated this dilemma](https://www.sueddeutsche.de/gesundheit/coronavirus-inzidenz-rki-fallzahlen-1.5154797) and found that, indeed, the numbers published by the RKI are usually too low. In order to come up with an actionable metric that reflects the real situation as accurate as possible without access to the _actual_ data, which will be sent too late, Sueddeutsche tested several statistical methods and tried to predict the actual values for any given day. They then compared their predictions with the actual values, once the RKI retroactively changed the numbers for any given day.

The most elegant solution, because it's simple and creates good actionable results, was to count any data sent to the RKI for the day it was received, and not for the day it was recorded. For example, if a health office sends their data for Tuesday on a Wednesday, it is counted for that Wednesday, and not for the Tuesday.

What happens here is that in general, the data that is missing for a given day is roughly balanced with data received on the same day, but recorded for an earlier day.

This, in general, is also the rationale behind metrics such as the Change Failure Rate. In general, it does not really matter if a failure is recorded in the same time interval as the corresponding change - in the grand scheme of things, it evens out.
