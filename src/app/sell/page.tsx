import { Flex, Grid, Text, Container } from "@radix-ui/themes";
import SellForm from "app/sell/SellForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
export default async function SellPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }
  return (
    <Container size={{ lg: "3", md: "3", sm: "1", xs: "1" }}>
      {" "}
      <SellForm />
    </Container>
  );
}
