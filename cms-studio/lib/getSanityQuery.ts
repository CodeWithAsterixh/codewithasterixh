import { client } from "./sanityClient";
export async function getSanityQuery(query: string, params = {}) {
  const data = await client.fetch(query, params);
  return data;
}
