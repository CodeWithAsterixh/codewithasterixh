import  {createClient} from "@sanity/client";
import env from "d/env";
export const client = createClient({
  projectId: env.PID,
  dataset: env.DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});
