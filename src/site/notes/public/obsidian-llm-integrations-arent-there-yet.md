---
{"dg-home":false,"dg-pinned":false,"dg-home-link":false,"dg-publish":true,"type":"post","disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"Obsidian LLM Integrations aren't there yet","dg-permalink":"obsidian-llm-integrations-arent-there-yet/","created-date":"2025-04-12T08:45:22","aliases":["Obsidian LLM Integrations aren't there yet"],"linter-yaml-title-alias":"Obsidian LLM Integrations aren't there yet","updated-date":"2025-05-05T17:44:28","tags":["AI","LLM","obsidian","pkm"],"dg-path":"obsidian-llm-integrations-arent-there-yet.md","permalink":"/obsidian-llm-integrations-arent-there-yet/","dgPassFrontmatter":true}
---


I played around with integrating LLMs and Obsidian. I was looking at this from two angles: Getting LLM into Obsidian, so that I can use LLMs directly within the tool (e.g. [Obsidian Copilot](https://www.obsidiancopilot.com/en) ), or exposing Obsidian's Vault data to LLMs so that they can access my vault data and reason about it (e.g. [Obsidian MCP Server](https://github.com/cyanheads/obsidian-mcp-server) ).

I probably installed all related Obsidian plugins in the process.

Here's what I found: Many plugins focus on using LLMs to _generate_ text. Which is fine, I guess, if your main use case for Obsidian is to _write_ (beyond taking notes). Mine isn't.  If you want to use LLMs to actually _reason_ about your notes, there are only two extremes available:

- Either you manually add each note you want the LLM to reason about as context. For instance, a prompt like `When did [[John Doe]] join [[Acme Corp]]?` would add `John Doe.md` and `Acme Corp.md` to the LLM's input.
- Or you make use of "embeddings" - an oversimplified explanation of this would be: it adds the entire vault into a special database (a Vector Database) and makes this available to the LLM.

This applies both to Obsidian plugins and to making the vault available to LLMs outside of the Obsidian application.

In my opinion, all this fails to leverage a crucial strength of Obsidian: Connections between notes. A very common way to take notes in Obsidian is the concept of Daily Notes, where the main note taking happens in a note for any given day, and from this note, links go out to other notes as appropriate.  This is an example how this looks like in my vault:

```markdown
2025-04-12.md 
# Saturday, Apr. 12th 2025
- 👋 [[John Doe]] joined [[Acme Corp]].
```

With this, a LLM neither needs only a single note to work with (looking at `John Doe.md` directly wouldn't even show that backlink), nor is it necessary to look at the entirety of the vault. A query like `When did [[John Doe]] join [[Acme Corp]]?` should take either of the two notes as a starting point, look at the backlinks and work backwards from them. In this case, the answer is only one backlink away.

This is the kind of LLM plugin for Obsidian I am hoping for, but none of the current ones support this.

**Addition:** [This article](https://koomen.dev/essays/horseless-carriages/) provides the vocabulary I am missing for this kind of weirdly aimed AI features: Horseless Carriage.
