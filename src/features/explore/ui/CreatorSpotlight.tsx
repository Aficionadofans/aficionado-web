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
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId]?.pause();
      }
      video.play().catch(() => {});
      setPlayingId(id);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (!spotlights || spotlights.length === 0) return null;

  return (
    <section aria-label="Creator Spotlight Videos">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#121216] border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,200,0.25)]">
          <Video className="w-5 h-5 text-primary" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Featured UGC Showcase</span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Creator Spotlight</h2>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
        {spotlights.map((spotlight, index) => {
          const isPlaying = playingId === spotlight.id;
          
          return (
            <Card 
              key={spotlight.id}
              onClick={() => togglePlay(spotlight.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  togglePlay(spotlight.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Play spotlight for ${spotlight.role}`}
              className={`min-w-[240px] w-[240px] aspect-[9/16] shrink-0 snap-center liquid-glass-hover border-white/10 overflow-hidden relative cursor-pointer animate-fade-in-up transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                isPlaying ? 'ring-2 ring-primary shadow-[0_0_25px_rgba(0,212,200,0.4)] scale-[1.02]' : ''
              }`}
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
              
              {/* Dark overlay for readability */}
              <div className={`absolute inset-0 transition-colors duration-300 ${isPlaying ? 'bg-black/30' : 'bg-black/55'}`} />
              
              <CardContent className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  {isPlaying ? (
                    <button 
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/70 transition-colors shadow-md"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                    </button>
                  ) : <div />}
                  <div className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
                    isPlaying 
                      ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(0,212,200,0.5)]' 
                      : 'bg-black/50 text-white border-white/20 shadow-lg'
                  }`}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm border border-white/10 ${spotlight.color}`}>
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

