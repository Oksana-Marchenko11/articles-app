import type { FC } from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import SearchInput from "../components/SearchInput/SearchInput";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import useArticles from "../hooks/useArticles";
import type { Article } from "../types/article";
import "./HomePage.scss";

const HomePage: FC = () => {
  const [query, setQuery] = useState("");
  const { articles, loading, error } = useArticles();

  const normalizedQuery = query.toLowerCase();
  const filtered: Article[] = [...articles]
    .filter(
      ({ title, summary }) =>
        title.toLowerCase().includes(normalizedQuery) ||
        summary?.toLowerCase().includes(normalizedQuery)
    )
    .sort((a, b) => {
      const aMatch = a.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
      const bMatch = b.title.toLowerCase().includes(normalizedQuery) ? 1 : 0;
      return bMatch - aMatch;
    });

  return (
    <Box
      component="main"
      sx={{
        px: 3,
        py: 5,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <SearchInput value={query} onChange={setQuery} />
      </Box>
      <Typography
        component="p"
        variant="body1"
        aria-live="polite"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 1,
          mb: 3,
        }}
      >
        Result: {filtered.length}
      </Typography>
      <Box
        component="section"
        aria-label="Articles container"
        className="home-page__articles"
      >
        {loading && (
          <Typography variant="body2" color="text.secondary">
            Loading...
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        {!loading &&
          !error &&
          filtered.map((article) => (
            <ArticleCard key={article.id} article={article} query={query} />
          ))}
      </Box>
    </Box>
  );
};

export default HomePage;
