import { CollectionItemI, CleanCollectionItem } from "core/models/models";


interface DataI {
  items: {
    item: CollectionItemI[] | CollectionItemI
  }}

/**
 *
 *
 *
 */
export const collectionCleaner = (data: DataI): CleanCollectionItem[] => {
  if (!data.items.item) return [];
  const collection = data.items.item;
  const formattedCollection: CleanCollectionItem[] = [];
  if (!Array.isArray(collection)){
    formattedCollection.push({
      id: collection.attr?.objectid,
      name: collection.name?.text,
      yearpublished: collection.yearpublished?.text ?? "",
      image: collection.image?.text ?? "",
      thumbnail: collection.thumbnail?.text ?? "",
    })
    return formattedCollection
  }
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
