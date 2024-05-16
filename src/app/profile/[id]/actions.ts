"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface data {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  country: string;
  profile_id: string;
}

export async function createProfileAndCatalog(data: data) {
    const supabase = createClient();
    const response = await supabase.rpc("create_profile", data);
    if (response.error) {
        //manage error here
      } else {
        revalidatePath("/", "layout")
        redirect("/")
      }
}
