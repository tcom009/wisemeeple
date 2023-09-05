export interface SearchGameI {
  attr: {
    id: string;
  };
  name: {
    attr: {
      value: string;
    };
  };
  yearpublished: {
    attr: {
      value: string;
    };
  };
}


export interface CollectionItemI {
  attr: {
    objectid: string;
  };
  name: {
    text: string;
  };
  yearpublished: {
    text: string;
  };
  image: {
    text: string;
  };
  thumbnail: {
    text: string;
  };
 
}

type LinkTypes =
  | "boardgamecategory"
  | "boardgamemechanic"
  | "boardgamefamily"
  | "boardgameexpansion"
  | "boardgameaccessory"
  | "boardgameimplementation"
  |"boardgameartist"
  |"boardgamepublisher"
  | "boardgamedesigner";

export interface ThingItemI {
  attr: {
    id: string;
  };
  name: { attr: { value: string } } | [{ attr: { value: string } }];
  yearpublished: {
    attr: { value: string };
  };
  image: {
    text: string;
  };
  description: {
    text: string;
  };
  minplayers: {
    attr:{ value: string };
  };
  maxplayers: {
    attr: { value: string };
  };
  playingtime: {
    attr: { value: string };
  };
  minplaytime: {
    attr: { value: string };
  }
  maxplaytime: {
    attr: { value: string };
  }
  minage: {
    attr: { value: string };
  }
  link: [{ attr: { type: LinkTypes; id: string; value: string } }];
}

export interface ParsedThing{
  id: string;
  name: string;
  yearpublished?: string;
  image?: string;
  description: string;
  minplayers: string;
  maxplayers: string;
  playingtime: string;
  minage: string;
  minplaytime: string;
  maxplaytime: string;
  boardgamedesigner: string[];
  boardgamecategory: string[];
  boardgamemechanic: string[];
  boardgamefamily: string[];
}

export interface FoundCollectionI {
  items: {
    item: CollectionItemI[];
  };
}

export interface CleanCollectionItem {
  id: string;
  name: string;
  yearpublished: string;
  image?: string;
  description?: string;
  thumbnail?: string;
}

export interface CleanCollection {
  items: CleanCollectionItem[];
}
