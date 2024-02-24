"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface AuthI {
  email: string;
  password: string;
}
export async function login({ email, password }: AuthI) {
  const supabase = createClient();
  const data = {
    email,
    password,
  };
  const result = await supabase.auth.signInWithPassword(data);
  if (result.error) {
    console.debug(result.error?.message);
    return result;
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({email, password}: AuthI) {
  const supabase = createClient();
  const data = { email, password }
  const result = await supabase.auth.signUp(data);
  if (result.error) {
  return result
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
