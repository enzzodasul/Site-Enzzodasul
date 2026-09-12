import { mockPosts } from '../data/mockData';
import { SocialPost } from '../types';

export const instagramService = {
  async getFeedPosts(category?: SocialPost['category']): Promise<SocialPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (category) {
      return mockPosts.filter((post) => post.category === category);
    }
    return mockPosts;
  },
};
