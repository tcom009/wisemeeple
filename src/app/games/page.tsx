import { createClient } from "@/utils/supabase/server";
import { PageStatus, UserGame } from "@/core/models/models";
import GamesForSale from "./GamesList";

const GamesForSalePage = async () => {
    const supabase = createClient();          
    const { data, error, count } = await supabase
    .from("user_games")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(0, 9);
    if (error) {
        return null;
    }else {
    return (
        <div>
           <GamesForSale games={data} count={count} />
        </div>
    );
   }
};


export default GamesForSalePage;