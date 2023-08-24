import { Box, Flex, Container } from "@radix-ui/themes";
import { Button, Card, TextFieldInput } from "@radix-ui/themes";
export default function Home() {
  return (
    <Flex align="center" justify="center" direction="column" height="100%">
      <Container>

      <Box display={"block"}>
        <Card variant="surface">
          <Flex gap="3" direction={"column"}>
            <h1> Hello! What&apos;s your BoardGameGeek user?</h1>
            <TextFieldInput size={"3"} placeholder="Bgguser..." />
            <Button size={"2"} mt="3" mb="5">Submit</Button>
          </Flex>
        </Card>
      </Box>
      </Container>
    </Flex>
  );
}
