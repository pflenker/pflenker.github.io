---
layout: post
title: ""
tiny: true
categories:
  - Miscellaneous
  - Product Management
lastmod: 2023-01-05T11:57:58.124Z
---
A few days back, [someone on Twitter highlighted that viewing a single image on
Imgur causes downloading and running a megabyte of React
first](https://twitter.com/csswizardry/status/1185604806901207045). The
consensus in the thread was that the engineers at Imgur need to be morons in
order to let something like this happen.

My take on this is that it has grown organically. Imgur is not interested in
making the mobile experience (that's what this is about) great, they want you to
use the app instead. Coincidentally, the "Download the app" button is among the
first elements to be rendered. My best guess is that the current mobile page is
just something cobbled together on top of old software, with the business people
breathing down the developer's neck.