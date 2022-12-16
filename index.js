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

const helpers = {
  formatNumber,
  screamingCase,
  forrrMattrrr,
}

/**
 * @param {String} input
 * @param {Record<string, string>} placeholders 
 * @returns {String}
 */
function performTextReplacement(input, placeholders) {
  let output = input;

  // Thanks QuLogic!
  // https://regex101.com/r/er0Vkk/1
  const regExp = /(?<statement>{{((?<variable>[^} ]+)|(?<helper>[^} ]+) (?<argument>[^}]+))}})/gm
  let matches = regExp.exec(input)

  if (!matches) {
    return output
  }


  while (matches) {
    const helperName = matches?.groups?.helper
    const helperArg = matches?.groups?.argument

    // With helpers
    if (helperName && helperArg) {
      const helperFunc = helpers[helperName]

      if (typeof helperFunc === 'function') {
        const transformedPlaceholder = helperFunc(placeholders[helperArg])

        output = output
          .replaceAll(matches.groups.statement, transformedPlaceholder)
      }
    }

    // No helpers
    const placeholder = matches?.groups?.variable
    if (placeholder) {
      output = output
        .replaceAll(matches.groups.statement, placeholders[placeholder])
    }

    matches = regExp.exec(input)
  }

  // No helpers, return original input
  return output
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
