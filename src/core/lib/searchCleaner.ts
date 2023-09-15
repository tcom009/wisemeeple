import { CleanCollectionItem, SearchGameI } from "core/models/models";
import { config } from "config";

interface DataI {
  items: {
    item: SearchGameI[] | SearchGameI;
  };
}

/**
 *
 *Cleans the search results, removes duplicates, and returns an array
 *TODO: Add a sorting algorithm
 */
export const searchCleaner = (
  data: DataI,
  query: string
): CleanCollectionItem[] => {
  if (!data.items.item) return [];
  const collection: SearchGameI | SearchGameI[] = data.items.item;
  const formattedCollection: CleanCollectionItem[] = [];
  if (!Array.isArray(collection)) {
    formattedCollection.push({
      id: collection.attr?.id,
      name: collection.name?.attr.value,
      yearpublished: collection.yearpublished?.attr.value ?? "",
    });
    return formattedCollection;
  }
  collection.forEach((item: SearchGameI) => {
    const cleanItem: CleanCollectionItem = {
      id: item.attr?.id,
      name: item.name?.attr?.value,
      yearpublished: item.yearpublished?.attr?.value ?? "",
    };
    formattedCollection.push(cleanItem);
  });
  const cleanQuery = query.replace("%20", " ").trim().toLocaleLowerCase();
  const exactMatch = formattedCollection.filter(
    (game: CleanCollectionItem) => game.name.toLocaleLowerCase() === cleanQuery
  );
  const coincidences = formattedCollection.filter((game: CleanCollectionItem) =>
    game.name.toLowerCase().includes(cleanQuery)
  );
  coincidences.sort((a, b) => a.name.length - b.name.length);
  const noCoincidences = formattedCollection.filter(
    (objeto) => !objeto.name.includes(cleanQuery)
  );
  const sortedResults = [...exactMatch, ...coincidences, ...noCoincidences];
  const removeDuplicates = [
    ...new Map(sortedResults.map((item) => [item.id, item])).values(),
  ];
  return removeDuplicates.slice(0, config.MAX_SEARCH_RESULTS);
};
