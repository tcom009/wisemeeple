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
    <>
      <TextField.Root size={"3"} mt={"5"}>
        <TextField.Slot>
          <Flex align="center">
            <IconButton size="3" variant={"ghost"} onClick={onSubmit}>
              <MagnifyingGlassIcon width={"20"} height={"20"} />
            </IconButton>
          </Flex>
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
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost" onClick={() => setQuery("")}>
              <Cross2Icon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>
    </>
  );
}
