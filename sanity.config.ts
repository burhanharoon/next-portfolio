import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./sanity/schema";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), markdownSchema()],
  schema: { types: schemaTypes },
});
