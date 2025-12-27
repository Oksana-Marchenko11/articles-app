import type { Article } from "../../types/article";
import "./ArticleCard.scss";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const ArticleCard = ({
  article,
  query,
}: {
  article: Article;
  query: string;
}) => {
  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const escaped = escapeRegExp(query);
    const parts = text.split(new RegExp(`(${escaped})`, "i"));
    const lowerQuery = query.toLowerCase();

    return parts.map((part, index) =>
      part.toLowerCase().includes(lowerQuery) ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const shortSummary =
    article.summary && article.summary.length > 100
      ? article.summary.slice(0, 100) + "…"
      : article.summary;

  return (
    <Card className="article-card">
      <CardActionArea component={Link} to={`/article/${article.id}`}>
        {article.image_url && (
          <CardMedia
            component="img"
            height="140"
            image={article.image_url}
            alt={article.title}
          />
        )}
        <CardContent className="card-content">
          <Typography variant="body2" color="text.secondary" mb={1.5}>
            {article.published_at}
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            {highlightText(article.title, query)}
          </Typography>
          {shortSummary && (
            <Typography variant="body1" color="text.secondary">
              {highlightText(shortSummary, query)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <Button
        component={Link}
        to={`/article/${article.id}`}
        variant="text"
        endIcon={<ArrowForwardIcon />}
        sx={{
          color: "#363636",
          fontWeight: 700,
          fontSize: "16px",
          fontFamily: "Montserrat, sans-serif",
          textTransform: "none",
          marginTop: "auto",
          alignSelf: "flex-start",
        }}
      >
        Read more
      </Button>
    </Card>
  );
};

export default ArticleCard;
