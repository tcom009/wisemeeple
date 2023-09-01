import { CollectionItemI, CleanCollectionItem, FoundCollectionI } from "core/models/models";

/**
 *
 *
 *
 */
export const collectionCleaner = (data: FoundCollectionI): CleanCollectionItem[] => {
  const collection = data.items.item;
  const newCollection: CleanCollectionItem[] = [];
  collection.forEach((item: CollectionItemI) => {
    const cleanItem: CleanCollectionItem = {
      id: item.attr?.objectid,
      name: item.name?.text,
      yearpublished: item.yearpublished?.text ?? "",
      image: item.image?.text ?? "",
      thumbnail: item.thumbnail?.text ?? "",
    };
    newCollection.push(cleanItem);
  });
  return newCollection;
};
