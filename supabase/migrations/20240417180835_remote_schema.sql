alter table "public"."user_games" drop constraint "public_user_games_catalog_fkey";

alter table "public"."catalog" alter column "created_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."catalog" alter column "created_at" drop not null;

alter table "public"."catalog" alter column "id" set default gen_random_uuid();

alter table "public"."catalog" alter column "id" drop identity;

alter table "public"."catalog" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."user_games" drop column "catalog";

alter table "public"."user_games" add column "catalog_id" uuid not null default gen_random_uuid();

alter table "public"."user_games" alter column "owner_id" set not null;

alter table "public"."user_games" add constraint "public_user_games_catalog_id_fkey" FOREIGN KEY (catalog_id) REFERENCES catalog(id) not valid;

alter table "public"."user_games" validate constraint "public_user_games_catalog_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile(profile_id uuid, first_name text, last_name text, country text, phone text, city text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$ BEGIN INSERT INTO profiles (profile_id, first_name, last_name, country, phone, city) VALUES (profile_id, first_name, last_name, country, phone, city); INSERT INTO catalog ("user") VALUES (profile_id); END; $function$
;

create policy "insert_catalog"
on "public"."catalog"
as permissive
for insert
to public
with check (((auth.uid() IS NOT NULL) AND (NOT (EXISTS ( SELECT 1
   FROM catalog catalog_1
  WHERE (catalog_1."user" = auth.uid()))))));


create policy "select_catalog"
on "public"."catalog"
as permissive
for select
to public
using (true);



