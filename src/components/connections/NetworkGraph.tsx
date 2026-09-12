import React from 'react';
import { Artist, Connection } from '../../types';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface NetworkGraphProps {
  artists: Artist[];
  connections: Connection[];
  onSelectArtist: (artist: Artist) => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  artists,
  connections,
  onSelectArtist,
}) => {
  const enzzo = artists.find((a) => a.id === 'artist-enzzo') || artists[0];

  if (!enzzo || artists.length === 0) {
    return (
      <div className="relative w-full max-w-2xl mx-auto h-[440px] glass-panel rounded-2xl p-4 border border-surface-border flex items-center justify-center text-text-muted font-mono text-xs">
        Carregando rede de conexões...
      </div>
    );
  }

  const satellites = artists.filter((a) => a.id !== enzzo.id);
  const radius = 140; // px
  const center = { x: 200, y: 200 };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[440px] glass-panel rounded-2xl p-4 border border-surface-border flex items-center justify-center overflow-hidden">
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {satellites.map((sat, index) => {
          const angle = (index / Math.max(1, satellites.length)) * 2 * Math.PI - Math.PI / 2;
          const targetX = center.x + radius * Math.cos(angle);
          const targetY = center.y + radius * Math.sin(angle);

          return (
            <g key={sat.id}>
              <line
                x1={center.x}
                y1={center.y}
                x2={targetX}
                y2={targetY}
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              <circle
                cx={(center.x + targetX) / 2}
                cy={(center.y + targetY) / 2}
                r="3"
                fill="var(--color-accent)"
              />
            </g>
          );
        })}
      </svg>

      {/* Central Node: ENZZO DA SUL */}
      <div
        onClick={() => onSelectArtist(enzzo)}
        className="absolute z-20 flex flex-col items-center justify-center cursor-pointer group"
        style={{ left: `${center.x - 45}px`, top: `${center.y - 45}px` }}
      >
        <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-r from-accent via-white to-accent animate-pulse-glow">
          <img
            src={enzzo.avatarUrl}
            alt={enzzo.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <span className="mt-2 text-xs font-display font-black text-accent uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-accent/40 shadow-glow">
          {enzzo.name}
        </span>
      </div>

      {/* Satellite Nodes */}
      {satellites.map((sat, index) => {
        const angle = (index / Math.max(1, satellites.length)) * 2 * Math.PI - Math.PI / 2;
        const targetX = center.x + radius * Math.cos(angle) - 30;
        const targetY = center.y + radius * Math.sin(angle) - 30;

        const conn = connections.find(
          (c) => c.toArtistId === sat.id || c.fromArtistId === sat.id
        );

        return (
          <div
            key={sat.id}
            onClick={() => onSelectArtist(sat)}
            className="absolute z-20 flex flex-col items-center cursor-pointer group hover:scale-110 transition-transform"
            style={{ left: `${targetX}px`, top: `${targetY}px` }}
          >
            <div className="w-14 h-14 rounded-full p-0.5 bg-surface border border-surface-border group-hover:border-accent shadow-lg transition-colors">
              <img
                src={sat.avatarUrl}
                alt={sat.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-1 text-[10px] font-mono text-text font-bold uppercase truncate max-w-[80px] bg-surface/90 px-1.5 py-0.5 rounded border border-surface-border">
              {sat.name}
            </span>
            {conn && (
              <Badge variant="accent" className="mt-0.5 text-[8px] py-0 px-1">
                {conn.relationship}
              </Badge>
            )}
          </div>
        );
      })}
    </div>
  );
};
