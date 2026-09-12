import React from 'react';
import { Video } from '../../types';
import { Modal } from '../ui/Modal';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  if (!video) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={video.title} className="max-w-4xl">
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-surface-border">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Modal>
  );
};
