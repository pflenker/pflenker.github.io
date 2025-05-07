function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js


  function preProcessRule(state) {
    let currentContent = state.src;

    currentContent = currentContent.split('\n')
                                  .filter(line => !line.trim().startsWith('{ .block-language-dataview}'))
                                  .join('\n');

    state.src = currentContent;
  }
  md.core.ruler.before('normalize', 'user_markdown_preprocessor', preProcessRule);


}
function userEleventySetup(eleventyConfig) {
  
  eleventyConfig.addFilter("removeObsidianCallouts", function(contentValue) {
    if (!contentValue || typeof contentValue !== 'string') { 
      return contentValue; 
    }
    const calloutRegex = /\[![a-zA-Z0-9-]+(?:\|[a-zA-Z0-9-]+)?\]/g;      
    return contentValue.replace(calloutRegex, '');
  });

}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
