import Navbar from "@/components/Navbar";
import { ArrowRight, Globe2, Image, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import museumGalleryHero from "@/assets/museum-gallery-hero.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [isDiving, setIsDiving] = useState(false);

  const handleExploreClick = () => {
    setIsDiving(true);
    setTimeout(() => {
      navigate('/museums');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-space)] relative">
      <Navbar />

      {/* Hero Section with Museum Background */}
      <section className="relative h-[85vh] min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src={museumGalleryHero}
          alt="Grand classical museum gallery with paintings and sculptures"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isDiving ? 'scale-[2] blur-sm' : 'scale-100'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-500 ${isDiving ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 transition-all duration-500 ${isDiving ? 'opacity-0' : 'opacity-100'}`} />

        {/* Hero Content */}
        <div className={`relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center transition-all duration-500 ${isDiving ? 'opacity-0 scale-125' : 'opacity-100 scale-100'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in text-white drop-shadow-2xl leading-tight">
             Experience the Joy of     
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mt-2">Miracles in the Past</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-10 animate-fade-in drop-shadow-lg font-light leading-relaxed">
            Discover iconic masterpieces and hidden gems from legendary museums worldwide.
            Immerse yourself in art, history, and culture through stunning 360° virtual experiences.
          </p>

          <Button
            size="lg"
            onClick={handleExploreClick}
            disabled={isDiving}
            className={`relative text-lg px-8 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-200 animate-fade-in group disabled:opacity-50 ${
              isDiving ? 'scale-105' : ''
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Begin Your Journey
              <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${
                isDiving ? 'translate-x-2' : 'group-hover:translate-x-2'
              }`} />
            </span>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Your Virtual Museum Experience
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-gold-glow transition-all group">
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl opacity-15"></div>
                <Globe2 className="w-9 h-9 relative z-10 icon-gradient" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Access</h3>
              <p className="text-muted-foreground">
                Visit museums from around the world without leaving your home.
                Access cultural treasures from every continent.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-gold-glow transition-all group">
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl opacity-15"></div>
                <Image className="w-9 h-9 relative z-10 icon-gradient" />
              </div>
              <h3 className="text-2xl font-bold mb-4">360° Tours</h3>
              <p className="text-muted-foreground">
                Immerse yourself in high-quality 360° panoramic views.
                Click and explore interactive elements within each space.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-elegant hover:shadow-gold-glow transition-all group">
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 bg-gradient-gold rounded-2xl opacity-15"></div>
                <Info className="w-9 h-9 relative z-10 icon-gradient" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rich Information</h3>
              <p className="text-muted-foreground">
                Learn about each museum's history, collections, and significance
                with detailed descriptions and context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Virtual Museum. Bringing culture to your fingertips.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
