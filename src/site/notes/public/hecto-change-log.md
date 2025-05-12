---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"other","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"hecto: Change Log","dg-permalink":"hecto-change-log/","created-date":"2024-04-03T11:26:00","aliases":["hecto: Change Log"],"linter-yaml-title-alias":"hecto: Change Log","updated-date":"2025-05-05T18:18:20","tags":["hecto"],"dg-path":"hecto-change-log.md","permalink":"/hecto-change-log/","dgPassFrontmatter":true}
---

## 2024 Version Change Log
### The tutorial overall
- Moved to new blogging platform and therefore a new design.
- Fixed weird formatting issues with arbitrary newlines, broken links or bullet lists in the middle of nowhere.
- Added snazzy new screenshots.
- Switched from showing the diff and asking the reader to implement the change to showing the challenge and asking the reader to implement it.
- Ended each chapter with a wrap up that summarises the learnings and efforts so far.
- Changed the wording and phrasing in many places to move closer to the tone of the original tutorial, to honour the original work that went into it.
- Introduced this change log.
- Removed quick links and added the table of contents to the top of every page.

### Introduction
- Finally attributed [Paige Ruten](https://viewsourcecode.org/), the author of the original C tutorial, by name.
- Moved the license, attribution and some prose to the appendix.
- Made it clearer who this tutorial is for and what to expect, and cut down on the prose here.
- Linked [pound by Kofi Otuo](https://medium.com/@otukof/build-your-text-editor-with-rust-678a463f968b), which is the same idea, but newer than my 2019 edition, and less verbose.

### Chapter 1: Setup
- Removed some setup information. No need to repeat what’s written already on the Rust page.
- Started with compiling “by hand” before we move over to using `cargo`.
- Explained the files `cargo` produces.
- Moved the explanation on how to build production releases from later chapters to this one.
- Expanded a lot on build targets and build artefacts
- Corrected some instances where in the past I claimed Rust would be doing certain things when it was Cargo doing the work. Credit where credit is due.
- Introduced the Rust Playground as supporting material.

### Chapter 2: Entering Raw Mode
- Renamed this chapter from „Reading User Input“ to the same name of the original tutorial, since it now contains more details about raw mode than before.
- Took over more in depth information about escape sequences from the original tutorial.
- Investigated Raw Mode in more detail.
- Expanded upon dependency management with cargo, linked the documentation about feature flags.
- Expanded on what the Cargo.lock is for.
- Explained Results more thoroughly, to build a useful metaphor for understanding.
- Removed bitwise operations from the code and only mentioned it. If you need to do bitwise operations, you’re in too deep, and likely not a Rust beginner.

### Chapter 3: Raw Input and Output
- In the original I wrongly claimed Clippy was a Windows 95 feature, when in reality it was an Office 97 feature. Sorry.
- Brought over more under the hood terminal magic explanations from the original.
- Extended opinions about idiomatic code, clean code, code smells and refactorings.
- Extended explanations around types, both in general and in Rust.
- Explained pointers in more detail.
- Greatly expanded the explanations around traits.
- Extended explanations around overflow and type casting
- Added my own views on documentation.
- Explained how to document things in Rust.
- Made the distinction between a `Cursor`, a `Point` and a `Pointer` clearer.
- Added an explanation around the Esc sequence

### Chapter 4
- Restructured the approach to make it work / make it right / make it fast iteratively.
- Explained str and String in more detail
- Explained Unicode, UTF-8 and encodings in more detail
- Added explanations around Memory Management
- Expanded the explanations for Options vs Results
- Added explanations about how Iterators work
- Added a section about what call stacks are, what stack traces are and how `panic!` works
- Expanded heavily upon Grapheme Clusters
- Added a section about wide graphemes/characters
- Moved the introduction of UI elements besides text out of this chapter, given how packed it is with concepts and other learnings.

### Chapter 5
- Build-up of UI components moved here from Chapter 4.
- Expanded upon the explanations around borrow checkers.
- Added explanations around blanket implementations.
- Added explanations about text ropes.

### Chapter 6
- Moved colouring of strings from Chapter 7 to here
- Expanded on the history of terminal colors
- Added a section about RGB and CMYK.
- Added a section about Preludes.

### Chapter 7:
- Moved filetype detection up.
- Explained parsing of certain types in more detail.
- Explained Box and `dyn` in more detail.

### Appendices
- Rewrote the section about diffs to be GitHub specific.
- Expanded the section on how to act when stuck and how to reach me.
- Added more ideas on how to extend `hecto`.
- Described how to contribute to `hecto`.
- Ported and adapted text on how to use `git` throughout the tutorial from the original.
- Described my changes to the original tutorial in more detail, to better comply with the license of Paige’s work.
- Moved credits, musings around the name, motivation and other prose here.
- Explained the name `hecto` for those who don’t see the connection to `kilo`.
- Added acknowledgements which also mention contributors to the 2019 version of `hecto`.

### hecto
- Now works on Windows (untested, though).
- Disables raw mode even on most crashes instead of leaving the user with a broken terminal.
- Now supports wide characters properly.
- Now supports zero width characters.
- Is now able to support unicode file names.
- Searching now wraps around to the top or bottom  when navigating through the results.
- Searching now centers the search result.
- Better highlighting of search results.
- searching now works properly with graphemes and wide characters.
- Now recognises Rust files regardless of the case the file name is in.
- Improved highlighting of numeric literals
- Improved highlighting of lifetime specifiers
- Now supports multi line strings
- Now supports nested multi line comments

## 2019 Version
- [Initial version.](%EF%BF%BChttps%3A//archive.flenker.blog/hecto/)

_This post is part of the tutorial [[public/hecto\|hecto: Build Your Own Text Editor in Rust]].  Find more information, especially around licensing and credits, [[public/hecto\|here.]]_
