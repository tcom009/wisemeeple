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

// MODELS FROM BACKEND

export interface UserGame{
  id:string
  created_at: any
  owner_id: string
  bgg_id: any
  condition:any 
  is_sold: boolean
  observations: string
  price: number
  updated_at: any
  game_name: string
  image: string
  language: string
  language_dependency: string

}

export interface ProfileI {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  country: string;
}

export enum PageStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  NOT_FOUND = "NOT_FOUND",
}