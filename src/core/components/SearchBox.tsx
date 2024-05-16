import React from "react";
import { TextField, Flex, IconButton } from "@radix-ui/themes";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
interface PropsI {
  query: string;
  setQuery: (query: string) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  onSubmit: () => void;
}
export default function SearchBox({
  query,
  setQuery,
  handleChange,
  handleKeyPress,
  onSubmit,
}: PropsI) {


  return (
      <TextField.Root size={"3"}>
        <TextField.Slot>
          <IconButton size="3" variant={"ghost"} onClick={onSubmit}>
            <MagnifyingGlassIcon width={"20"} height={"20"} />
          </IconButton>
        </TextField.Slot>
        <TextField.Input
          placeholder="Wingspan... "
          type={"text"}
          name="query"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          autoComplete="off"
          autoFocus
          required
        />
        {query.length !== 0 && (
          <TextField.Slot>
            <IconButton size="2" variant="ghost" onClick={() => setQuery("")}>
              <Cross2Icon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>

  );
}
