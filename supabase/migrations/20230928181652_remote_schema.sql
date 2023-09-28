
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "vecs";

ALTER SCHEMA "vecs" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."match_boardgames"("query_embedding" "extensions"."vector", "match_threshold" double precision, "match_count" integer) RETURNS TABLE("id" character varying, "metadata" "jsonb", "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  select
    boardgames.id,
    boardgames.metadata,
    1 - (boardgames.vec <=> query_embedding) as similarity
  from boardgames
  where (boardgames.metadata->>'year_published')::int > 2009
  and 1 - (boardgames.vec <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

ALTER FUNCTION "public"."match_boardgames"("query_embedding" "extensions"."vector", "match_threshold" double precision, "match_count" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."match_boardgames"("query_embedding" "extensions"."vector", "match_threshold" double precision, "match_count" integer, "year" integer) RETURNS TABLE("id" character varying, "metadata" "jsonb", "similarity" double precision)
    LANGUAGE "sql" STABLE
    AS $$
  select
    boardgames.id,
    boardgames.metadata,
    1 - (boardgames.vec <=> query_embedding) as similarity
  from boardgames
  where (boardgames.metadata->>'year_published')::int >= year
  and 1 - (boardgames.vec <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

ALTER FUNCTION "public"."match_boardgames"("query_embedding" "extensions"."vector", "match_threshold" double precision, "match_count" integer, "year" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."boardgames" (
    "id" character varying NOT NULL,
    "vec" "extensions"."vector"(1536) NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL
);

ALTER TABLE "public"."boardgames" OWNER TO "postgres";

ALTER TABLE ONLY "public"."boardgames"
    ADD CONSTRAINT "_boardgames_pkey1" PRIMARY KEY ("id");

CREATE INDEX "ix_meta_f613b4b" ON "public"."boardgames" USING "gin" ("metadata" "jsonb_path_ops");

CREATE INDEX "ix_vector_cosine_ops_30_f613b4b" ON "public"."boardgames" USING "ivfflat" ("vec" "extensions"."vector_cosine_ops") WITH ("lists"='30');

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."boardgames" TO "anon";
GRANT ALL ON TABLE "public"."boardgames" TO "authenticated";
GRANT ALL ON TABLE "public"."boardgames" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
