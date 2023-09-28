import games from "@/core/data/games.json";

export const predicate = (
    game: {
      name: string;
      id: string;
    },
    query: string
  ) => game.name.includes(query.toLowerCase());


export const gamesList = games.map((game: { id: string; name: string }) => {
    return {
      id: game.id,
      name: game.name.toLowerCase(),
    };
  });