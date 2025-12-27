import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../api/articlesApi";
import type { Article } from "../types/article";
import "./ArticlePage.scss";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("Invalid article ID");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchArticleById(id);

        if (!cancelled) {
          setArticle(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message || "Failed to load article");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadArticle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!article) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Article not found
      </Typography>
    );
  }

  return (
    <Box className="article-page">
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="article-page__image"
        />
      )}

      <Card className="article-page__card">
        <CardContent
          sx={{
            p: 0,
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          <Typography
            variant="h4"
            className="article-page__card__title"
            mb={"25px"}
          >
            {article.title}
          </Typography>
          <Typography variant="body1" className="article-page__card__summary">
            {article.summary}
          </Typography>
        </CardContent>
      </Card>

      <Button
        component={Link}
        to="/"
        variant="text"
        startIcon={<ArrowBackIcon />}
        sx={{
          alignSelf: "flex-start",
          color: "#363636",
          marginLeft: "75px",
          fontWeight: "700",
        }}
      >
        Back to homepage
      </Button>
    </Box>
  );
};

export default ArticlePage;
