import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { MusicSection } from '../components/music/MusicSection';
import { LiveSection } from '../components/shows/LiveSection';
import { WorldSection } from '../components/world/WorldSection';
import { ConnectionsSection } from '../components/connections/ConnectionsSection';
import { WatchSection } from '../components/videos/WatchSection';
import { MomentsSection } from '../components/gallery/MomentsSection';
import { SocialFeedSection } from '../components/social/SocialFeedSection';
import { BookingSection } from '../components/booking/BookingSection';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

export const HomePage: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection onNavigate={onNavigate} />
      <MusicSection />
      <LiveSection />
      <WorldSection />
      <ConnectionsSection />
      <WatchSection />
      <MomentsSection />
      <SocialFeedSection />
      <BookingSection />
    </div>
  );
};
