---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"post","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Bigger PRs, Larger Commits","dg-permalink":"bigger-prs-larger-commits/","created-date":"2025-03-24T20:58:22","aliases":["Bigger PRs, Larger Commits"],"linter-yaml-title-alias":"Bigger PRs, Larger Commits","updated-date":"2025-05-05T17:44:22","tags":["engineering"],"dg-path":"bigger-prs-larger-commits.md","permalink":"/bigger-prs-larger-commits/","dgPassFrontmatter":true,"created":"2025-03-24T20:58:22","updated":"2025-05-05T17:44:22"}
---


The conventional wisdom of how big a Pull Request - a PR - should be can probably be summarised as "as small as possible". And it makes sense: Big PRs are a nightmare to review, difficult to integrate and risky to deploy since they change so many things at the same time.

However, in this post I am going to make a case for _larger_ Pull Requests. I think the common sense guideline of small PRs has the tendency to stifle low-effort quality improvements.

# A Typical Example
The following example is inspired by a recent real-world change in one of our systems. For the sake of simplicity, assume you have a system which is dealing with different kinds of events, and for one specific event type, you want to add a certain validation step.

You clone the repository. Before you actually start working, you notice that the project has several hundred warnings. You notice one of them is about a deprecated method for which a drop-in replacement exists. A well-placed regex solves the warnings.

While you are looking for the correct entry point, you notice that some of the methods you're encountering have no comments. You add comments where the code isn't obvious, and remove outdated or wrong comments. You also do a tiny refactoring about something where a comment, written 6 years ago, states "this will be removed soon!".

Then you set your eyes on where the events are processed. You notice that input validation is done a bit weirdly in this method. A short `git-blame` confirms  that this is not intentional, it's the result of multiple developers extending this code years apart. So you refactor this method.

Then, you add your input validation, which is essentially less than 10 Lines of Code. You cover it appropriately with tests. After all this, you end up a bit ahead of time. Reviewing the warnings again, you notice that another deprecated method is used in 200 test files.  You figure that you want to invest 1 hour, max, to replace them, and otherwise `git reset --hard` your efforts and conclude your task.

But fortune smiles on you today, and one hour turns out plenty of time. All in all, it's taken you less than one afternoon to not only implement the feature, but also clean up the code in the process. Awesome!

# The Pushback
This example illustrates how I think we _should_ be working. All of the extra steps besides feature implementation are low-effort and low-risk (you have to take my word for it when it comes to the replacement of the deprecated functions), they all make the code better to reason about, but they come at a price: The resulting Pull Request will be massive in terms of files changed.

And that's when people start to push back and cite the common wisdom of small PRs. After all, can't you split up these things into multiple PRs?

In theory, yes. However, in practice, this comes with a couple of problems. Since all the code is pretty much done at the same time, all the PRs are also ready at the same time. But in order to make them reviewable independently, you have to create a complex web of branches, to ensure that the code that shows up in each PR can be viewed in isolation. Or you present them sequentially, which comes with the overhead of feeding others the changes one at a time, withholding the next PR until the previous one is merged.

But if you offer "maintenance PRs" in isolation, they tend to get deprioritised. They're not related to features, so not important, right?! The information that these PRs all belong to an important feature therefore needs to be conveyed separately.

# Bigger Commits
The solution to this is: Bigger commits. Same as probably everyone else, I commit early and often, it's the developer's equivalent of Save Scumming before a big boss fight. But hey, it's 2025, commits are editable, can be reordered to some degree and  are squashable, and everything above can be squashed into a few individual, self-contained commits, for example:

- The two refactorings which replace deprecated method calls can be squashed into two separate commits
- The "commenting journey" and refactorings before being able to add the actual feature can be squashed into a third one
- The change itself can be squashed in to a fourth commit.

With this (and some guidance), the reviewer can tackle the review as four mini-PRs. The clear benefit is that for only one of the commits, actual functional behaviour was added, whereas for all the other commits, the behaviour stayed the same.

# There Is No Glory In Prevention
I strongly believe that striving for small PRs actively discourages these small quality improvements. I am advocating for bigger PRs with larger commits to make room for day-to-day maintenance.

However, I am acutely aware of one pretty good counter-argument: Any code change increases the change of a bug. Can I _really_ be sure these drop-in replacements work the same way? Can I fully rule out that I haven't unwittingly subtly change something else?

No, I can't. And what's worse is that if done well, these changes have no immediately observable effect, but if done wrong, they might directly cause a serious issue. This is because you cannot see the bugs that you prevent - even at my current employer, which is a pretty great place to work, there is no mechanism where 4 incident commanders, 3 heads-of and 2 directors all rush in because the last deployment went so well and all customers are happy.

However, for me, this is not only about bug or issue prevention: it's about happiness. Or to use a current buzzword: developer experience. Sure, my change above could have been _only_ a 10 Lines of Code change. But every developer after me would have to go through the same gotchas and relearn the same things, and my addition would have compounded the design issues of the current function, making it even worse for the next person who needs to do something in that area.[^1]

And ignoring all these warnings will come back and bite us in the backside eventually, namely once we want to upgrade a few of our dependencies, but are unable to, because all these methods which are marked for deprecation have been removed for good.

There might be no glory in prevention, but developer experience matters. Let's improve the quality of our code, one large commit per big PR at a time.

[^1]: That person might be me.
