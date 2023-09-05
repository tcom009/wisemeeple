import { CleanCollectionItem, SearchGameI } from "core/models/models";
import { removeListener } from "process";



interface DataI {
  items: {
    item: SearchGameI[] | SearchGameI
  }}

/**
 *
 *
 *
 */
export const searchCleaner = (data: DataI): CleanCollectionItem[] => {
  if (!data.items.item) return [];
  const collection : SearchGameI | SearchGameI[] = data.items.item;
  const formattedCollection: CleanCollectionItem[] = [];
  if (!Array.isArray(collection)){
    formattedCollection.push({
      id: collection.attr?.id,
      name: collection.name?.attr.value,
      yearpublished: collection.yearpublished?.attr.value ?? "",
    })
    return formattedCollection
  }
  collection.forEach((item: SearchGameI) => {
    const cleanItem: CleanCollectionItem = {
      id: item.attr?.id,
      name: item.name?.attr?.value,
      yearpublished: item.yearpublished?.attr?.value ?? "",
    };
    formattedCollection.push(cleanItem);
  });
  const removeDuplicates = [...new Map(formattedCollection.map((item) => [item.id, item])).values()];
  return removeDuplicates.slice(0, 10);
};
