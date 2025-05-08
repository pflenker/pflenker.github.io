// src/site/notes/public/404.11tydata.js
module.exports = {
    eleventyComputed: {
      permalink: data => {
        // This console log is crucial. It will show up in your Eleventy build output in the terminal.
        console.log(`[404.11tydata.js - eleventyComputed] Processing for page: ${data.page.inputPath}`);
        if (data.permalink) {
          console.log(`[404.11tydata.js - eleventyComputed] Original permalink from front matter/previous data: ${data.permalink}`);
        } else {
          console.log(`[404.11tydata.js - eleventyComputed] Original permalink from front matter/previous data: not set or undefined`);
        }
  
        // No matter what the original permalink was, we return the desired file path.
        console.log(`[404.11tydata.js - eleventyComputed] Forcing permalink to: "/404.html"`);
        return "/404.html";
      },
      // Let's add another computed value just to be 100% sure this eleventyComputed block is processed.
      debug_flag_from_11tydata_computed: () => {
          console.log("[404.11tydata.js - eleventyComputed] The 'debug_flag_from_11tydata_computed' is being set.");
          return true;
      }
    }
  };