import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getRecommendations = async (embedding: any) => {
  const { data, error } = await supabase.rpc("match_boardgames", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 10,
  });
  return data;
};

export default getRecommendations;
