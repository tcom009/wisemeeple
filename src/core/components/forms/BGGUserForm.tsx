"use client";
import { Box, Flex } from "@radix-ui/themes";
import { Button, Card, TextArea, TextFieldInput } from "@radix-ui/themes";
import { useState } from "react";
import Link from "next/link";

export default function BGGUserForm() {
  const [username, setUsername] = useState("");

  const handleForm = (event: any) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  return (
    <Card variant="surface">
      <Flex gap="3" direction={"column"}>
        <h1> Hello!, what&apos;s your boargamegeek.com username?</h1>
        <TextFieldInput
          size={"3"}
          placeholder="Your BGG username..."
          type={"text"}
          value={username}
          name="username"
          onChange={handleForm}
          required
        />
        <Flex>
          <Link href={`/collection/${username}`}>
            <Button size={"3"} mt="3" mb="5">
              Submit
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Card>
  );
}
