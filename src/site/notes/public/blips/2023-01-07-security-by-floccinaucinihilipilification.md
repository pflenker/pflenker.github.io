---
{"dg-publish":true,"dg-path":"blips/2023-01-07-security-by-floccinaucinihilipilification.md","dg-permalink":"2023/01/07/security-by-floccinaucinihilipilification/","permalink":"/2023/01/07/security-by-floccinaucinihilipilification/","title":"philipp @ 2023-01-07"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]]


</div></div>


> [!summary] **philipp**:
>
> I once worked with a company that was developing call center software: The software on the client PCs that shows information about the calling customer. Quickly I discovered that the protocol between the client and the server was not encrypted at all, passwords were transmitted in clear text and there was no server-side validation to access any customer records: Essentially, the server did whatever the client ask for, and inversely, all the server could do was to ask the client nicely.
>
> For example, if the server wanted to shut down a client remotely (for instance because the shift of the person on that computer has ended and they should no longer receive any data), all it did was sending what we dubbed a `would-you-kindly` request to the client to shut down, which the client could potentially ignore without any consequences at all. The session would stay active if the client dropped the request.
>
> Obviously, I raised this to both the lead architect and the lead product manager, and, equally obviously, they both already knew and told me that call center employees were too dumb to exploit this, because if they weren't, they wouldn't be working in a call center.
>
> I am not sure if there is a better word for it, but I'd like to call this approach "Security by [floccinaucinihilipilification](https://en.wiktionary.org/wiki/floccinaucinihilipilification)".
> - - -
>
> 🗓️ `$= "<code>"+ dv.pages('"public/blips/2023-01-07-security-by-floccinaucinihilipilification"')[0]["created-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>"` `$= (!dv.pages('"public/blips/2023-01-07-security-by-floccinaucinihilipilification"')[0]["created-date"].hasSame(dv.pages('"public/blips/2023-01-07-security-by-floccinaucinihilipilification"')[0]["updated-date"], "day") ? " · ✏️ <code> " + dv.pages('"public/blips/2023-01-07-security-by-floccinaucinihilipilification"')[0]["updated-date"].setLocale("en-US").toLocaleString(dv.luxon.DateTime.DATE_MED_WITH_WEEKDAY) + "</code>" : "")`  · [[public/blips/2023-01-07-security-by-floccinaucinihilipilification\|🔗]]
{ #blip}


- - -

 👾
