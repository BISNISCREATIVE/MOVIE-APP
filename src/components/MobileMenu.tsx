
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { SearchInput } from "./SearchInput";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isSearchLoading?: boolean;
}

export const MobileMenu = ({ 
  isOpen, 
  onClose, 
  searchQuery = "", 
  onSearchChange,
  isSearchLoading = false
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2 text-xl font-bold">
          🎬 Movie
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 space-y-6">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange || (() => {})}
          placeholder="Search Movie"
          isLoading={isSearchLoading}
        />
        
        <nav className="space-y-4">
          <Link
            to="/"
            onClick={onClose}
            className="block text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={onClose}
            className="block text-lg font-medium hover:text-primary transition-colors"
          >
            Favorites
          </Link>
        </nav>
      </div>
    </div>
  );
};
