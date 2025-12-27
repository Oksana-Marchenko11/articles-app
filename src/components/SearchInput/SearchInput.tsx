import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { TextField, Box, Typography, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchInput.scss";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const SearchInput = forwardRef(function SearchInput(
  {
    value,
    onChange,
    placeholder = "Search articles...",
    ariaLabel = "Search articles",
  }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter by keywords
      </Typography>
      <TextField
        fullWidth
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        inputRef={ref}
        className="search-input"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" sx={{ opacity: 0.6 }} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
});

export default SearchInput;
