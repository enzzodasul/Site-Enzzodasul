import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { NextShowCard } from './NextShowCard';
import { EventDetailModal } from './EventDetailModal';
import { Show } from '../../types';
import { showsService } from '../../services/showsService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MapPin, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const LiveSection: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    showsService.getUpcomingShows().then((data) => {
      setShows(data);
      setLoading(false);
    });
  }, []);

  const nextShow = shows.find((s) => s.isNext) || shows[0];
  const upcomingShows = shows.filter((s) => s.id !== nextShow?.id);

  return (
    <section id="live" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="AGENDA & PERFORMANCES"
          title="LIVE EXPERIENCES"
          subtitle="Acompanhe as próximas apresentações e garanta sua presença nos shows de Enzzo da Sul."
        />

        {loading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="h-64 bg-surface rounded-2xl border border-surface-border" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="h-28 bg-surface rounded-xl border border-surface-border" />
              <div className="h-28 bg-surface rounded-xl border border-surface-border" />
            </div>
          </div>
        ) : (
          <>
            {/* Next Show Highlight */}
            {nextShow && (
              <div className="mb-12">
                <NextShowCard show={nextShow} onSelect={setSelectedShow} />
              </div>
            )}

            {/* Upcoming Shows Grid */}
            {upcomingShows.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-display font-bold uppercase tracking-wider text-text mb-2">
                  Próximas Datas
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingShows.map((show) => (
                    <Card
                      key={show.id}
                      onClick={() => setSelectedShow(show)}
                      className="cursor-pointer flex flex-col justify-between p-5 gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-mono text-accent uppercase font-bold">
                            {formatDate(show.date)} • {show.time}
                          </span>
                          <h4 className="text-lg font-display font-bold text-text mt-1">
                            {show.title}
                          </h4>
                        </div>
                        {show.ticketStatus === 'available' ? (
                          <Badge variant="accent">INGRESSOS</Badge>
                        ) : show.ticketStatus === 'sold_out' ? (
                          <Badge variant="neutral">ESGOTADO</Badge>
                        ) : (
                          <Badge variant="outline">EM BREVE</Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-text-muted pt-3 border-t border-surface-border">
                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="truncate">{show.venue} ({show.city})</span>
                        </div>
                        <span className="flex items-center gap-1 text-accent font-semibold shrink-0">
                          Detalhes <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <EventDetailModal
        show={selectedShow}
        isOpen={!!selectedShow}
        onClose={() => setSelectedShow(null)}
      />
    </section>
  );
};
