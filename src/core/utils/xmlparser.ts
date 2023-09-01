import {
  FoundCollectionI,
  CollectionItemI,
  CleanCollectionItem,
} from "core/models/models";

/**
 * Parses XML string to JS object
 * @param XMLString
 * @returns
 */
export const xmlparser = (XMLString: string, ignoreAttributes?: boolean) => {
  const convert = require("xml-js");
  const data = convert.xml2js(XMLString, {
    compact: true,
    spaces: 2,
    indentAttributes: true,
    attributesKey: "attr",
    textKey: "text",
    ignoreAttributes: ignoreAttributes,
  });
  return data;
};

/**
 *
 *
 *
 */
export const collectionCleaner = (data: any): CleanCollectionItem[] => {
  const collection = data.items.item;
  const newCollection: CleanCollectionItem[] = [];
  collection.forEach((item: CollectionItemI) => {

    const cleanItem: CleanCollectionItem = {
      id: item.attr.objectid,
      name: item.name.text,
      yearpublished: item.yearpublished.text,
      image: item.image.text,
      thumbnail: item.thumbnail.text,
    }
    newCollection.push(cleanItem);
  })
  return newCollection
}
