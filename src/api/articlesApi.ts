import type { Article } from "../types/article";

export async function fetchArticles(): Promise<Article[]> {
  const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles/");
  if (!res.ok) throw new Error("Failed to fetch articles");
  const data = await res.json();

  if (Array.isArray(data)) return data as Article[];
  if (data && Array.isArray(data.results)) return data.results as Article[];
  throw new Error("Unexpected articles response shape");
}

export async function fetchArticleById(id: string): Promise<Article> {
  const res = await fetch(
    `https://api.spaceflightnewsapi.net/v4/articles/${id}/`
  );
  if (!res.ok) throw new Error("Failed to fetch article");
  return res.json();
}
