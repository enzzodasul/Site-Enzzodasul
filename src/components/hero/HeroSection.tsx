import React from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, ChevronDown, Music2, Instagram, Youtube, Radio } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAudio } from '../../context/AudioContext';
import { mockSongs } from '../../data/mockData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { playSong, isPlaying } = useAudio();

  const handlePlayHeroTrack = () => {
    if (mockSongs.length > 0) {
      playSong(mockSongs[0]);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278"
          alt="Enzzo da Sul Official"
          className="w-full h-full object-cover object-center opacity-25 filter blur-sm contrast-125 saturate-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-surface-border)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* Official Spotify Avatar Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-r from-accent via-white to-accent animate-pulse-glow shadow-2xl">
            <img
              src="https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278"
              alt="Enzzo da Sul"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-4"
        >
          <Badge variant="accent">ARTISTA OFICIAL</Badge>
          <Badge variant="live">18.4K OUVINTES MENSAIS NO SPOTIFY</Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-hero font-display font-black uppercase tracking-tighter text-text leading-none select-none drop-shadow-2xl"
        >
          ENZZO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-text to-accent">DA SUL</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-base sm:text-2xl font-display uppercase tracking-widest text-text-muted max-w-3xl font-medium"
        >
          MUSIC THAT TRAVELS <span className="text-accent">•</span> MÚSICA QUE ATRAVESSA LUGARES
        </motion.p>

        {/* Official Channels Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-3 mt-6"
        >
          <a
            href="https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-lg flex items-center gap-2 hover:bg-emerald-500/25 transition-colors"
          >
            <Music2 className="w-4 h-4" />
            <span>Spotify</span>
          </a>

          <a
            href="https://music.apple.com/br/artist/enzzo-da-sul/1275587030"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono rounded-lg flex items-center gap-2 hover:bg-rose-500/25 transition-colors"
          >
            <Radio className="w-4 h-4" />
            <span>Apple Music</span>
          </a>

          <a
            href="https://www.youtube.com/@enzzodasul"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono rounded-lg flex items-center gap-2 hover:bg-red-500/25 transition-colors"
          >
            <Youtube className="w-4 h-4" />
            <span>YouTube</span>
          </a>

          <a
            href="https://www.instagram.com/enzzodasul/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-mono rounded-lg flex items-center gap-2 hover:bg-pink-500/25 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>@enzzodasul</span>
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="glow"
            size="lg"
            onClick={handlePlayHeroTrack}
            className="flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>{isPlaying ? 'Pausar Áudio' : 'Ouvir Música'}</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              onNavigate('world');
              document.getElementById('world')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-accent" />
            <span>Ver Mapa de Shows</span>
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] font-mono text-text-dim uppercase tracking-widest group-hover:text-accent transition-colors">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-5 h-5 text-accent animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};
