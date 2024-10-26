"use client";
import { TextField, Card, Box, Text, Flex } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { trimText } from "../lib/textUtils";
import Link from "next/link";
import { formatMoney } from "../lib/formatMoney";
import { conditionMap } from "../data/gameDetails";
interface State {
  query: string;
  results: any[];
}
const NavSearchBar = () => {
  const [state, setState] = useState<State>({
    query: "",
    results: [],
  });
  const MAX_TEXT_LENGHT = 25;
  const { query, results } = state;
  const supabase = createClient();

  const searchGame = async (query: string) => {
    const response = await supabase.rpc("search_user_games_by_name_prefix", {
      prefix: query,
    });
    if (response.error) {
      return null;
    }
    setState((prevState) => ({
      ...prevState,
      results: response.data.slice(0, 9),
    }));
  };
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      query: value,
    }));
    if (value.length !== 0) {
      searchGame(value);
    }
  };
  useEffect(() => {
    if (query.length === 0) {
      setState((prevState) => ({
        ...prevState,
        results: [],
      }));
    }
  }, [query]);

  return (
    <Flex direction={"column"} gap={"2"}>
      <TextField.Root size={{ xl: "2", lg: "2", md: "1", sm: "1", xs: "1" }}>
        <TextField.Input
          placeholder="Busca un juego "
          onChange={handleOnChange}
          type={"text"}
          name="game_search"
          value={query}
          autoComplete="off"
          autoFocus
          required
          onKeyDown={handleKeyDown}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon width={"20"} height={"20"} />
        </TextField.Slot>
      </TextField.Root>
      {results.length !== 0 && (
        <Flex width={"100%"} position={"absolute"} mt="6">
          <Card variant={"surface"}>
            {results.map((result) => (
              <div
                key={result.id}
                onClick={() => setState({ query: "", results: [] })}
              >
                <Link
                  href={`/game/${result.id}`}
                  className="no-underline white-link"
                >
                  <Text>{`${trimText(
                    result.game_name,
                    MAX_TEXT_LENGHT
                  )} `}</Text>
                  <Text size={"1"} weight={"light"}>{`${conditionMap.get(result.condition)}`}</Text>
                  <Text weight={"bold"}>{`  -  $${formatMoney(result.price)}`}</Text>
                </Link>
              </div>
            ))}
          </Card>
        </Flex>
      )}
    </Flex>
  );
};

export default NavSearchBar;
