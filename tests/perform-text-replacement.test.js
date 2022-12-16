const {
  performTextReplacement__withHandleBars,
  performTextReplacement__withMustache,
  performTextReplacement,
} = require("../index");

describe("text replacement", () => {
  const testCases = [
    {
      name: "Standard input with one value",
      input: {
        text: "Hello, my name is {{name}}",
        placeholders: {
          name: "techygrrrl",
        },
      },
      output: "Hello, my name is techygrrrl",
    },
    {
      name: "Standard input with multiple values",
      input: {
        text: "Hello, my name is {{name}} and I am from {{country}}",
        placeholders: {
          name: "techygrrrl",
          country: "Canada",
        },
      },
      output: "Hello, my name is techygrrrl and I am from Canada",
    },

    {
      name: "Input with one helper",
      input: {
        text: "This is an example of {{screamingCase example}}",
        placeholders: {
          example: "screaming",
        },
      },
      output: "This is an example of SCREAMING",
    },

    {
      name: "Input with more than one helper",
      input: {
        text: "Here is a really big number {{formatNumber bigNumber}} and a strange sentence: {{forrrMattrrr sentence}}",
        placeholders: {
          bigNumber: "123456789",
          sentence:
            "The quick brown fox jumped over the lazy dog. Randy the red raccoon ran rapidly to Rhonda",
        },
      },
      output:
        "Here is a really big number 123,456,789 and a strange sentence: The quick brrrown fox jumped overrr the lazy dog. rrrandy the rrred rrraccoon rrran rrrapidly to rrrhonda",
    },
  ];

  describe("handlebars implementation", () => {
    testCases.forEach((testCase, idx) => {
      const { text, placeholders } = testCase.input;
      const expected = testCase.output;

      it(testCase.name, () => {
        const actual = performTextReplacement__withHandleBars(
          text,
          placeholders
        );

        console.log({ expected, actual });
        expect(actual).toEqual(expected);
      });
    });
  });

/*  describe("Mustache implementation", () => {
    testCases.forEach((testCase, idx) => {
      const { text, placeholders } = testCase.input;
      const expected = testCase.output;

      it(testCase.name, () => {
        const actual = performTextReplacement__withMustache(text, placeholders);

        console.log({ expected, actual });
        expect(actual).toEqual(expected);
      });
    });
  });*/

  describe("implementation without handlebars", () => {
    testCases.forEach((testCase, idx) => {
      const { text, placeholders } = testCase.input;
      const expected = testCase.output;

      it(testCase.name, () => {
        const actual = performTextReplacement(text, placeholders);

        console.log({ expected, actual });
        expect(actual).toEqual(expected);
      });
    });
  });
});
