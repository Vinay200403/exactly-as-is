import { useNavigate } from "react-router-dom";
import { useMuseums } from "@/hooks/useMuseums";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Explore = () => {
  const navigate = useNavigate();
  const { data: museums, isLoading } = useMuseums();

  return (
    <div className="min-h-screen bg-[image:var(--gradient-space)] relative">
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-24 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Explore Museums
          </h1>
          <p className="text-xl text-primary/80 mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover cultural treasures from around the world through immersive virtual tours
          </p>
          <div className="w-full max-w-xl mx-auto animate-fade-in">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Museums Grid */}
      <div className="container mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded-lg mb-4" />
                <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {museums?.map((museum) => (
              <Card
                key={museum.id}
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                onClick={() => navigate(`/museum/${museum.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  {museum.featured_image ? (
                    <img
                      src={museum.featured_image}
                      alt={museum.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-6xl gradient-text">🏛️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {museum.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{museum.location}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/museum/${museum.id}`);
                    }}
                  >
                    Explore Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && museums?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No museums found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
