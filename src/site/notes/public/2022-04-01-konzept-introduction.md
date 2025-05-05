---
{"created-date":"2022-04-01T00:00:00","dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"post","excerpt":"In this tutorial, we're going to build a sensible WYSIWYG Editor with Slate.js.","dg-permalink":"/konzept-introduction/","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Konzept: A simple, yet powerful WYSIWYG-Editor in React","aliases":["Konzept: A simple, yet powerful WYSIWYG-Editor in React"],"linter-yaml-title-alias":"Konzept: A simple, yet powerful WYSIWYG-Editor in React","updated-date":"2025-05-05T17:44:21","tags":["Tutorial","konzept"],"dg-path":"2022-04-01-konzept-introduction.md","permalink":"/konzept-introduction/","dgPassFrontmatter":true,"created":"2022-04-01T00:00:00","updated":"2025-05-05T17:44:21"}
---



In this tutorial, we're going to build a simple, yet powerful WYSIWYG-Editor with [Slate](https://github.com/ianstormtaylor/slate).

> [!important]
> Due to various reasons, I had to abandon this tutorial. You can find more details in [[public/2023-01-02-happy-new-year\|this post]]. Sorry!

# Introduction and Motivation

(_Note: This is mostly a [Motive Rant](https://tvtropes.org/pmwiki/pmwiki.php/Main/MotiveRant). If you are not interested, just skip to the next section. You won't miss anything useful._)

Text editors are undergoing a massive paradigm shift these days. They leave their "paper heritage" behind and are focussing less and less on the classical use case of being able to write a document that looks nice on paper, and more on the use case of being a multi purpose note taking tool, with just enough formatting capabilities to enable users to structure their text, but not too much as to make it confusing or weird to use them.

Did you ever wonder how hard it is to build one? Well, let's find out together!

## What are we going to build?

We're going to build Konzept, a small text editor with some sensible defaults. It will provide hotkey support, markdown-like shortcuts and some more sensible defaults. But what is even more important is that we are going to learn a lot along the way about how text editors behave in general.

# Who is this tutorial for?

I'm afraid that without at least a basic understanding about React, it won't be possible to follow along. It will also utilize Typescript, but since Typescript isn't super hard, I think you'll be fine if you never used it.

Everything else will be covered in this tutorial.

# Table of Contents

1. [[public/2022-04-01-konzept-chapter-1\|Setup]]
2. [[public/2022-04-01-konzept-chapter-2\|Inline Formatting]]
3. Headings
4. Block Formatting
5. Lists and Indentation
