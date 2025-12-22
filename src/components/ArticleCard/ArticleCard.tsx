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
import { Link } from "react-router-dom";
import "./ArticleCard.scss";

const ArticleCard = ({
  article,
  query,
}: {
  article: Article;
  query: string;
}) => {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
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
          <Typography variant="body2" color="text.secondary">
            {article.published_at}
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            {highlightText(article.title, query)}
          </Typography>
          {shortSummary && (
            <Typography variant="body2" color="text.secondary">
              {highlightText(shortSummary, query)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <Button
        component={Link}
        to="`/article/${article.id}`"
        variant="text"
        className="article__read-button"
        sx={{
          color: "#363636",
          fontWeight: "700",
          padding: "16px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Read more -
      </Button>
    </Card>
  );
};

export default ArticleCard;
