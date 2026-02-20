import { BaseComponentProps } from "@/components/ui/types";

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  content: string; // HTML string or plain text if we use a simple parser
  excerpt: string;
  tags: string[];
  comments: Comment[];
}

export interface BlogListProps extends BaseComponentProps {
  posts: BlogPost[];
}

export interface BlogPostProps extends BaseComponentProps {
  post: BlogPost;
}
