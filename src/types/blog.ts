export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author?: string;
  categories: string[];
};
