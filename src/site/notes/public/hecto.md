---
{"dg-publish":true,"dg-path":"hecto.md","dg-permalink":"hecto/","permalink":"/hecto/","title":"hecto: Build Your Own Text Editor in Rust"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




![flenker-logo-RGB.png|40](/img/user/attachments/flenker-logo-RGB.png)
🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]] ⋮ 🪪 [[public/About Me\|about me]]


</div></div>


# hecto: Build Your Own Text Editor in Rust
<p><span>📆 <code>Saturday, March 30, 2024</code></span></p>
#hecto

![flenker-1719070814.png|hecto](/img/user/attachments/flenker-1719070814.png)

Welcome! This is a series of blog posts that shows you how to build a text editor in Rust.

It's a re-implementation of [antirez' kilo](http://antirez.com/news/108) in Rust, and a remix of [Paige Ruten's tutorial for the same thing in C](https://viewsourcecode.org/snaptoken/kilo/index.html). It’s somewhere in the ballpark of 3000 lines of Rust in a few files with a few dependencies, and it implements all the basic features you expect in a minimal editor, as well as syntax highlighting and a search feature.

These posts walk you through building the editor and learning Rust in multiple small steps. For the first steps, you’ll add, change, or remove a few lines of code. Most steps, you’ll be able to **observe the changes** you made by compiling and running the program immediately afterwards. Once you’ve built up a solid understanding of Rust, you’ll get a description of what to solve next and have the opportunity to try it out before you compare it to my own take on the solution.[^1]

I wrote this tutorial coming from a different corner of the engineering world, to obtain a deeper understanding of Rust. If you’re in a similar situation, this tutorial is for you.  If you already know Rust, but wonder about the ins and outs of Text Editors, this tutorial is also for you.

I explain each step along the way, sometimes in a lot of detail, and definitely not always Rust-related. Feel free to skim or skip the prose,[^2] as the main point of this is that **you are going to build a text editor from scratch while learning Rust!** Anything you learn along the way is a bonus, and there’s plenty to learn just from typing in the changes to the code and observing the results.

See the [[public/hecto-appendices\|appendices]] for more information on the tutorial itself (including what to do if you get stuck, and where to get help).

If you’re ready to begin, then go to [[public/hecto-chapter-1\|chapter 1]]!

## Table of Contents
- [[public/hecto\|Introduction]] 📍 You are here
- [[public/hecto-chapter-1\|Chapter 1: Setup]]
- [[public/hecto-chapter-2\|Chapter 2: Entering Raw Mode]]
- [[public/hecto-chapter-3\|Chapter 3: Raw Input and Output]]
- [[public/hecto-chapter-4\|Chapter 4: A Text Viewer]]
- [[public/hecto-chapter-5\|Chapter 5: A Text Editor]]
- [[public/hecto-chapter-6\|Chapter 6: Search]]
- [[public/hecto-chapter-7\|Chapter 7: Syntax Highlighting]]
- [[public/hecto-appendices\|Appendices]]
- [[public/hecto-change-log\|Change Log]]

[^1]: But if you wish to just read instead of coding yourself, that’s fine too.
[^2]: This tutorial is long, and very deliberately so. If you want to build the same text editor in Rust, but with less prose and less sidetracking, [have a look at pound](https://medium.com/@otukof/build-your-text-editor-with-rust-678a463f968b) by Kofi Otuo. However, once we get to the point where I create assignments for you, it will be easier for you to skip explanations and just go from one assignment to the next.



- - -
<p><span>Edited: <code>Saturday, May 3, 2025</code></span></p>
👾
