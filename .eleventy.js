module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.addNunjucksFilter('joinData', (arr = []) => {
    try {
      return arr
        .map((str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
        .join(', ')
    } catch (error) {
      return ''
    }
  });

  eleventyConfig.addCollection("byResponsibility", function(collectionApi) {
    return collectionApi.getAll().filter(function(item) {
      // Side-step tags and do your own filtering
      return "knowledgeToTest" in item.data;
    });
  });

  /* eleventyConfig.addCollection("byResponsibility", function(collectionApi) {
    return collectionApi.getFilteredByTag("responsibility");
  }); */


  eleventyConfig.addCollection("sortByInteraction", (collection) =>
    collection.getFilteredByGlob("pages/*.md").sort((a, b) => {
      if (a.data.interaction > b.data.interaction) return -1;
      else if (a.data.interaction < b.data.interaction) return 1;
      else return 0;
    })
  );

  eleventyConfig.addCollection("getIteraction", function(collection) {
    return collection.getAll().filter(function(item) {
      return "timeToTest" in item.data;
    });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
