import { Song, Show, Artist, Location, Video, GalleryItem, SocialPost, CareerStats, Connection } from '../types';

export const mockCareerStats: CareerStats = {
  shows: 48,
  cities: 18,
  countries: 3,
  streams: 18400, // 18.4K Ouvintes Mensais Oficiais no Spotify
  collaborations: 14,
};

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Música Oficial Enzzo da Sul',
    artist: 'ENZZO DA SUL',
    album: 'Catálogo Oficial',
    coverUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '3:24',
    plays: 18400,
    featured: true,
    releaseYear: 2026,
    spotifyUrl: 'https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH',
    youtubeUrl: 'https://www.youtube.com/@enzzodasul',
    waveform: [15, 30, 45, 80, 60, 90, 75, 40, 65, 85, 95, 70, 50, 80, 60, 40, 30, 85, 90, 100, 65, 45, 20, 10]
  },
  {
    id: 'song-2',
    title: 'Visão da Sul',
    artist: 'ENZZO DA SUL',
    album: 'Apple Music & Spotify',
    coverUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '3:50',
    plays: 14200,
    featured: true,
    releaseYear: 2026,
    spotifyUrl: 'https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH',
    youtubeUrl: 'https://www.youtube.com/@enzzodasul',
    waveform: [20, 40, 60, 50, 70, 80, 90, 85, 60, 75, 80, 95, 60, 40, 50, 70, 85, 90, 60, 40, 30, 20]
  },
  {
    id: 'song-3',
    title: 'Lançamento Recente',
    artist: 'ENZZO DA SUL',
    album: 'Perfil Oficial',
    coverUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '2:45',
    plays: 11800,
    featured: false,
    releaseYear: 2025,
    spotifyUrl: 'https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH',
    youtubeUrl: 'https://www.youtube.com/@enzzodasul',
    waveform: [30, 50, 70, 90, 100, 85, 70, 60, 80, 90, 75, 55, 40, 60, 80, 70, 50, 30]
  }
];

export const mockShows: Show[] = [
  {
    id: 'show-1',
    title: 'Turnê Oficial Enzzo da Sul 2026',
    venue: 'Espaço Hall Urbano',
    city: 'Porto Alegre',
    state: 'RS',
    country: 'Brasil',
    date: '2026-10-15',
    time: '22:00',
    ticketStatus: 'available',
    ticketUrl: 'https://www.instagram.com/enzzodasul/',
    isNext: true,
    description: 'Acompanhe as datas oficiais de shows e novidades no Instagram @enzzodasul.',
    coverImage: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    latitude: -30.0346,
    longitude: -51.2177
  },
  {
    id: 'show-2',
    title: 'Showcase Curitiba',
    venue: 'Club Subterrâneo',
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',
    date: '2026-11-02',
    time: '23:30',
    ticketStatus: 'available',
    ticketUrl: 'https://www.instagram.com/enzzodasul/',
    coverImage: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    latitude: -25.4284,
    longitude: -49.2733
  }
];

export const mockLocations: Location[] = [
  {
    id: 'loc-poa',
    city: 'Porto Alegre',
    state: 'RS',
    country: 'Brasil',
    latitude: -30.0346,
    longitude: -51.2177,
    showsCount: 14,
    lastPerformance: '2025-12-18',
    events: ['Turnê Oficial'],
    notes: 'Base e história de Enzzo da Sul.'
  },
  {
    id: 'loc-cba',
    city: 'Curitiba',
    state: 'PR',
    country: 'Brasil',
    latitude: -25.4284,
    longitude: -49.2733,
    showsCount: 8,
    lastPerformance: '2025-11-10',
    events: ['Showcase Sul'],
    notes: 'Público com grande engajamento.'
  },
  {
    id: 'loc-sp',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    latitude: -23.5505,
    longitude: -46.6333,
    showsCount: 12,
    lastPerformance: '2026-01-22',
    events: ['Produção & Estúdios'],
    notes: 'Sessões de gravação de novos lançamentos.'
  }
];

export const mockArtists: Artist[] = [
  {
    id: 'artist-enzzo',
    name: 'ENZZO DA SUL',
    role: 'Artist',
    avatarUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    bio: 'Perfil oficial do artista Enzzo da Sul. Disponível no Spotify, Apple Music, YouTube e Instagram @enzzodasul.',
    spotifyUrl: 'https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH',
    instagramUrl: 'https://www.instagram.com/enzzodasul/',
    youtubeUrl: 'https://www.youtube.com/@enzzodasul',
    collaborationsCount: 14,
    sharedTracks: ['song-1', 'song-2', 'song-3']
  }
];

export const mockConnections: Connection[] = [
  {
    id: 'conn-1',
    fromArtistId: 'artist-enzzo',
    toArtistId: 'artist-enzzo',
    relationship: 'Featured',
    trackTitle: 'Lançamento Oficial'
  }
];

export const mockVideos: Video[] = [
  {
    id: 'vid-1',
    title: 'ENZZO DA SUL — Canal Oficial do YouTube',
    category: 'MUSIC',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    views: 18400,
    duration: '3:45',
    featured: true
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Enzzo da Sul — Registro Oficial',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    aspectRatio: 'portrait',
    city: 'Porto Alegre',
    event: 'Fotografia Oficial',
    date: '2026-01-15',
    category: 'SHOWS'
  }
];

export const mockPosts: SocialPost[] = [
  {
    id: 'post-1',
    caption: 'Siga @enzzodasul no Instagram para ver bastidores, novidades e novos lançamentos! ⚡',
    imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278',
    postUrl: 'https://www.instagram.com/enzzodasul/',
    likes: 1840,
    comments: 120,
    date: 'Oficial',
    category: 'SHOWS'
  }
];
