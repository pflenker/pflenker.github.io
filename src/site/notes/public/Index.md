---
{"dg-publish":true,"dg-path":"Index.md","permalink":"/index/","title":"this is philipp","tags":["gardenEntry"]}
---

![A Portrait Picture of Philipp Flenker|167](/img/user/attachments/IMG_7628.jpeg)

# philipp flenker
💬 _he/him_ ⋮ 📍Luedinghausen, 🇩🇪 ⋮ 💼 [Zalando](https://engineering.zalando.com/)

## Hey, I'm Philipp.
I'm a husband and proud father. I like to run, and I collect Super Nintendo games. I am an Engineering Manager in Zalando Payments, and a Software Engineer at heart.

I like to understand things. Helping teams and people grow gives me joy.

- 🪪 [Me in 10 Minutes](https://flenker.blog/about-me/)
- ☕ [[public/now\|What I am doing now]]

## Latest Blip
```dataviewjs
const first = dv.pages('"public/blips"').sort(b => b["created-date"], "desc").map(page => `![[${page.file.name}#^blip]]`)[0];
dv.span(first);
```
[[public/all-blips\|🗣️ See All]]

## Articles & Texts
- 🧑‍💻 [hecto: Build Your Own Text Editor in Rust](https://flenker.blog/hecto/)
- 🪦 [Pet Project Sematary](https://flenker.blog/pet-project-sematary/)

### Recent Articles
```dataviewjs
dv.list(dv.pages('"public"')
  .where(p => p["dg-publish"] && p.type === "post")
  .sort(p => p["created-date"], 'desc')
  .limit(3)
  .map(p => "📆 `" + p["created-date"].setLocale("en-US").toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) + "` [[public/" + p.file.name + "|" + p.title + "]]")
)
```
[[public/All Articles\|📝 See All]]

## Get in Touch
I love hearing from people. Do not hesitate to contact me:
- 📧 [hello@philippflenker.com](mailto:hello@philippflenker.com)
- 🔐 [philipp.1701 on signal](https://signal.me/#eu/gs5cb8Xjs5Pqo2UFnMnBASqp936nLEPIhjKqPTJFxZZES2C9blBNQ4RWZycBUSLM)
- 👔 [pflenker on linkedin](https://de.linkedin.com/in/pflenker)
- 👟 [philipp on strava](https://www.strava.com/athletes/126345196)

---

👾
