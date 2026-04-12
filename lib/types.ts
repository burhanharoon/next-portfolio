export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  url: string | null;
  image: SanityImage | null;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: any[];
  date: string;
  tags: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: "frontend" | "backend" | "database-cloud" | "ai-testing";
  highlighted: boolean;
  order: number;
}

export interface About {
  _id: string;
  headline: string;
  body: any[];
  stats: { label: string; value: string }[];
}

export interface Company {
  _id: string;
  name: string;
  logo: SanityImage | null;
  order: number;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
