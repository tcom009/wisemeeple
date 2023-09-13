import SearchForm from "@/core/components/forms/SearchForm";
import { Container } from "@radix-ui/themes";

export default function Home() {
  return (
    <Container size={{lg:"2", md:"2", sm:"1", xs:"1"}} mt={"9"}>
      <SearchForm />
    </Container>
  );
}
