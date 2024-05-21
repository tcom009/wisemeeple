alter table "public"."boardgames" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.search_user_games_by_name_prefix(prefix text)
 RETURNS SETOF user_games
 LANGUAGE plpgsql
AS $function$
begin
  return query
  select * from public.user_games where to_tsvector(game_name) @@ to_tsquery(prefix || ':*');
end;
$function$
;


