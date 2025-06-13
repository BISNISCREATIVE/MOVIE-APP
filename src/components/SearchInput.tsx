
import { Search, Loader } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isLoading?: boolean;
}

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search Movie",
  className = "",
  isLoading = false
}: SearchInputProps) => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Ensure mobile keyboard opens properly
    e.target.setAttribute('inputmode', 'search');
    e.target.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <Loader className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      )}
      <input
        type="search"
        inputMode="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        autoComplete="off"
        className="w-full bg-muted rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};
