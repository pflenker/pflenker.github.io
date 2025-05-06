---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"post","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Ticket Decay: How Short-Term Tickets foster Long-Term Stability","dg-permalink":"ticket-decay-how-short-term-tickets-foster-long-term-stability/","created-date":"2024-10-24T10:27:29","aliases":["Ticket Decay: How Short-Term Tickets foster Long-Term Stability"],"linter-yaml-title-alias":"Ticket Decay: How Short-Term Tickets foster Long-Term Stability","updated-date":"2025-05-05T17:44:28","tags":["specification","tickets","decay"],"dg-path":"ticket-decay-how-short-term-tickets-foster-long-term-stability.md","permalink":"/ticket-decay-how-short-term-tickets-foster-long-term-stability/","dgPassFrontmatter":true}
---


In nearly every software development team, ticket systems serve as the backbone for managing requirements, changes, and collaboration. Each line of code can typically be traced back to a ticket, whether linked to a commit message or a pull request. These tickets form the foundation of communication and traceability, allowing developers to connect code to its original intent. However, over time, the information within ticket diverges from the actual software, leading to confusion and inefficiency. In other words, **tickets decay**. This article explores a strategy to prevent this decay by keeping tickets short-lived, ensuring they stay aligned with the evolving nature of the software.

## Understanding Ticket Decay

To better grasp the problem of decaying tickets, let’s explore a few common types of decay:

- **Context Decay** occurs when information that was once considered obvious and left out of the ticket fades from common knowledge. This typically happens when there's a delay between the ticket's creation and its execution, as the context in which the ticket was originally written changes over time.
- **Assumption Decay** happens when the assumptions underlying the ticket are no longer valid. Assumptions about the problem, the environment, or the solution can shift, making the ticket's original premise outdated.
- **Scope Decay** occurs when the ticket's description no longer accurately reflects the actual scope of work. This often happens during execution, as scope is either discovered or renegotiated without those changes being properly updated in the ticket.
- **Requirements Decay** takes place when the ticket no longer reflects the current requirements of the software. This typically happens after a ticket is marked "done" but the feature it addresses continues to evolve beyond the ticket's original implementation.

## Pre-Execution Decay: Why Long-Lived Tickets Decay Before Work Begins


Between the creation of a ticket and its execution, it decays. Context fades away, priorities shift, assumptions change. Decay starts when we assume the problem described in the ticket is still relevant. It extends when we assume the problem still exists by the time the ticket is acted upon. And it worsens when we assume the outlined solution will still solve that problem effectively. In the best case it's easy to identify these gaps, in the worst case things are only subtly wrong, causing anything from headaches to incidents later on.

I usually do not tolerate tickets in my team's backlog which have not been touched in more than 60 days, though, honestly, even that feels too long.

The longer a ticket lives before it is executed, the more decay it accumulates. A common approach to counteract this is to add more information upfront, but that often just leads to more details that can decay. A ticket can easily contain both too much _and_ too little information: unnecessary context that adds noise, while crucial details that should have been included fade away.

Here’s an analogy: In my house, I usually handle the groceries, and my family often has _very_ specific requests. The other day, one of my daughters wanted a snack she’d discovered at a friend’s house and insisted I get the exact same one (of course). I added "Snack" to my shopping list, figuring that was enough to remind me of the specifics she explained. That worked only because I went grocery shopping soon after. Even though this was just a few days ago, I’ve already forgotten what that snack was.

This is exactly what happens with tickets that sit too long in the backlog. Just like the snack details slipped from my memory, vital context in tickets starts fading, making it harder to act on later.

By moving ticket writing as close to execution as possible, we effectively counteract this decay. This reduces the need to overload the ticket with unnecessary details, as the team’s knowledge is still fresh and relevant, ultimately saving time and effort later on.

# The Risk of Decay During Execution


During execution, tickets decay quickly as the system’s intended behavior, written in the ticket, transforms into its actual behavior, reflected in the code, tests, and documentation. In this phase, Scope Decay occurs as inevitable scope changes and negotiations happen during execution. Teams often discover more efficient implementations, encounter blockers, or refine the initial idea. However, updating the ticket doesn’t always take priority. Since the code and documentation become the new Source of Truth, updating the ticket feels redundant because it’s no longer the most accurate reflection of the system.

