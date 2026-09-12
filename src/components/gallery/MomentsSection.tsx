import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { LightboxModal } from './LightboxModal';
import { GalleryItem } from '../../types';
import { mockGallery } from '../../data/mockData';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Maximize2 } from 'lucide-react';

export const MomentsSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="moments" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="GALERIA EDITORIAL"
          title="VISUAL MOMENTS"
          subtitle="Registros fotográficos marcantes de palcos, camarins, estúdios e expedições da turnê."
        />

        {/* Editorial Masonry/Grid Mix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGallery.map((item) => (
            <Card
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer group p-0 overflow-hidden relative flex flex-col justify-end"
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.aspectRatio === 'portrait'
                    ? 'h-96'
                    : item.aspectRatio === 'landscape'
                    ? 'h-64'
                    : 'h-80'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <Badge variant="accent">{item.category}</Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="flex flex-col text-left">
                    <h4 className="text-lg font-display font-bold text-white">
                      {item.title}
                    </h4>
                    {item.city && (
                      <span className="text-xs font-mono text-text-muted mt-0.5">
                        {item.city} {item.event ? `• ${item.event}` : ''}
                      </span>
                    )}
                  </div>

                  <div className="p-2 rounded-full bg-accent/80 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-glow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <LightboxModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
