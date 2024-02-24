import SellForm from "app/sell/SellForm";
import { createClient } from "@/utils/supabase/server"; 
import { redirect } from "next/navigation";
import { Container } from "@radix-ui/themes";
export const dynamic = 'force-dynamic'


export default async function SellPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/login");
  }
  return (
    <Container size={{ lg: "3", md: "3", sm: "1", xs: "1" }}>
      {" "}
      <SellForm />
    </Container>
  );
}
