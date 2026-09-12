import { mockArtists, mockConnections } from '../data/mockData';
import { Artist, Connection } from '../types';

export const artistsService = {
  async getArtists(): Promise<Artist[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockArtists;
  },

  async getConnections(): Promise<{ artists: Artist[]; connections: Connection[] }> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      artists: mockArtists,
      connections: mockConnections,
    };
  },
};
