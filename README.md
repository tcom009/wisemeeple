
# Wise Meeple 

An AI based Boardgame recommender

## Contents

- [What is it?](#what-is-it?)
- [How does it work?](#how-does-it-work?)
- [Tech Stack](#tech-stack)
- [What I learned?](#what-i-learned?)
- [Acknowledgements](#acknowledgements)
## What is it?

Wise Meeple lets you choose a boardgame and  retrieves you a list of related boardgames based on the boardgame you previusly choose. It's supported by a vectorial database filled with a curated list of boardgames
## How does it work?

Wise meeple makes use of the [Boardgame Geek XML API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) to access to a the bigest boardgame database in the world,[OpenAI Embedding](https://platform.openai.com/docs/guides/embeddings) models to generate vectors
and a Postgre database with [PGVector](https://supabase.com/docs/guides/database/extensions/pgvector)

Here is a more technical approach on how vectors and embeddings work:

Wise Meeple selects a board game, gathers its description and other interesting details, and formats the information. This data is then sent to the OpenAI Embedding model, which converts the text into a numerical representation called a vector. The newly generated vector is sent to our database, where it's compared to others. The database returns the 10 most similar games based on these vector representations.
## Tech Stack

**Client:** React, Next 13, Radix UI, Vercel
**Server:** Postgres with PG Vector, Supabase


## What I learned?

Beyond the technical learning, I was able to delve deeper into the target market for these types of applications thanks to the feedback received. A second version of Wise Meeple, which includes a marketplace for second-hand games, was proposed. However, other interesting projects have also been brought to the table, leading to the current pause in the development of this project.


## Acknowledgements

 - [Boardgamegeek XML API 2](https://boardgamegeek.com/wiki/page/BGG_XML_API2)
 - [Supabase's Vecs library](https://supabase.com/blog/vecs)

##Run the project:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
