import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getRecommendations = async (embedding: any, year?: number) => {
  const { data, error } = await supabase.rpc("match_boardgames", {
    query_embedding: embedding,
    match_threshold: 0.78,
    match_count: 10,
    year: year ?? 2009,
  });
  return data;
};

export default getRecommendations;
