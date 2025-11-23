import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft, MapPin, Clock, Volume2, VolumeX } from "lucide-react";
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

              {/* About This Museum */}
              {museum.description && (
                <div className="bg-card p-6 rounded-2xl shadow-elegant">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">About This Museum</h2>
                    <Button
                      onClick={handleTextToSpeech}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-4 h-4" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          Listen
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {museum.description}
                  </p>
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
