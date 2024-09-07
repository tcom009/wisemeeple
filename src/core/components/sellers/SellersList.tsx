"use server";
import {
  Flex,
  Text,
  Container,
  Card,
  ScrollArea,
  Table,
} from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { capitalize } from "@/core/lib/textUtils";
const GamesForSale = async () => {
  const scrollHeight = { height: "60vh" };
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_user_games_counts_func");
  if (error) {
    return <Text>Error</Text>;
  } else {
    const sortedSellers = [...data].sort((a, b) =>
      a.first_name.localeCompare(b.first_name)
    );
    return (
      <>
        <Container>
          <Flex width={"100%"} justify={"center"} align={"center"} my="5">
            <Text weight={"bold"} size={"5"}>
              {" "}
              Lista de vendedores
            </Text>
          </Flex>
          <Card>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Vendedor</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell justify={"center"}>
                    Catálogo
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Ciudad</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
            </Table.Root>
            <ScrollArea
              type="always"
              scrollbars="vertical"
              style={{ height: "60vh" }}
            >
              <Table.Root>
                <Table.Body>
                  {sortedSellers.map((seller: any) => {
                    if (seller.total_games) {
                      return (
                        <Table.Row key={seller.profile_id}>
                          <Table.Cell>
                            <Flex direction={"column"}>
                              <Text>{`${seller.first_name} ${seller.last_name}`}</Text>
                              <Text
                                size={"1"}
                                weight={"light"}
                              >{`${seller.total_games} juegos`}</Text>
                            </Flex>
                          </Table.Cell>
                          <Table.Cell>
                            <Link href={`/catalog/${seller.catalog_id}`}>
                              <PaperPlaneIcon />
                            </Link>
                          </Table.Cell>
                          <Table.Cell>{capitalize(seller.city)}</Table.Cell>
                        </Table.Row>
                      );
                    }
                    return <></>;
                  })}
                </Table.Body>
              </Table.Root>
            </ScrollArea>
          </Card>
        </Container>
      </>
    );
  }
};
export default GamesForSale;
