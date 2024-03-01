import { createClient } from "@/utils/supabase/server";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const getUserProfile = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_id", id)
      .single();
    return { data, error };
  };
  const { data, error } = await getUserProfile(params.id);

  if (error) {
    return <ProfileForm  />;
  }

  return <ProfileForm profile={data} isEditing />;
}
