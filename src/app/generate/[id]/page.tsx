import { config } from "config";
import { xmlparser } from "@/core/lib/xmlparser";
import { createPrompt } from "@/core/lib/createPrompt";
import { fullGameParser } from "@/core/lib/fullGameParser";
import getSingleGame from "core/lib/getGame";
import { trimAndClean } from "@/core/lib/textUtils";
import embeddingGenerator from "core/lib/getVectors";
import getRecommendations from "@/core/lib/getRecommendations";
import {
  Container,
  Avatar,
  Flex,
  Box,
  Text,
  Heading,
  Grid,
  Card,
} from "@radix-ui/themes";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export default async function Page({ params }: { params: { id: string } }) {
  const gameId = params.id;
  const game = await getSingleGame(gameId);
  const parsedGame = fullGameParser(game);
  const prompt = createPrompt(parsedGame);
  const embedding = await embeddingGenerator(prompt);
  const recommendations = await getRecommendations(embedding);


  const { name, description, image } = parsedGame;

  return (
    <Container size={{ lg: "3", md: "3", sm: "1", xs: "1" }}>
      <Avatar src={image} fallback={name[0]} size={"9"} />
      <Heading>{name}</Heading>
      <Text as={"p"}>
        {trimAndClean(description, 400)}{" "}
        <Link href={`${config.BGG_GAME_URL}${gameId}`} target="_blank">
          Read more.
        </Link>
      </Text>
      <Flex align={"center"} justify={"center"} my={"5"}>

      <Text align={"center"} size={"5"} weight={"bold"}> Wise Meeple Recommends:</Text>
      </Flex>
      <Grid gap={"4"} columns={"3"} mt={"3"}>
        {recommendations.map((game: any) => (
          <Card  key={game.id}>
            <Flex align={"center"} justify={"center"} mb={"3"}>
              <Text>
                {" "}
                {game.metadata.name} - {game.metadata.year_published}{" "}
                <Link
                  href={`${config.BGG_GAME_URL}${game.metadata.bgg_id}`}
                  target="_blank"
                >
                  <ExternalLinkIcon />
                </Link>
              </Text>
            </Flex>
            <Flex align={"center"} justify={"center"}>
              <Avatar
                src={game.metadata.image}
                fallback={game.metadata.name[0]}
                size={"9"}
              />
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

// create function match_boardgames (
//     query_embedding vector (1536),
//     match_threshold float,
//     match_count int
//   ) returns table (id varchar, metadata jsonb, similarity float) language sql stable as $$
//     select
//       vecs.boardgames.id,
//       vecs.boardgames.metadata,
//       1 - (vecs.boardgames.vec <=> query_embedding) as similarity
//     from vecs.boardgames
//     where 1 - (vecs.boardgames.vec <=> query_embedding) > match_threshold
//     order by similarity desc
//     limit match_count;
//   $$;
