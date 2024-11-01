import { createClient } from "@/utils/supabase/server";
import GamesList from "./GamesList";
const GamesForSalePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const supabase = createClient();
  const currentPage = parseInt((await searchParams).page) || 1;
  const start = (currentPage - 1) * 10;
  const end = currentPage * 10 - 1;
  const { data, error, count } = await supabase
    .from("user_games")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(start, end);
  if (error) {
    return null;
  } else if (data && count) {
    return (
      <div>
        <GamesList games={data} count={count} page={currentPage} />
      </div>
    );
  }
};

export default GamesForSalePage;
