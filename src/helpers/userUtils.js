const { DateTime } = require('luxon'); 

function userComputed(data) {
  let tags = [];
  let type = "OTHER";
  if (data.tags && data.tags.length > 0) {
    tags = data.tags.filter(tag => tag !== "gardenEntry" && tag !== "note" && !tag.startsWith("dg"));
    if (data.tags.includes("dgarticle")){
      type = "ARTICLE";
    } else if (data.tags.includes("dgblip")){
      type = "BLIP"; 
    } else if (data.tags.includes("dgstandalone")){
      type = "STANDALONE";
    }

  }
  
  let created = data["created-date"] && DateTime.fromISO(data["created-date"], { zone: "Europe/Berlin" }).toJSDate();
  let updated = data["updated-date"] && DateTime.fromISO(data["updated-date"], { zone: "Europe/Berlin" }).toJSDate();
  let builtAt = new Date();
  return {
    author: "Philipp Flenker",
    email: "hello@philippflenker.com",
    description: "thoughts on stuff, views on things",
    tags,
    layout: {
      nav: {
        show: !["STANDALONE"].includes(type),
      },
      header: {
        title: !["BLIP"].includes(type) && !data["hide-layout-header-title"],
        created: created && ["ARTICLE", "BLIP"].includes(type),
        tags: tags.length > 0 && ["ARTICLE"].includes(type),
      },
      footer: {
        show: !["STANDALONE"].includes(type),
        updated: created && updated && !data["hide-layout-footer-pageupdate"]
      }      
    },
    builtAt,
    created,
    updated
  };
}

exports.userComputed = userComputed;
