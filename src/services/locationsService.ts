import { mockLocations } from '../data/mockData';
import { Location } from '../types';

export const locationsService = {
  async getPlayedLocations(): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockLocations;
  },
};
