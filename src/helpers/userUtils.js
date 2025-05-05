// Put your computations here.

function userComputed(data) {
  return {
    author: "Philipp Flenker",
    description: "thoughts on stuff, views on things",
    builtAt: new Date().toISOString()
  };
}

exports.userComputed = userComputed;
