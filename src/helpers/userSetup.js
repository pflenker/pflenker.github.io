const { DateTime } = require('luxon'); 

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
  md.options.linkify=false;

}
function userEleventySetup(eleventyConfig) {
  
  eleventyConfig.addFilter("removeObsidianCallouts", function(contentValue) {
    if (!contentValue || typeof contentValue !== 'string') { 
      return contentValue; 
    }
    const calloutRegex = /\[![a-zA-Z0-9-]+(?:\|[a-zA-Z0-9-]+)?\]/g;      
    return contentValue.replace(calloutRegex, '');
  });

  eleventyConfig.addFilter("toDateShort", function (date) {
    return  DateTime.fromJSDate(date).toFormat("dd LLL yyyy");
  });
  eleventyConfig.addFilter("toDateMedWithWeekday", function (date) {
    return  DateTime.fromJSDate(date).setLocale("en-US").toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  });
  eleventyConfig.addFilter("toDateHuge", function (date) {
    return  DateTime.fromJSDate(date).setLocale("en-US").toLocaleString(DateTime.DATE_HUGE);
  });
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
