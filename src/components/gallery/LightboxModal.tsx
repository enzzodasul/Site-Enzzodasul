import React from 'react';
import { GalleryItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { MapPin, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface LightboxModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.title} className="max-w-4xl">
      <div className="flex flex-col gap-4 text-left">
        <div className="relative rounded-xl overflow-hidden max-h-[70vh] bg-black border border-surface-border flex items-center justify-center">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <Badge variant="accent">{item.category}</Badge>
            {item.event && (
              <span className="text-sm font-display font-bold text-text">
                {item.event}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
            {item.city && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{item.city}</span>
              </div>
            )}
            {item.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{formatDate(item.date)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
