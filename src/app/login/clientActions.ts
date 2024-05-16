"use server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export async function login(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    console.debug(error);
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    repeatPassword: formData.get("repeatPassword") as string,
  };
  if (data.password !== data.repeatPassword) {
    redirect("/error");
  }
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    console.debug(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
