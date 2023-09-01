export interface FoundGameI {
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

export interface CollectionItemI{
  attr:{
    objectid:string
  }
  name:{
    text:string
  },
  yearpublished:{
    text:string
  },
  image:{
    text:string
  },
  thumbnail:{
    text:string
  }
}

export interface FoundCollectionI {
  items:{
    item:CollectionItemI[]
  }
}

export interface CleanCollectionItem{
  id:string,
  name:string,
  yearpublished:string,
  image:string,
  thumbnail:string
}


export interface CleanCollection {
  items: CleanCollectionItem[]
}