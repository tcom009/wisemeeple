import { CollectionItemI, CleanCollectionItem, SearchGameI } from "core/models/models";

/**
 *
 *
 *
 */
export const searchCleaner = (data: any): CleanCollectionItem[] => {
  if (!data.items.item) return [];
  const collection = data.items.item;
  const formattedCollection: CleanCollectionItem[] = [];
  collection.forEach((item: SearchGameI) => {
    const cleanItem: CleanCollectionItem = {
      id: item.attr?.id,
      name: item.name?.attr.value,
      yearpublished: item.yearpublished?.attr.value ?? "",
    };
    formattedCollection.push(cleanItem);
  });
  const removeDuplicates = [...new Map(formattedCollection.map((item) => [item.id, item])).values()];
  return removeDuplicates;
};
