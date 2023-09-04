/**
 * Parses XML string to JS object
 * @param XMLString
 * @returns
 */
export const xmlparser = (XMLString: string) => {
  const convert = require("xml-js");
  const data = convert.xml2js(XMLString, {
    compact: true,
    spaces: 2,
    indentAttributes: true,
    attributesKey: "attr",
    textKey: "text",
  });
  return data;
};

