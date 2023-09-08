"use client";
import {
  Flex,
  Grid,
  Button,
  TextFieldInput,
  Text,
  Heading,
} from "@radix-ui/themes";
import { useState } from "react";
import Link from "next/link";

export default function BGGUserForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const handleForm = (event: any) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const onSubmit = () => {
    if (!query) {
      setError(true);
    }
  };
  return (
    <Flex gap="3" direction={"column"}>
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
      <TextFieldInput
        size={"3"}
        placeholder="Wingspan... "
        type={"text"}
        value={query}
        name="username"
        onChange={handleForm}
        required
      />
      {error && (
        <Text as={"span"} color={"crimson"} size={"2"}>
          Please enter a username or a boardgame name
        </Text>
      )}
      <Flex direction={"row"} gap={"3"} align={"center"} justify={"center"}>
        <Link href={query && `/search/${query}`} className="no-underline">
          <Button size={"3"} mt={"3"} mb={"5"} onClick={onSubmit}>
            Search Game
          </Button>
        </Link>

      </Flex>
    </Flex>
  );
}
