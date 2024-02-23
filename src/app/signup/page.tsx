import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import LoginFrom from "@/app/login/LoginForm";
export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if ( data?.user) {
    redirect("/");
  }
  return (
    <>
    <LoginFrom isSignup/>
    </>
  )
}