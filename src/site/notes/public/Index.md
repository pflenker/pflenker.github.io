---
{"disabled rules":["header-increment","yaml-title","yaml-title-alias","file-name-heading"],"title":"this is philipp","aliases":["philipp flenker"],"linter-yaml-title-alias":"philipp flenker","created-date":"2025-04-25T17:21:48","updated-date":"2025-05-12T12:30:00","dg-home":true,"dg-publish":true,"dg-pinned":false,"templateEngineOverride":"njk,md","eleventyImport":{"collections":["dgblip"]},"dg-path":"Index.md","permalink":"/index/","tags":["gardenEntry"],"dgPassFrontmatter":true}
---


![flenker-logo-RGB.png|220](/img/user/attachments/flenker-logo-RGB.png)

# philipp flenker
💬 _he/him_ ⋮ 📍Luedinghausen, 🇩🇪 ⋮ 💼 [Zalando](https://engineering.zalando.com/)

## Hey, I'm Philipp.
I'm a husband and proud father. I [[public/Running\|like to run]], and I collect Super Nintendo games. I am an Engineering Manager in Zalando Payments, and a Software Engineer at heart.

I like to understand things. Helping teams and people grow gives me joy.
- - -
{% set blip = collections.dgblip | sort(attribute="data.userComputed.created") | reverse | first %}
{% include "components/user/blip.njk" %}

- - -

- 🪪 [[public/About Me\|Me in 10 Minutes]]
- ☕ [[public/now\|What I am doing now]]
- 🧑‍💻 [[public/hecto\|hecto: Build Your Own Text Editor in Rust]]
- 🪦 [[public/pet-project-sematary\|Pet Project Sematary]]
- 🗣️ [[blips\|All Blips]]
- 📝 [[articles\|All Articles]]

## My most recent Articles
<ul>
{%- for item in collections.dgarticle | sort(attribute="data.userComputed.created") | reverse %}
{%- if loop.index <= 3 %}
 <li>
    <a href="{{item.url | url}}">{{item.data.title}}</a>
  </li>
{%- endif%}
{%- endfor %}
</ul>

## Get in Touch
I love hearing from people. Do not hesitate to contact me:
- 📧 [hello@philippflenker.com](mailto:hello@philippflenker.com)
- 🔐 [philipp.1701 on signal](https://signal.me/#eu/gs5cb8Xjs5Pqo2UFnMnBASqp936nLEPIhjKqPTJFxZZES2C9blBNQ4RWZycBUSLM)
- 👔 [pflenker on linkedin](https://de.linkedin.com/in/pflenker)
- 👟 [philipp on strava](https://www.strava.com/athletes/126345196)
