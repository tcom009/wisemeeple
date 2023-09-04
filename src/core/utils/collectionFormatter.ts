import { CollectionItemI, CleanCollectionItem, FoundCollectionI } from "core/models/models";

/**
 *
 *
 *
 */
export const collectionCleaner = (data: FoundCollectionI): CleanCollectionItem[] => {
  if (!data.items.item) return [];
  const collection = data.items.item;
  const formattedCollection: CleanCollectionItem[] = [];
  collection.forEach((item: CollectionItemI) => {
    const cleanItem: CleanCollectionItem = {
      id: item.attr?.objectid,
      name: item.name?.text,
      yearpublished: item.yearpublished?.text ?? "",
      image: item.image?.text ?? "",
      thumbnail: item.thumbnail?.text ?? "",
    };
    formattedCollection.push(cleanItem);
  });
  const removeDuplicates = [...new Map(formattedCollection.map((item) => [item.id, item])).values()];
  return removeDuplicates;
};
