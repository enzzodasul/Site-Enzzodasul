import React from 'react';
import { Radio, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface LiveNowBannerProps {
  isLive?: boolean;
  city?: string;
  venue?: string;
  onOpenDetails?: () => void;
}

export const LiveNowBanner: React.FC<LiveNowBannerProps> = ({
  isLive = true,
  city = 'Porto Alegre',
  venue = 'Espaço Hall Urbano',
  onOpenDetails,
}) => {
  if (!isLive) return null;

  return (
    <div className="bg-emerald-950/80 border-b border-emerald-500/30 py-2.5 px-4 text-xs font-mono text-emerald-300 backdrop-blur-md">
      <div className="max-w-site mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <Badge variant="live">AO VIVO AGORA</Badge>
          <span className="truncate font-semibold text-white">
            ENZZO DA SUL <span className="text-emerald-400 font-normal">@ {venue} ({city})</span>
          </span>
        </div>

        {onOpenDetails && (
          <button
            onClick={onOpenDetails}
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-200 transition-colors shrink-0 uppercase tracking-widest font-bold"
          >
            <span>Acompanhar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
