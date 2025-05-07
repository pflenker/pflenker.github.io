// Put your computations here.

function userComputed(data) {
  return {
    author: "Philipp Flenker",
    description: "thoughts on stuff, views on things",
    builtAt: new Date().toISOString(),
    created: data["created-date"],
    updated: data["updated-date"],
    type: data["type"],
    title: data["title"],
    tags: data["tags"], 
  };
}

exports.userComputed = userComputed;
