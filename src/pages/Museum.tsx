import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft, MapPin, Clock, Volume2, VolumeX, Sparkles, Users, Calendar, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMuseum } from "@/hooks/useMuseums";
import MuseumChatbot from "@/components/MuseumChatbot";

const Museum = () => {
  const { id } = useParams();
  const { data: museum, isLoading, error } = useMuseum(id);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextToSpeech = () => {
    if (!museum?.description) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(museum.description);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[image:var(--gradient-space)] relative">
        <Navbar />
        <div className="pt-24 pb-12 px-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading museum...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !museum) {
    return (
      <div className="min-h-screen bg-[image:var(--gradient-space)] relative">
        <Navbar />
        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Museum Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The museum you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[image:var(--gradient-space)] relative">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-5xl font-bold mt-4">{museum.name}</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 360 View and About */}
            <div className="lg:col-span-2 space-y-8">
              {/* 360 Tour */}
              <div className="bg-card rounded-2xl shadow-elegant overflow-hidden">
                {museum.kuula_embed_url ? (
                  <a
                    href={museum.kuula_embed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-video bg-gradient-hero relative flex items-center justify-center hover:opacity-90 transition-opacity group"
                  >
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-primary-foreground mb-2">
                        Click here to Enter 360 View
                      </h3>
                      <p className="text-primary-foreground/80">
                        Opens in a new tab
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="aspect-video bg-gradient-hero relative flex items-center justify-center">
                    <div className="p-8 max-w-md w-full text-center">
                      <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                        360° Tour Coming Soon
                      </h3>
                      <p className="text-primary-foreground/80">
                        The virtual tour for this museum is being prepared.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* About This Museum with Key Highlights */}
              {museum.description && (
                <div className="relative bg-card rounded-2xl shadow-elegant overflow-hidden">
                  {/* Decorative gradient background */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold opacity-50"></div>
                  
                  <div className="p-8">
                    {/* Header with icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="relative w-10 h-10 rounded-lg flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-15"></div>
                            <svg className="w-6 h-6 relative z-10 icon-gradient" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h2 className="text-3xl font-bold gradient-text">About This Museum</h2>
                        </div>
                        <div className="h-1 w-20 bg-gradient-gold rounded-full opacity-60"></div>
                      </div>
                      
                      <Button
                        onClick={handleTextToSpeech}
                        variant="outline"
                        size="default"
                        className="gap-2 hover:shadow-gold-glow transition-all"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4" />
                            Stop Reading
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4" />
                            Listen to Description
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Key Highlights Grid */}
                    <div className="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50">
                      <div className="flex items-center gap-3 mb-5">
                        <Sparkles className="w-5 h-5 icon-gradient" />
                        <h3 className="text-xl font-bold">Key Highlights</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-5">
                        {/* Established */}
                        <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg hover:bg-card transition-all">
                          <div className="relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-15"></div>
                            <Calendar className="w-5 h-5 relative z-10 icon-gradient" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">Established</h4>
                            <p className="text-sm text-muted-foreground">Founded in 1995</p>
                          </div>
                        </div>

                        {/* Visitor Capacity */}
                        {museum.visitor_capacity && (
                          <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg hover:bg-card transition-all">
                            <div className="relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-15"></div>
                              <Users className="w-5 h-5 relative z-10 icon-gradient" />
                            </div>
                            <div>
                              <h4 className="font-bold mb-1">Visitor Capacity</h4>
                              <p className="text-sm text-muted-foreground">Up to {museum.visitor_capacity} visitors</p>
                            </div>
                          </div>
                        )}

                        {/* Museum Type */}
                        <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg hover:bg-card transition-all">
                          <div className="relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-15"></div>
                            <Info className="w-5 h-5 relative z-10 icon-gradient" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">Museum Type</h4>
                            <p className="text-sm text-muted-foreground">Natural History Museum</p>
                          </div>
                        </div>

                        {/* Regional Center */}
                        <div className="flex items-start gap-3 p-4 bg-card/50 rounded-lg hover:bg-card transition-all">
                          <div className="relative w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-gold rounded-lg opacity-15"></div>
                            <MapPin className="w-5 h-5 relative z-10 icon-gradient" />
                          </div>
                          <div>
                            <h4 className="font-bold mb-1">Regional Center</h4>
                            <p className="text-sm text-muted-foreground">Southern India Hub</p>
                          </div>
                        </div>
                      </div>

                      {/* Featured Collections */}
                      <div className="pt-5 border-t border-border/50">
                        <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                          <svg className="w-4 h-4 icon-gradient" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          Featured Collections & Exhibits
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-gold"></div>
                            <p className="text-xs font-medium">Biological Diversity Gallery</p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-gold"></div>
                            <p className="text-xs font-medium">Evolution Gallery</p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-gold"></div>
                            <p className="text-xs font-medium">Western Ghats Biodiversity</p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-gold"></div>
                            <p className="text-xs font-medium">Fossil Collections</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description with better typography */}
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground/90 whitespace-pre-line leading-relaxed text-lg">
                        {museum.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom decorative element */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </div>
              )}

              {/* Chatbot Section */}
              <MuseumChatbot museum={museum} />
            </div>

            {/* Sidebar - Museum Info */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl shadow-elegant">
                <h2 className="text-2xl font-bold mb-6">Museum Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 icon-gradient mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">
                        {museum.location}
                      </p>
                    </div>
                  </div>

                  {museum.opening_hours && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 icon-gradient mt-1" />
                      <div>
                        <p className="font-semibold">Opening Hours</p>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {museum.opening_hours}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Museum;
