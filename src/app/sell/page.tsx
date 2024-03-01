import SellFormWizard from "./SellFormWizard";
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
    <Container size={{ lg: "3", md: "3", sm: "3", xs: "1" }}>
      {" "}
      <SellFormWizard />
    </Container>
  );
}
