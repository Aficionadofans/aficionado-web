"use client";

import { Play, Video, Pause, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/core/card";
import { useState, useRef } from "react";

export interface CreatorSpotlightData {
  id: string;
  role: string;
  description: string;
  gradient: string;
  color: string;
  video_url: string;
}

interface CreatorSpotlightProps {
  spotlights: CreatorSpotlightData[];
}

export function CreatorSpotlight({ spotlights }: CreatorSpotlightProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause currently playing if any
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      video.play();
      setPlayingId(id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full liquid-glass border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Video className="w-5 h-5 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-off-white tracking-wide">Creator Spotlight</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        {spotlights?.map((spotlight, index) => {
          const isPlaying = playingId === spotlight.id;
          
          return (
            <Card 
              key={spotlight.id}
              onClick={() => togglePlay(spotlight.id)}
              className={`min-w-[240px] w-[240px] aspect-[9/16] shrink-0 snap-center liquid-glass-hover border-white/10 overflow-hidden relative cursor-pointer animate-fade-in-up opacity-0 transition-all duration-300 ${isPlaying ? 'ring-2 ring-primary shadow-[0_0_20px_rgba(0,240,181,0.3)] scale-[1.02]' : ''}`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current[spotlight.id] = el;
                }}
                src={spotlight.video_url}
                loop
                playsInline
                muted={isMuted}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              />

              {!isPlaying && (
                <div className={`absolute inset-0 bg-gradient-to-br ${spotlight.gradient} mix-blend-overlay`} />
              )}
              
              {/* Overlay shadow to ensure text is readable always */}
              <div className={`absolute inset-0 transition-colors duration-300 ${isPlaying ? 'bg-black/20' : 'bg-black/50'}`} />
              
              <CardContent className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  {isPlaying ? (
                    <button 
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                    </button>
                  ) : <div />}
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${spotlight.color} drop-shadow-md`}>
                    {spotlight.role}
                  </span>
                  <p className="text-sm font-medium text-white line-clamp-3 leading-snug text-pretty drop-shadow-md">
                    {spotlight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
