import type { ForwardedRef } from "react";
import { forwardRef } from "react";
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
    placeholder = "Пошук статей...",
    ariaLabel = "Пошук статей",
  }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div>
      <h2>Filter by keywords</h2>
      <input
        ref={ref}
        className="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
});

export default SearchInput;
