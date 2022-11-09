module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images/");
  eleventyConfig.addPassthroughCopy("./src/js/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/images/");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addNunjucksFilter('joinData', (arr = []) => {
    try {
      return arr
        .map((str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))
        .join(', ')
    } catch (error) {
      return ''
    }
  });

  // Sort by filter function.
  function sortByOrder(values) {
    let vals = [...values]
    return vals.sort((a, b) => Math.sign(a.data.order - b.data.order))
  }

  // Add the filter.
  eleventyConfig.addFilter('sortByOrder', sortByOrder);

  return {
    dir: {
      input: "src",
      output: "public",
    }
  }
}
