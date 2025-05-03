---
{"dg-publish":true,"dg-path":"blips/2023-01-07-security-by-floccinaucinihilipilification.md","dg-permalink":"2023/01/07/security-by-floccinaucinihilipilification/","permalink":"/2023/01/07/security-by-floccinaucinihilipilification/","title":"philipp @ 2023-01-07","created":"2023-01-07T00:00:00","updated":"2025-04-30T22:27:37"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




![flenker-logo-RGB.png|40](/img/user/attachments/flenker-logo-RGB.png)
🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]] ⋮ 🪪 [[public/About Me\|about me]]


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
> 🗓️ <code>Sat, Jan 7, 2023</code>  · ✏️ <code> Wed, Apr 30, 2025</code>  · [[public/blips/2023-01-07-security-by-floccinaucinihilipilification\|🔗]]
{ #blip}


- - -

 👾
