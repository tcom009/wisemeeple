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
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleForm = (event: any) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const onSubmit = () => {
    if (!username) {
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
          Find AI based recomendations of boardgames!
        </Heading>
        <Text as={"p"} color={"gray"} align={"center"} weight={"bold"}size={{ lg: "5", md: "5", sm: "3", xs: "1" }}>
          Just type in your BGG username or a boardgame name!
        </Text>
      </Flex>
      <TextFieldInput
        size={"3"}
        placeholder="Wingspan... or bgguser"
        type={"text"}
        value={username}
        name="username"
        onChange={handleForm}
        required
      />
      {error && (
        <Text as={"span"} color={"crimson"} size={"2"}>
          Please enter a username or a boardgame name
        </Text>
      )}
      <Link href={username && `/search/${username}`} className="no-underline">
        <Grid>
          <Button size={"3"} mt={"3"} mb={"5"} onClick={onSubmit}>
            Submit
          </Button>
        </Grid>
      </Link>
    </Flex>
  );
}