Let's stick with the analogy of doing the groceries here. I go to the supermarket with my shopping list, and my wife texts me that we're also fresh out of apple juice, something we didn't add to the initial list.  I discover that the magical snack I mentioned in the previous section is sold out, but I dare not to buy an alternative, lest I have to face the wrath of my child. And besides that, the store is all out of oat milk, so I buy soy milk instead. So I will buy the juice despite it not being mentioned on the shopping list. I cross off the oat milk even though I bought soy milk, and I consider the groceries done even though I didn't buy the snack.

This should sound familiar to anyone who has ever worked on a ticket. Just like tickets, my grocery list changes while I'm shopping. As more information (like my wife's last-minute apple juice request) comes in, I adjust on the fly, often deviating from the original list. But just like with tickets, the longer my list, the more complicated it becomes to manage these changes.

By keeping tickets short and focused, you reduce the room for Scope Decay. There’s less information to lose track of, and the team can more easily stay aligned on what's needed. A smaller ticket is easier to adjust without getting bogged down in reworking outdated details.

My North Star is one-day tickets: write them in the morning, have the changes live by evening. While it's unlikely to ever fully achieve this—just as aiming for the North Star never gets you there—the goal serves as a guide. Aiming for small, quick tickets helps minimize decay. The further a ticket strays from this ideal, the more attention it requires. Anything taking longer than a week to implement risks introducing more Scope Decay, so I set tighter boundaries whenever possible.

## Post-Execution Ticket Decay

As soon as a ticket is marked complete, it starts becoming obsolete. This is where Requirements Decay kicks in: anything described in the ticket may soon be superseded by follow-up changes, making the initial requirements less relevant over time.

The issue isn’t that decay happens—it’s inevitable—but that old tickets remain easily accessible. You’re working with some code, trying to understand _why_ it’s structured a certain way, and the easiest solution is often to `git blame` your way to the original ticket. But relying on decayed tickets as an informal source of truth is risky, especially when not all of the ticket’s context has been preserved in the code or documentation.

Even in regulated environments where the implementation must match the ticket, Requirements Decay remains a problem.

For example, one of our services includes a custom-built queuing mechanism. Over time, developers have questioned whether we could replace it with a standard queuing solution, but no one remembers why it was built this way in the first place. The documentation doesn’t cover it, so we’re forced to dig through old tickets.

After eventually locating the original ticket, we discover that the custom mechanism was necessary at the time because no off-the-shelf solutions supported a required feature. However, by now:


- **Context Decay** means we no longer fully understand why this feature was so crucial.
- **Assumption Decay** suggests that modern solutions might now support this feature, but the ticket doesn’t reflect that possibility.
- **Requirements Decay** leaves us uncertain if the feature is even needed anymore.

In the end, the safest option is to keep the custom solution, not because it’s the best choice, but because the decayed ticket doesn’t offer enough clarity to justify changing it.

The fact that we turn to decayed tickets in the first place shows that critical knowledge often doesn’t make it into the code, tests, or documentation. As long as this gap persists, tickets will continue decaying, leaving teams with incomplete or outdated information when they need it most.

### Conclusion: Addressing Decay with a Stronger Foundation

Ticket decay is inevitable, but by recognizing its different forms—**Context**, **Assumption**, **Scope**, and **Requirements Decay**—we can mitigate its effects. Whether it's avoiding long-lived tickets that decay before execution or acknowledging that the requirements will evolve after a ticket is closed, the solution lies in keeping tickets small and manageable from the start. Scope changes during development are unavoidable, but the smaller and more focused the ticket, the less there is to decay when these changes occur.

Teams often don’t update tickets once the system’s behavior begins to shift, as the ticket’s role is naturally superseded by the code, tests, and documentation. This lack of updating isn't a failure of process; it’s a natural part of how development works. The problem arises when teams rely on these decayed tickets for information, especially post-execution, when requirements continue to evolve.

The real challenge, then, is not in trying to force teams to maintain perfect tickets throughout the development lifecycle—decay will always happen.[^1] Instead, the solution lies in reducing our dependency on tickets for long-term knowledge storage. The software, its tests, alerts, monitoring and its documentation should be the lasting source of truth, reflecting the system’s current state and reasoning, and it should be easy to find the information that you're looking for.

This article explored how ticket decay happens and how smaller, more focused tickets can help reduce its impact. In future discussions, we’ll explore various strategies, including documentation, testing, and monitoring, to ensure that essential knowledge and system behavior remain accessible and accurate as your system evolves.

[^1]: For reasons unrelated to this article, in regulated environments, you cannot let tickets decay - the final ticket needs to match the implementation.
