import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface DemoVideoProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function DemoVideo({ 
  videoUrl, 
  thumbnailUrl = "/demo-thumbnail.jpg",
  title = "Se hvordan Assurly.io hjælper dig",
  description = "Få professionel forsikringsanalyse på få minutter",
  className = ""
}: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayClick = () => {
    if (videoUrl) {
      setIsPlaying(true);
      setShowVideo(true);
    } else {
      // Placeholder behavior when no video is available
      alert("Demo video kommer snart! Vi arbejder på at færdiggøre vores præsentationsvideo.");
    }
  };

  // If video URL is provided, show embedded video player
  if (showVideo && videoUrl) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black">
            <video
              className="w-full h-full"
              controls
              autoPlay
              muted={isMuted}
              src={videoUrl}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <track kind="captions" src="/video-captions-da.vtt" srcLang="da" label="Dansk" />
              Din browser understøtter ikke video.
            </video>
            
            {/* Video controls overlay */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => {
                  const video = document.querySelector('video');
                  if (video && video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default: Show thumbnail with play button
  return (
    <Card className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-trust-blue to-blue-600">
          {/* Placeholder thumbnail or actual thumbnail */}
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if thumbnail fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm opacity-90">{description}</p>
              </div>
            </div>
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
            <Button
              size="lg"
              onClick={handlePlayClick}
              className="bg-white/90 text-trust-blue hover:bg-white hover:scale-110 transition-all duration-200 rounded-full p-6"
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>

          {/* Video duration badge (when available) */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            1:30
          </div>
        </div>
        
        {/* Video info below thumbnail */}
        <div className="p-4">
          <h3 className="font-semibold text-dark-text mb-1">{title}</h3>
          <p className="text-sm text-professional-gray">{description}</p>
          
          {/* Call to action */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-professional-gray">
              {videoUrl ? "Klik for at afspille" : "Kommer snart"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayClick}
              className="text-trust-blue border-trust-blue hover:bg-trust-blue hover:text-white"
            >
              {videoUrl ? "Afspil" : "Forhåndsvisning"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Alternative simple embed for external video platforms
export function ExternalVideoEmbed({ 
  embedUrl, 
  title,
  className = ""
}: { 
  embedUrl: string; 
  title: string;
  className?: string;
}) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}