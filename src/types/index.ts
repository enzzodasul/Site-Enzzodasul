export interface Song {
  id: string;
  title: string;
  artist: string;
  featuredArtists?: string[];
  album?: string;
  coverUrl: string;
  audioUrl: string;
  duration: string; // e.g. "3:42"
  plays: number;
  featured?: boolean;
  releaseYear?: number;
  spotifyUrl?: string;
  youtubeUrl?: string;
  waveform?: number[];
}

export interface Show {
  id: string;
  title: string;
  venue: string;
  city: string;
  state: string;
  country: string;
  date: string; // ISO format or display string
  time: string;
  ticketStatus: 'available' | 'sold_out' | 'coming_soon';
  ticketUrl?: string;
  isNext?: boolean;
  description?: string;
  coverImage?: string;
  latitude: number;
  longitude: number;
}

export interface Artist {
  id: string;
  name: string;
  role: 'Artist' | 'Producer' | 'Composer' | 'Featured' | 'DJ' | 'Musician';
  avatarUrl: string;
  bio?: string;
  spotifyUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  collaborationsCount: number;
  sharedTracks: string[]; // Song IDs
}

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  showsCount: number;
  lastPerformance: string;
  events: string[];
  notes?: string;
  photos?: string[];
}

export interface Video {
  id: string;
  title: string;
  category: 'LIVE' | 'MUSIC' | 'BACKSTAGE' | 'MOMENTS';
  youtubeId: string;
  thumbnailUrl: string;
  views: number;
  duration: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  city?: string;
  event?: string;
  date?: string;
  category: 'SHOWS' | 'BACKSTAGE' | 'MOMENTS' | 'STUDIO';
}

export interface SocialPost {
  id: string;
  caption: string;
  imageUrl: string;
  postUrl: string;
  likes: number;
  comments: number;
  date: string;
  category: 'SHOWS' | 'BACKSTAGE' | 'MUSIC' | 'MOMENTS' | 'COLLABS';
}

export interface CareerStats {
  shows: number;
  cities: number;
  countries: number;
  streams: number;
  collaborations: number;
}

export interface Connection {
  id: string;
  fromArtistId: string; // 'enzzo'
  toArtistId: string;
  relationship: 'Featured' | 'Producer' | 'Composer' | 'Co-Author' | 'Band';
  trackTitle?: string;
}

export interface BookingRequest {
  id?: string;
  name: string;
  companyOrEvent: string;
  city: string;
  date: string;
  eventType: string;
  estimatedAudience: string;
  whatsapp: string;
  instagram?: string;
  message: string;
  createdAt?: string;
}

export interface AudioPlayerState {
  currentTrack: Song | null;
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
  volume: number;
}
