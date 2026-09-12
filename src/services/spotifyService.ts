import { mockSongs } from '../data/mockData';
import { Song } from '../types';

/**
 * Service for Spotify API integration.
 * Currently serves structured mock data; prepared for OAuth & Web API requests.
 */
export const spotifyService = {
  async getTopSongs(): Promise<Song[]> {
    // Simulated async fetch
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...mockSongs].sort((a, b) => b.plays - a.plays);
  },

  async getSongById(id: string): Promise<Song | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockSongs.find((song) => song.id === id);
  },
};
