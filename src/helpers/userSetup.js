const { JSDOM } = require("jsdom");
function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  
  eleventyConfig.addFilter("removeDateInfoLine", function(contentValue) {
    if (!contentValue || typeof contentValue !== 'string') { return contentValue; }
    
    try {
      const dom = new JSDOM(contentValue);
      const document = dom.window.document;
      const paragraphs = document.querySelectorAll('p'); // Get all paragraphs

      paragraphs.forEach(p => {
        // Get the paragraph's text content, trimmed of whitespace
        const trimmedText = p.textContent.trim();
        
        // Check if it starts with the calendar emoji
        const startsWithCalendar = trimmedText.startsWith('🗓️') || trimmedText.startsWith("📆");
        
        // Check if it contains at least one <code> element
        const containsCodeElement = p.querySelector('code') !== null;

        // If BOTH conditions are true, remove the paragraph
        if (startsWithCalendar && containsCodeElement) {
          // Note: This assumes paragraphs starting with 🗓️ and containing a <code>
          // are uniquely the ones you want to remove. 
          // If this proves too broad, we could add checks for the '·' character 
          // or the '🔗' link if necessary for more specificity.
          p.remove(); 
        }
      }); // end forEach paragraph

      // Return the modified HTML
      return document.body.innerHTML;
    } catch (e) {
      console.error(`Error processing content in removeDateInfoLine filter for content starting with "${contentValue.substring(0, 50)}...":`, e);
      return contentValue; // Return original content on error
    }
  });
  // --- End of Filter ---
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
// --- Filter: Remove First H1 Element ---
eleventyConfig.addFilter("removeFirstH1", function(contentValue) {
  // Return early if content is not a non-empty string
  if (!contentValue || typeof contentValue !== 'string') { 
    return contentValue; 
  }
  
  try {
    // Parse the HTML content
    const dom = new JSDOM(contentValue);
    const document = dom.window.document;
    
    // Find the *first* H1 element within the parsed body
    // document.querySelector returns the first match or null if not found
    const firstH1 = document.body.querySelector('h1'); 
    
    // If an H1 was found, remove it from the DOM
    if (firstH1) {
      firstH1.remove();
    }
    
    // Return the modified HTML of the body
    return document.body.innerHTML; 
  } catch (e) {
    // Log errors and return original content if parsing/manipulation fails
    console.error(`Error processing content in removeFirstH1 filter for content starting with "${contentValue.substring(0, 50)}...":`, e);
    return contentValue; 
  }
});
  //
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
