create table "public"."products" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "bgg_id" character varying not null,
    "name" character varying not null,
    "price" character varying not null,
    "status" character varying not null,
    "observations" character varying,
    "language" character varying not null,
    "user_id" uuid not null
);


alter table "public"."products" enable row level security;

CREATE UNIQUE INDEX products_id_key ON public.products USING btree (id);

CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);

alter table "public"."products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."products" add constraint "products_id_key" UNIQUE using index "products_id_key";

alter table "public"."products" add constraint "products_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."products" validate constraint "products_user_id_fkey";


