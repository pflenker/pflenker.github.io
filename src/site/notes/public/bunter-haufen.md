---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"post","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Bunter Haufen","dg-permalink":"bunter-haufen/","created-date":"2020-10-21T00:00:00","aliases":["Bunter Haufen"],"linter-yaml-title-alias":"Bunter Haufen","updated-date":"2025-05-05T17:44:28","tags":["pet-project-sematary"],"dg-path":"bunter-haufen.md","permalink":"/bunter-haufen/","dgPassFrontmatter":true,"created":"2020-10-21T00:00:00","updated":"2025-05-05T17:44:28"}
---


![flenker-1711732009-0.png|philipp's blog](/img/user/attachments/flenker-1711732009-0.png)

Back in 2004, Owas working and acting at a local theater in Göttingen. This theater was cut off federal funding, and as a consequence,  various organization have popped up to raise awareness of the issue and try to save it. Younger friends and actors of the theater formed the  Bunter Haufen ("colorful bunch"), and I could put my technical skills to good use, and built a website and a mailing list to coordinate efforts.

I quickly learned that it's one thing to do something for fun, but it's something else entirely to do something other people are not only using, but also relying on. Bugs, issues and workarounds which I, as a
teenage hobbyist, would have found acceptable are just not good enough for actual users.

As an example, I used a publicly visible variable called
`phil` to identify the desired destination page, so what on other pages would have been `www.bunter-haufen.de/imprint.html` was `www.bunter-haufen.de/index.php?phil=imprint` for us. We asked newspapers to print links to our statements, so my design choice quickly became a tad bit embarrassing.

Thus, I found the work on that page and mailing list surprisingly demanding, but also very fulfilling.

## Speaking of Bugs...
I remember being called at around 6 in the morning and yelled at by my teacher, who was also part of the initiative. My mailing list was spamming him! I assured him that this wasn't the case and that someone probably had a virus and set out to investigate.

I opened my own mailbox and found it full of spam, sent by multiple people. Hmm - so apparently I was dealing with a wide-spread virus infection?

Digging deeper, this is what has happened: Some spammer [^2] sent an email to the list, which was configured to accept mail from everyone. This email lead to one of the recipient's mailbox to overflow, sending a bounce message back to the mailing list. This mail was then sent to everyone on the list, including the recipient with the overflowing mailbox. Which then sent a bounce message back to the mailing list.
And so on.
Until a second mailbox reached its limit and sent out a bounce message back to the list...

I turned off the mailing list immediately, but it took hours for all mails to be either sent or purged. I fixed the config mistake, put the mailing list back online and sent out a mail explaining how a particularly nasty virus has infected multiple recipients of the mailing list but I had fixed it, and then I moved on.[^1]

## How it ended
The theater was saved, simple as that, and both the website and the mailing list were discontinued.

[^1]: I don't think anyone bought it though.
[^2]: Spam was very rare back in the day, and spam filters mostly didn't exist.
