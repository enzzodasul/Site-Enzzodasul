import React from 'react';
import { Calendar, Clock, MapPin, Ticket, Info } from 'lucide-react';
import { Show } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatters';

interface NextShowCardProps {
  show: Show;
  onSelect: (show: Show) => void;
}

export const NextShowCard: React.FC<NextShowCardProps> = ({ show, onSelect }) => {
  return (
    <Card className="relative overflow-hidden border-2 border-accent/60 bg-gradient-to-br from-accent/10 via-surface to-surface p-6 sm:p-8">
      <div className="absolute top-4 right-4">
        <Badge variant="live">PRÓXIMO SHOW</Badge>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-4 max-w-2xl text-left">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
              // DESTAQUE DA TURNÊ
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-text uppercase">
              {show.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span>{formatDate(show.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>{show.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-text font-semibold">
                {show.venue} ({show.city}, {show.state})
              </span>
            </div>
          </div>

          {show.description && (
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
              {show.description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          {show.ticketUrl && show.ticketStatus === 'available' && (
            <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="glow" size="lg" className="w-full flex items-center gap-2">
                <Ticket className="w-5 h-5" />
                <span>Comprar Ingressos</span>
              </Button>
            </a>
          )}

          <Button
            variant="secondary"
            size="lg"
            onClick={() => onSelect(show)}
            className="w-full flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-accent" />
            <span>Ver Detalhes</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
