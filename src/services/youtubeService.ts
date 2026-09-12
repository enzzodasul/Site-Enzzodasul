import { mockVideos } from '../data/mockData';
import { Video } from '../types';
import { extractYoutubeId, getYoutubeThumbnail } from '../utils/youtube';

const STORAGE_KEY = 'enzzo_da_sul_custom_videos';

function getStoredVideos(): Video[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredVideos(videos: Video[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  } catch (err) {
    console.error('Failed to save video to localStorage:', err);
  }
}

export const youtubeService = {
  async getVideos(category?: Video['category']): Promise<Video[]> {
    const custom = getStoredVideos();
    const all = [...custom, ...mockVideos];
    if (category) {
      return all.filter((v) => v.category === category);
    }
    return all;
  },

  async addVideoFromUrl(
    url: string,
    title: string,
    category: Video['category'] = 'MUSIC'
  ): Promise<Video> {
    const youtubeId = extractYoutubeId(url);
    if (!youtubeId) {
      throw new Error('Link do YouTube inválido. Cole um link válido como: https://www.youtube.com/watch?v=...');
    }

    const newVid: Video = {
      id: `vid-custom-${Date.now()}`,
      title: title.trim() || `Enzzo da Sul — Novo Vídeo (${youtubeId})`,
      category,
      youtubeId,
      thumbnailUrl: getYoutubeThumbnail(youtubeId),
      views: 1000,
      duration: 'Oficial',
      featured: false,
    };

    const current = getStoredVideos();
    const updated = [newVid, ...current];
    saveStoredVideos(updated);

    return newVid;
  },
};
