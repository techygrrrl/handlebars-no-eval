const Handlebars = require("handlebars");
const Mustache = require("mustache");

// region Helpers

function screamingCase(value) {
  return value.toUpperCase();
}

const formatNumber = (value) => {
  if (!value) {
    return "";
  }

  // returns 3 digit comma formatted string (eg 1,000)
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * lolz: https://github.com/techygrrrl/chatrrr-brandrrr/blob/main/src/server.ts#L30
 */
const forrrMattrrr = (value) => {
  return value.replace(/r/gi, "rrr");
};

// endregion Helpers

/**
 * TODO: Implement
 * @param {String} input 
 * @param {Record<string, string>} placeholders 
 * @returns {String}
 */
function performTextReplacement(input, placeholders) {
  // TODO: code goes here. Return a string that replaces text, running it through the helpers
  return "todo!";
}

/**
 * This implements Handlebars but is in violation with the Chrome WebStore for manifest 3 for using eval.
 * See README for more information
 * @deprecated
 */
function performTextReplacement__withHandleBars(input, placeholders) {
  const handlebarsInstance = Handlebars.create();

  // helpers are registered with Handlebars.
  handlebarsInstance.registerHelper("formatNumber", formatNumber);
  handlebarsInstance.registerHelper("screamingCase", screamingCase);
  handlebarsInstance.registerHelper("forrrMattrrr", forrrMattrrr);

  const template = handlebarsInstance.compile(input);

  return template(placeholders);
}

function performTextReplacement__withMustache(input, placeholders) {
  return Mustache.render(input, placeholders);
}

module.exports = {
  performTextReplacement__withHandleBars,
  performTextReplacement,
  performTextReplacement__withMustache,
};
