type State = {
  selectedIndex: number;
};

type Action =
  | {
      type: "arrowUp";
      payload: {
        id: string;
        name: string;
      }[];
    }
  | {
      type: "arrowDown";
      payload: {
        id: string;
        name: string;
      }[];
    }
  | { type: "select"; payload: number };

export const initialState: State = { selectedIndex: 0 };
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "arrowUp":
      return {
        selectedIndex:
          state.selectedIndex !== 0
            ? state.selectedIndex - 1
            : action.payload.length - 1,
      };
    case "arrowDown":
      return {
        selectedIndex:
          state.selectedIndex !== action.payload.length - 1
            ? state.selectedIndex + 1
            : 0,
      };
    case "select":
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};
