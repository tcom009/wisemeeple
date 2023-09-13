"use client";
import {
  Flex,
  Button,
  TextField,
  Text,
  Heading,
  Card,
  Separator,
  IconButton,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearch } from "react-use-search";
import games from "@/core/data/games.json";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useClickOutside } from "@/core/hooks/useClickOutside";
import { capitalize } from "@/core/lib/textUtils";
const predicate = (
  game: {
    name: string;
    id: string;
  },
  query: string
) => game.name.includes(query.toLowerCase());
export default function BGGUserForm() {
  const data = games.map((game: { id: string; name: string }) => {
    return {
      id: game.id,
      name: game.name.toLowerCase(),
    };
  });
  const [error, setError] = useState(false);
  const [filteredGames, query, handleChange, setQuery] = useSearch(
    data,
    predicate,
    { debounce: 200 }
  );
  const ref = useClickOutside(() => setQuery(""));
  const onSubmit = () => {
    if (!query) {
      setError(true);
    }
  };
  useEffect(() => {
    if (query.length !== 0) {
      setError(false);
    }
  },[query])

  return (
    <Flex direction={"column"}>
      <Flex justify={"center"} direction={"column"} gap={"3"}>
        <Heading
          align={"center"}
          size={{ lg: "9", md: "9", sm: "7", xs: "5" }}
          as={"h1"}
        >
          {" "}
          Generate AI based recomendations of boardgames!
        </Heading>
        <Text
          as={"p"}
          color={"gray"}
          align={"center"}
          weight={"bold"}
          size={{ lg: "5", md: "5", sm: "3", xs: "1" }}
        >
          First, let&apos;s search a boardgame:
        </Text>
      </Flex>
      <TextField.Root size={"3"} mt={"5"}>
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input
          placeholder="Wingspan... "
          type={"text"}
          name="query"
          value={query}
          onChange={handleChange}
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
      {filteredGames.length !== 0 && (
        <Card ref={ref}>
          <Flex direction={"column"}>
            {filteredGames
              .slice(0, 9)
              .map((game: { id: string; name: string }, index: number) => (
                <Link
                  href={`/generate/${game.id}`}
                  key={game.id}
                  className="no-underline white-link"
                >
                  {index !== 0 && (
                    <Separator orientation="horizontal" size={"4"} mb={"4"} />
                  )}
                  <Text key={game.id} weight={"bold"} mb={"2"} as={"div"}>
                    {" "}
                    {capitalize(game.name)}
                  </Text>
                </Link>
              ))}
          </Flex>
        </Card>
      )}

      {error && (
        <Text as={"span"} color={"crimson"} size={"2"} mt={"2"}>
          Please enter a boardgame name
        </Text>
      )}
      <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
        {filteredGames.length === 0 && (
          <Link href={query && `/search/${query}`} className="no-underline">
            <Button size={"3"} mt={"5"} onClick={onSubmit}>
              Search Game
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
