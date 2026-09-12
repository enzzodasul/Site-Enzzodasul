import React from 'react';
import { Artist } from '../../types';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { Music2, Instagram, Youtube, ExternalLink } from 'lucide-react';

interface EntityDetailModalProps {
  artist: Artist | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EntityDetailModal: React.FC<EntityDetailModalProps> = ({
  artist,
  isOpen,
  onClose,
}) => {
  if (!artist) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={artist.name}>
      <div className="flex flex-col gap-6 text-left">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={artist.avatarUrl}
            alt={artist.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-accent shadow-glow"
          />
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-text">{artist.name}</span>
            <div className="mt-1">
              <Badge variant="accent">{artist.role}</Badge>
            </div>
            <span className="text-xs font-mono text-text-muted mt-2">
              {artist.collaborationsCount} {artist.collaborationsCount === 1 ? 'Colaboração' : 'Colaborações'} com Enzzo da Sul
            </span>
          </div>
        </div>

        {/* Bio */}
        {artist.bio && (
          <p className="text-sm text-text-muted leading-relaxed">
            {artist.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-surface-border">
          {artist.spotifyUrl && (
            <a
              href={artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-surface hover:bg-surface-hover rounded-lg border border-surface-border text-emerald-400 flex items-center gap-2 text-xs font-mono"
            >
              <Music2 className="w-4 h-4" />
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {artist.instagramUrl && (
            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-surface hover:bg-surface-hover rounded-lg border border-surface-border text-pink-400 flex items-center gap-2 text-xs font-mono"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
