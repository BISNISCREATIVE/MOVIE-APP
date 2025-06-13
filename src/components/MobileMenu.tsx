
import { Link } from "react-router-dom";
import { X, Search } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search Movie"
            className="w-full bg-muted rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
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
