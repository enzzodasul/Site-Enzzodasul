import React from 'react';
import { Calendar, Clock, MapPin, Ticket, ExternalLink, Share2 } from 'lucide-react';
import { Show } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatters';

interface EventDetailModalProps {
  show: Show | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  show,
  isOpen,
  onClose,
}) => {
  if (!show) return null;

  const statusBadges = {
    available: <Badge variant="accent">INGRESSOS DISPONÍVEIS</Badge>,
    sold_out: <Badge variant="neutral">ESGOTADO</Badge>,
    coming_soon: <Badge variant="outline">EM BREVE</Badge>,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={show.title}>
      <div className="flex flex-col gap-6">
        {/* Cover Banner Image */}
        {show.coverImage && (
          <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-surface-border">
            <img
              src={show.coverImage}
              alt={show.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              {statusBadges[show.ticketStatus]}
            </div>
          </div>
        )}

        {/* Location & Time Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 glass-panel p-4 rounded-xl border border-surface-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent/15 text-accent border border-accent/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-text-muted uppercase">Data</span>
              <span className="text-sm font-display font-bold text-text">{formatDate(show.date)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent/15 text-accent border border-accent/30">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-text-muted uppercase">Horário</span>
              <span className="text-sm font-display font-bold text-text">{show.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <div className="p-2.5 rounded-lg bg-accent/15 text-accent border border-accent/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-text-muted uppercase">Local & Cidade</span>
              <span className="text-sm font-display font-bold text-text">
                {show.venue} — {show.city}, {show.state} ({show.country})
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        {show.description && (
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-mono text-text uppercase tracking-widest font-bold">
              Sobre o Show
            </h4>
            <p className="text-sm text-text-muted leading-relaxed">
              {show.description}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: show.title,
                  text: `Confira o show de Enzzo da Sul em ${show.city}!`,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link do show copiado!');
              }
            }}
            className="flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text"
          >
            <Share2 className="w-4 h-4 text-accent" />
            <span>Compartilhar Evento</span>
          </button>

          {show.ticketUrl && show.ticketStatus === 'available' && (
            <a
              href={show.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="glow" size="md" className="w-full flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Garantir Ingressos</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
