import React from 'react';
import { MapPin, Calendar, Music, Sparkles } from 'lucide-react';
import { Location } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatters';

interface CityDetailModalProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({
  location,
  isOpen,
  onClose,
}) => {
  if (!location) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${location.city}, ${location.country}`}>
      <div className="flex flex-col gap-6 text-left">
        {/* City Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4 rounded-xl border border-surface-border flex flex-col">
            <span className="text-xs font-mono text-text-muted uppercase">Apresentações</span>
            <span className="text-2xl font-display font-black text-accent mt-1">
              {location.showsCount} {location.showsCount === 1 ? 'Show' : 'Shows'}
            </span>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-surface-border flex flex-col">
            <span className="text-xs font-mono text-text-muted uppercase">Último Show</span>
            <span className="text-sm font-display font-bold text-text mt-1">
              {formatDate(location.lastPerformance)}
            </span>
          </div>
        </div>

        {/* Story / Notes */}
        {location.notes && (
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono text-text uppercase tracking-widest font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>História da Cidade</span>
            </h4>
            <p className="text-sm text-text-muted leading-relaxed">
              {location.notes}
            </p>
          </div>
        )}

        {/* Events / Performances List */}
        {location.events && location.events.length > 0 && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-text uppercase tracking-widest font-bold">
              Eventos & Palcos
            </h4>
            <div className="flex flex-wrap gap-2">
              {location.events.map((evt, i) => (
                <Badge key={i} variant="neutral" className="py-1 px-3">
                  {evt}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
