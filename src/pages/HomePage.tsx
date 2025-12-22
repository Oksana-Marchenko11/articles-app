import type { FC } from "react";
import { useState } from "react";
import SearchInput from "../components/SearchInput/SearchInput";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import useArticles from "../hooks/useArticles";
import type { Article } from "../types/article";
import { Typography } from "@mui/material";
import "./HomePage.scss";

const HomePage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const { articles, loading, error } = useArticles();

  const filtered: Article[] = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="home-page">
      <div className="home-page__search">
        <SearchInput value={query} onChange={setQuery} />
      </div>
      <Typography
        sx={{
          borderBottom: "1px solid #ccc",
          pb: 1,
          width: "100%",
          mb: 3,
        }}
      >
        Result: {filtered.length}
      </Typography>

      <section className="home-page__articles" aria-label="Articles container">
        {loading && <p>Завантаження...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading &&
          !error &&
          filtered.map((article) => (
            <ArticleCard key={article.id} article={article} query={query} />
          ))}
      </section>
    </main>
  );
};

export default HomePage;
