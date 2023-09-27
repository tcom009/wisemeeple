import { Flex, Grid, Text, Container } from "@radix-ui/themes";
import SellForm from "app/sell/SellForm";
export default function SellPage() {
  return <Container size={{ lg: "3", md: "3", sm: "1", xs: "1" }}> <SellForm/></Container>;
}
