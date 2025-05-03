---
{"dg-publish":true,"dg-path":"just-add-a-comment.md","dg-permalink":"just-add-a-comment/","permalink":"/just-add-a-comment/","title":"Just add a comment"}
---


<div class="transclusion internal-embed is-loaded"><div class="markdown-embed">




![flenker-logo-RGB.png|40](/img/user/attachments/flenker-logo-RGB.png)
🏠 [[public/Index\|home]]  ⋮ 🗣️ [[public/all-blips\|blips]] ⋮  📝 [[public/All Articles\|articles]]  ⋮ 🕰️ [[public/now\|now]] ⋮ 🪪 [[public/About Me\|about me]]


</div></div>


# Just add a comment
<p><span>📆 <code>Tuesday, March 4, 2025</code></span></p>
#engineering

A long, long time ago, Robert C. Martin has published the book "Clean Code", in which he advocates for very small functions, and where he claims that comments should be considered a personal failure.

I think this line of thought is still doing lasting damage to the industry.

I know where Martin was coming from. Back in the day, it was not uncommon to find code like this:

```java
/** 
* Gets the thing
* @returns the thing
*/
public Thing getThing() {
   return self.thing;
}
```
This is because it was not an uncommon requirement to comment _everything_, and this kind of verbose commenting is mostly useless.

But in the general case, the drastic notion that comments are failures does not apply.

The other day, I was debugging a function which looked roughly like this:

```
lockAndSelectPendingOtherRecords() {
   //... 3 more lines of code
}
```

So an un-commented, short function. What it does is calling a database query. For efficiency reasons it makes sense to have a complicated DB query instead of performing the desired operations in-memory in the database, so I have no issues with the function body itself.

It's the name of the function that I take issue with. You can safely ignore that it says `Records` - the real world code used a more expressive term that actually describes the entity type a bit better. But then it start getting interesting, then annoying, then frustrating.

The interesting part is the fact that this code is about `Other` records. You see, there are multiple record types in the database. One type, let's call it `ImportantRecord` is extremely time critical - it's part of the call chain that actually confirms an order. So it is treated with preference. It _used_ to be treated in a function called `lockAndSelectPendingImportantRecords()`, but this record type, while it is still existing in the database, is handled differently these days.

That's the interesting bit: Defenders of the clean code approach argue that _comments_ decay - and this is an example where the _code_ has decayed. With `lockAndSelectPendingImportantRecords ` and `lockAndSelectPendingOtherRecords ` in the same file, on the same screen, one above the other, the `Other` in `lockAndSelectPendingOtherRecords` is obvious. But with the refactoring that moved `lockAndSelectPendingImportantRecords` out, the name `lockAndSelectOtherRecords` is no longer self-explanatory. I'm not saying that it was ever _good_ to begin with, but now it has gotten worse.

Now, the annoying bit is that the method claims that it does two things: It locks and it selects certain records. That's what it says on the tin, right?

The way this service roughly works is the following:

- It receives certain  `Record`s from an upstream service.
- Another service fetches all new `Record`s since last time. This is where this function is called, among others.
- Our service marks the fetched `Record`s to ensure they are not fetched multiple times (this is what the `lock` in the function name tries to express)
- The other service calls another endpoint in our service, upon which we finally mark the `Record` as processed.

I don't claim this process is great, but it is how it is, and this is actually properly documented.
Now, back to `lockAndSelectPendingOtherRecords`. This one is responsible to get all the new `Record`s for a given order number, and lock them. But it contains some more logic: If there is another `Record` for the same order number which is currently being processed (so the other service has fetched it, but not marked it as processed), this function does not return any other `Record`. So it does not only lock and select pending records, it also suppresses pending records in case another record for the same order is still in flight.

Figuring this out was absolutely not obvious from the code, as this is done by some inner `LEFT JOIN` in the SQL.

Then it got frustrating. We wrote a test that adds some records to the database, then calls `lockAndSelectPendingOtherRecords` and looks at the results  - and for some reason, the results were different between two tests. Exactly the same records, in the same order, different results. What?

That's where my extensive qualification as a [Rubber Duck](https://en.wikipedia.org/wiki/Rubber_duck_debugging) came in handy. We went through both test cases bit by bit and found one tiny difference: The test case that worked as expected added an `ImportantRecord` with the status of being fully processed to the DB. The other test case added it as a completely new record, and this lead to all other records to be suppressed.

Turns out that `lockAndSelectPendingOtherRecords` suppresses all records as long as either another `Record`is being processed, or an `ImportantRecord` is present. Why? Because these should be treated with priority by `lockAndSelectPendingImportantRecords`.

In hindsight, knowing the ins and outs of this service, this makes perfect sense. But this is by no means obvious. The method name should be `lockAndSelectRecordsExceptImportantOnesAndOnlyIfNoNewImportantRecordIsPresentAndNoOtherRecordIsInFlight`, because that's what this function does.

Or, you know, just add a comment.


- - -
<p><span>Edited: <code>Saturday, May 3, 2025</code></span></p>
👾
