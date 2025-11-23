import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useMuseumSearch } from "@/hooks/useMuseumSearch";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: searchResults, isLoading } = useMuseumSearch(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults && searchResults.length > 0) {
      navigate(`/museum/${searchResults[0].id}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleMuseumClick = (museumId: string) => {
    navigate(`/museum/${museumId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 icon-gradient" />
          <Input
            type="text"
            placeholder="Search for museums by name or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="pl-12 pr-4 py-6 text-lg rounded-xl border-2 border-border focus:border-accent transition-all shadow-lg"
          />
        </div>
      </form>

      {showResults && searchQuery.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-elegant border border-border max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">
              Searching...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((museum) => (
                <button
                  key={museum.id}
                  onClick={() => handleMuseumClick(museum.id)}
                  className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors flex flex-col gap-1"
                >
                  <span className="font-semibold">{museum.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {museum.location}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No museums found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
