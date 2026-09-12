import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { SocialPost } from '../../types';
import { instagramService } from '../../services/instagramService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const SocialFeedSection: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);

  useEffect(() => {
    instagramService.getFeedPosts().then(setPosts);
  }, []);

  return (
    <section id="social" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="INSTAGRAM FEED"
          title="FROM THE FEED"
          subtitle="Acompanhe a rotina, o processo criativo e os bastidores diretamente do Instagram oficial."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="p-0 overflow-hidden flex flex-col group text-left">
              <div className="relative aspect-square w-full overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="accent">{post.category}</Badge>
                </div>
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:text-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="p-5 flex flex-col gap-3 justify-between flex-1">
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                  {post.caption}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-text-dim pt-3 border-t border-surface-border">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-accent" />
                      {formatNumber(post.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {formatNumber(post.comments)}
                    </span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
