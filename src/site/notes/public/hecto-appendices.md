---
{"dg-publish":true,"dg-path":"hecto-appendices.md","dg-permalink":"hecto-appendices/","permalink":"/hecto-appendices/","title":"hecto: Appendices"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




![flenker-logo-RGB.png|40](/img/user/attachments/flenker-logo-RGB.png)
🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]] ⋮ 🪪 [[public/About Me\|about me]]


</div></div>


# hecto: Appendices
#hecto

## How the annotated commits work
Most steps in this tutorial are presented as a link to an annotated commit. Each commit  shows you the changes you need to make to the previous step’s code to get to the current step, with comments explaining each interesting code line.

[Here is an example commit](https://github.com/pflenker/hecto-tutorial/commit/23f1c0f6c54d794a8794fa40432c8e52103cc188).

Each diff contains one block per modified file. Each block starts with a header that contains the filename of the file you need to edit ("src/main.rs"). After the header, the contents of the file are shown. Additions are highlighted in green, deletions in red. The old line numbers are printed at the left, the new line numbers on the right. Comments are displayed below each interesting code line, with the label `(Author)` telling you that the same person who did the commit did the comment (me).

On the top right,  you will find two important settings:
- split/unified lets you switch from the view described above to a view that shows the old file on the left, and the new file on the right - and back.
- Whitespace/Ignore Whitespace chooses whether or not to display a change to whitespaces in the diff - for example, when re-indenting the code, all that changes are the whitespaces in front of each line but not the logic itself, so it might make sense to simply ignore these changes.
Further, on the top right of a code block, you find a `...` button. Clicking on it allows you to hide the comments, to focus on the change itself.
For example, [this link](https://github.com/pflenker/hecto-tutorial/commit/23f1c0f6c54d794a8794fa40432c8e52103cc188?diff=unified&w=0) brings you to the verbose version with comments, which helps you to reason about each code line. [This link](https://github.com/pflenker/hecto-tutorial/commit/23f1c0f6c54d794a8794fa40432c8e52103cc188?diff=unified&w=1) brings you to a more concise version of the same change without comments or whitespace changes.

## What to do if you are stuck
The first few commits are designed for you to follow along and copy them.

Some of the code in this tutorial is very tricky to type in exactly, especially if you’re not used to Rust. It’s  specially easy to make a mistake when you’re making a change to a line, and you think you’re done changing that line, but you missed one little change to another part of that same line. It’s important to take your time, and compare the changed parts of the diff _character-by-character_ with your code to make sure they’re the same.

If you suspect you made an error, but don’t know where it is or how far back you might’ve made the error, you should get your computer to do a diff between your version of `hecto` and the tutorial’s version of `hecto` for whatever step you’re on.

You will need `git` to do this. To install git, follow [these official instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Once you have `git` installed, clone the [hecto-tutorial](https://github.com/pflenker/hecto-tutorial) repository by running `git clone https://github.com/pflenker/hecto-tutorial.git`. `cd` into the repo using `cd hecto-tutorial`. Each link to a commit has a commit ID on the top left side, which you can check out.

To check out the commit above, you’d type:
```bash
$ git checkout 2e090ab
```
The folder then contains all files with the contents of that step.

You can compare your files with files of this folder by running something like `git diff --no-index -b ../path/to/your/main.rs main.rs` . This will show you the changes you would need to make to your `main.rs` to get it to look like the one in the repo. The `-b` option ignores whitespace, so it won’t matter if you use a different indent style than the one in the tutorial.

After some time, you’ll get assignments to try and solve on your own.  I recommend to use the last commit from me before the assignment as a starting point for your own experiments. That way,  you can compare your current state to the next commit from me once you’re stuck.

To compare your current code with the commit above, you’d type:
```bash
$ git diff 2e090ab
```

## Where to get help
The easiest way to get help is commenting directly on code lines you don’t understand on GitHub. If your question is not directly related to a specific code line (or you’d rather not use GitHub), and the hints above are not sufficient to help you out, feel free to contact me. You can find several ways of reaching me on [my home page](https://philippflenker.com).

## Ideas for improvements and features
If you want to extend `hecto` on your own, I suggest trying to actually use `hecto` as your text editor for a while. You will very quickly become painfully aware of all sorts of features you’re used to having in a text editor, but are missing in `hecto`. Those are the features you should try to add. And you should use hecto when you work on `hecto`.

If you're still looking for ideas, here's a small list. If you complete some of them, let me know!
- Refactoring. Our code has emerged from nothing, and we have refactored it along the way, but I didn’t want this tutorial to turn into a refactor-fest, so the structure of the code is not as great as it could be, which might make future bug fixing and extension more difficult.
- Testing. We have tested our code by trying it out and playing around with it, but this gets more and more difficult over time, and it’s easy to drop/break old functionality while adding new features. It’s time to add tests to `hecto`.
- Paranoid `clippy`. Crank up `clippy`’s behaviour to 11 and see if you can sufficiently address everything it brings up.
- Support more filetypes.
- Make highlighting markers configurable. For instance, in some languages, a single `#` instead of two slashes indicate a single line comment.
- Allow alternatives. For instance, in many languages, characters are not highlighted separately, but instead, strings can be delimited with single or double quotes.
- Line numbers: Display the line number to the left of each line of the file.
- Auto indent: When starting a new line, indent it to the same level as the previous line.
- Hard-wrap lines: Insert a newline in the text when the user is about to type  past the end of the screen. Try not to insert the newline where it would split up a word.
- Soft-wrap lines: When a line is longer than the screen width, use multiple lines on the screen to display it instead of horizontal scrolling.
- Copy and paste: Give the user a way to select text, and then copy the selected text when they press Ctrl-C, and let them paste the copied text when they press Ctrl-V.
- Multiple buffers: Allow having multiple files open at once, and have some way  of switching between them.
- Non-Blocking Read: `hecto` currently blocks completely while waiting for user input, making it impossible to e.g. show a notification only for a specific amount of time.
- Mouse Support: `crossterm` offers support for mouse events. Let the user change the cursor position by clicking on the terminal.

## Why I wrote `hecto`
Back in 2019 (when I wrote the first version of this tutorial), I was mostly only familiar with JavaScript. Sure, I had some Java experience in the past, but over the years this knowledge has started to fade.

At the same time, Rust was the fairly new kid on the block, so I was looking for a way to learn it.
My first idea  was to play around with a web server, but then it occurred to me that this would be close to what I always do when I try out shiny new things. Then one day, [Paige Ruten’s excellent tutorial to build your own editor in C](https://viewsourcecode.org/snaptoken/kilo/index.html) hit the Front Page of Hacker News (again), sparking the idea of this tutorial.  `kilo` is complex enough to pose a challenge, and thanks to Paige it’s sufficiently well understood so that I could focus on learning the language without getting lost in the details of implementing a text editor.

## The Name
`hecto` follows more modest goals than `kilo`. After all, I just took a pre-existing idea and rewrote it, so it seemed prudent to choose a “smaller” name for my final project.[^1]

## Contributions
Contributions are welcome!  There are three types of them:
- Contributions to the **text**, e.g. additional explanations, corrections or other additions: Please send them to me via text and include how you’d like to be attributed. Please note that I will likely not copy-paste your text, but instead incorporate it into mine so that the tutorial keeps a consistent tone of voice. I’ll still attribute your contribution as a footnote directly on the text part that has changed.
- Contributions to the **steps**, e.g. bug fixes:  These work a bit differently given the nature of the repository. Please check out the latest commit on which you’re going to build the bug fix by following the command above. Then create a branch based on this commit by using `git branch my-new-branch` and then switch to it using `git checkout my-new-branch`. Ensure your change is done in one  single commit, then open a PR and comment your commit. In your PR, please let me know how you want to be attributed. I will then link your commit with some explanation and the attribution at the appropriate place.
- **Extensions**: If you complete one of the feature additions above, or extend `hecto` in any other way, that’s absolutely fantastic! Just open a PR, comment it extensively (if you want to) and tell me how you’d like to be attributed. Don’t bother about keeping everything in one commit, as I’ve asked you to in the previous step. I will then add your contribution & attribution in the list above.
Please note that I do not offer a Code of Conduct at this point, and that sending me any contribution does not guarantee that it will make its way into the tutorial text or code. This is a pet project of mine, not my full-time job. Be nice.

## Credits
[Salvatore Sanfilippo aka antirez](http://invece.org/) is the author of [kilo](https://github.com/antirez/kilo). He wrote a [blog post](http://antirez.com/news/108) about it, in which he explains how he reused code from two of his other projects to quickly throw together `kilo` in just a few hours during a couple already busy weekends. 
`kilo` was the starting point upon which [Paige Ruten](https://viewsourcecode.org/) has built her own version of `kilo`. How she did it is described more thoroughly in [a text of hers](https://viewsourcecode.org/snaptoken/kilo/08.appendices.html#credits) which is eerily similar to this one. Then she turned this into an incredible tutorial called [“Build Your Own Text Editor”](https://viewsourcecode.org/snaptoken/kilo/index.html), which is basically what I remixed into the tutorial you’re looking at right now. If you want to know more about Paige, visit [viewsourcecode.org](http://viewsourcecode.org/).

I have seen Paige’s tutorial popping up on [Hacker News](https://news.ycombinator.com/news) frequently and always thought of actually implementing it. Instead, I combined her tutorial with my efforts to lern Rust “the rust way”.

## License
- The `kilo`  source code  is released under the [BSD 2-Clause](https://github.com/snaptoken/kilo-tutorial/blob/master/steps.diff.LICENSE) license.
- The [original tutorial](https://viewsourcecode.org/snaptoken/kilo/) is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/~).
- `hecto` and this tutorial are licensed under [CC BY  4.0](https://creativecommons.org/licenses/by/4.0/). Please attribute me as Philipp Flenker and link [my home page.](https://philippflenker.com)

### Attribution & Indication of Changes
Since this work is based on prior work licensed under CC BY 4.0, I am required to properly attribute the original authors indicate the changes I did to the original work, which I’ll happily do here:
- The original C program, `kilo`, was done by [antirez](http://invece.org/).
- The tutorial which built based on `kilo` was done by [Paige Ruten](https://viewsourcecode.org/).
These blog posts are based firmly on the [original tutorial](https://viewsourcecode.org/snaptoken/kilo/index.html),  but the code has not only been adapted to rust by using the closest Rust counterpart, but by trying to solve things “the Rust way”. All explanations of the original have been checked, revised, adapted to Rust where appropriate, expanded where I found it valuable or otherwise rewritten when I saw the need to.
- The idea for a small text editor and the features from `hecto` are by antirez, since `hecto` is a near-faithful reimplementation of the original `kilo`.
- The idea to turn building the editor into a tutorial and the structure of the tutorial is Paige‘s work. The order of steps, too, though I changed some things here and there where I thought it made sense.
- Whenever you read interesting stuff about how terminals work, it’s mostly Paige‘s work, with some additions and expansions by me.
- Everything Rust related and musings about coding in general is from me.
For anything that you can’t cleanly attribute with this guidance, the following rule probably applies:  If it’s insightful or witty, it’s Paige. If it’s redundant, self-evident, dumb or redundant, it’s me.

## Acknowledgements
Thanks go out to:
- [Paige Ruten](https://viewsourcecode.org/) for the [C tutorial](https://viewsourcecode.org/snaptoken/kilo/index.html) based on `kilo`
- [antirez](http://invece.org/) for `kilo`
- The following people have provided bug fixes and other Pull Requests to the original code base. Thank you!
  - [Stephen S.H.](https://github.com/2222-42)
  - [Avinash Sajjanshetty](https://github.com/avinassh)
  - [Jaromir Obr](https://github.com/mirao)
  - [Eddie Nuno](https://github.com/archaengel)
  - [Junhyeok Jang](https://github.com/kennethjang34)
- Everyone who took the time to send me an email with thanks or encouragements. You rock!

_This post is part of the tutorial [[public/hecto\|hecto: Build Your Own Text Editor in Rust]].  Find more information, especially around licensing and credits, [[public/hecto\|here.]]_

[^1]: Explanation: `kilo`  comes from Greek and means 1000, as the original goal of this program was to build a text editor in less than 1000 lines. `hecto` means 100.  


- - -
<p><span>Edited: <code>Saturday, May 3, 2025</code></span></p>
👾
