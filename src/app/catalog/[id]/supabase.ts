import { createClient } from "@/utils/supabase/server";

interface catalogOwnerI {
  data: {
    user: string;
    profile: {
      first_name: string;
      last_name: string;
      phone: string;
      city: string;
      country: string;
      avatar: string | null;
    };
  } | null;
  error: any;
}
export const getCatalogOwner: (id: any) => Promise<catalogOwnerI> = async (
  id: any
) => {
  const supabase = createClient();
  const result = await supabase
    .from("catalog")
    .select(
      `
     user,
     profile:profiles (*)
   `
    )
    .eq("id", id)
    .single();
  return result as catalogOwnerI;
};

export const getMatchUserCatalog = async (
  user: string | undefined,
  id: string
) => {
  if (user) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("catalog")
      .select()
      .eq("user", user)
      .single();
    if (data?.id.toString() === id) {
      return true;
    }
    if (error) {
      console.debug(error);
      return false;
    }
  }
  return false;
};
export const getGames = async (id: string) => {
  const supabase = createClient();
  const gamesResult = await supabase
    .from("user_games")
    .select("*")
    .eq("catalog_id", id)
    .order("created_at", { ascending: false });
  return gamesResult;
};

export const getCatalogOwnerAvatar = async (avatarPath: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(avatarPath, 60);
    if (error){
      return null
    }
    return data.signedUrl
  } catch (error) {
    console.log(`Error getting avatar: ${error}`);
    return null;
  }
};
