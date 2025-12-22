import { useEffect, useState, useCallback } from "react";
import type { Article } from "../types/article";
import { fetchArticles } from "../api/articlesApi";

type UseArticlesResult = {
  articles: Article[];
  loading: boolean;
  error?: string;
  refresh: () => Promise<void>;
};

export default function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const data = await fetchArticles();
      setArticles(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { articles, loading, error, refresh: load };
}
