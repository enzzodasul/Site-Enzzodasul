import { mockShows } from '../data/mockData';
import { Show } from '../types';

export const showsService = {
  async getUpcomingShows(): Promise<Show[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockShows;
  },

  async getNextShow(): Promise<Show | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return mockShows.find((s) => s.isNext) || mockShows[0];
  },
};
