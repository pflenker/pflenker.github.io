const { JSDOM } = require("jsdom");
function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  
  // --- Filter: Remove Elements with 'transclusion' Class (using JSDOM) ---
  eleventyConfig.addFilter("removeTransclusionElements", function(contentValue) {
    // Return early if content is not a non-empty string
    if (!contentValue || typeof contentValue !== 'string') {
      return contentValue; 
    }

    try {
      // Parse the HTML content
      const dom = new JSDOM(contentValue);
      const document = dom.window.document;
      
      // Select all elements that have the 'transclusion' class
      const elementsToRemove = document.querySelectorAll('.transclusion'); 
      
      // Loop through the selected elements and remove each one
      elementsToRemove.forEach(element => element.remove());
      
      // Return the modified HTML from the body
      return document.body.innerHTML; 
    } catch (e) {
      // Log errors and return original content if parsing/manipulation fails
      console.error(`Error processing content in removeTransclusionElements filter for content starting with "${contentValue.substring(0, 50)}...":`, e);
      return contentValue; 
    }
  });
  // --- End of Filter ---

  // --- Filter: Remove "Edited: ..." Line ---
  eleventyConfig.addFilter("removeEditedLine", function(contentValue) {
    if (!contentValue || typeof contentValue !== 'string') { return contentValue; }
    
    try {
      const dom = new JSDOM(contentValue);
      const document = dom.window.document;
      const paragraphs = document.querySelectorAll('p'); // Get all paragraphs

      paragraphs.forEach(p => {
        // Check if the paragraph structure matches: <p><span>Edited: <code>...</code></span></p>
        
        // 1. Does the <p> contain exactly one child element?
        if (p.children.length === 1) {
          const firstChild = p.firstElementChild;

          // 2. Is that child a <span>?
          if (firstChild?.tagName === 'SPAN') {
            const span = firstChild;

            // 3. Does the <span> contain exactly one child element?
            if (span.children.length === 1) {
              const secondChild = span.firstElementChild;

              // 4. Is that child a <code>?
              if (secondChild?.tagName === 'CODE') {
                
                // 5. Check the text content directly before the <code> tag.
                //    We iterate childNodes to handle potential whitespace text nodes correctly.
                let textBeforeCode = "";
                let foundCode = false;
                for (const node of span.childNodes) {
                  if (node.nodeType === 3) { // 3 is Node.TEXT_NODE
                    textBeforeCode += node.textContent;
                  } else if (node.nodeType === 1 && node.tagName === 'CODE') { // 1 is Node.ELEMENT_NODE
                    foundCode = true;
                    break; // Stop checking nodes once we hit the <code>
                  } else if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '')) {
                    // If we find another element OR non-whitespace text before the <code>, it's not a match
                    textBeforeCode = ""; // Invalidate match
                    break;
                  }
                }

                // 6. Does the collected text before the <code>, when trimmed, equal "Edited:"?
                if (foundCode && textBeforeCode.trim() === 'Edited:') {
                  p.remove(); // If all checks pass, remove the entire paragraph <p>
                }
              }
            }
          }
        }
      }); // end forEach paragraph

      // Return the modified HTML
      return document.body.innerHTML;
    } catch (e) {
      console.error(`Error processing content in removeEditedLine filter for content starting with "${contentValue.substring(0, 50)}...":`, e);
      return contentValue; // Return original content on error
    }
  });
  
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
        const startsWithCalendar = trimmedText.startsWith('🗓️');
        
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

  //
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
