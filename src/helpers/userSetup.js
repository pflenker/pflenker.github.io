const { JSDOM } = require("jsdom");
function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  
  eleventyConfig.addFilter("removeObsidianCallouts", function(contentValue) {
    // Return early if content is not a non-empty string
    if (!contentValue || typeof contentValue !== 'string') { 
      return contentValue; 
    }
    
    try {
      // Regex explanation:
      // \[!       : Matches the literal opening "[!"
      // [a-zA-Z0-9-]+ : Matches the callout type (letters, numbers, hyphen, one or more times)
      // (?:       : Starts a non-capturing group for the optional alias part
      //   \|      : Matches the literal pipe "|" separator
      //   [a-zA-Z0-9-]+ : Matches the alias name (letters, numbers, hyphen)
      // )?        : Ends the non-capturing group and makes it optional (?)
      // \]       : Matches the literal closing "]"
      // g         : Global flag to replace all occurrences in the string
      const calloutRegex = /\[![a-zA-Z0-9-]+(?:\|[a-zA-Z0-9-]+)?\]/g;
      
      // Replace all found callout signifiers with an empty string
      return contentValue.replace(calloutRegex, '');
    } catch (e) {
      // Log errors and return original content just in case
      console.error(`Error processing content in removeObsidianCallouts filter for content starting with "${contentValue.substring(0, 50)}...":`, e);
      return contentValue; 
    }
  });

}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
