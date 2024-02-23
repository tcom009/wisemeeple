"use server";
import { redirect } from "next/navigation";
import { logout } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
export default async function PrivatePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
    redirect("/login");
  }
  return (
    <>
      Hello {data.user.email}
      <form>
        <button formAction={logout}>Logout</button>
      </form>
    </>
  );
}
