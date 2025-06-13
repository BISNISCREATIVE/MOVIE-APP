
import { Link } from "react-router-dom";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-6">
        <div className="text-4xl">🎬</div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">Data Empty</h3>
      <p className="text-muted-foreground mb-8 max-w-md">
        You don't have a favorite movie yet
      </p>
      
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
      >
        Explore Movie
      </Link>
    </div>
  );
};
