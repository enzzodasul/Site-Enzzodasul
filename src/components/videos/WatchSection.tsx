import React, { useEffect, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { VideoModal } from './VideoModal';
import { Video } from '../../types';
import { youtubeService } from '../../services/youtubeService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Play, Plus, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const WatchSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<Video['category'] | 'ALL'>('ALL');

  // Add Video Form State
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [videoTitleInput, setVideoTitleInput] = useState<string>('');
  const [videoCategoryInput, setVideoCategoryInput] = useState<Video['category']>('MUSIC');
  const [addError, setAddError] = useState<string>('');
  const [addSuccess, setAddSuccess] = useState<boolean>(false);

  const loadVideos = () => {
    youtubeService.getVideos().then(setVideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    setAddSuccess(false);

    try {
      await youtubeService.addVideoFromUrl(
        videoUrlInput,
        videoTitleInput,
        videoCategoryInput
      );
      setAddSuccess(true);
      setVideoUrlInput('');
      setVideoTitleInput('');
      loadVideos();
      setTimeout(() => {
        setAddSuccess(false);
        setShowAddForm(false);
      }, 2000);
    } catch (err: any) {
      setAddError(err.message || 'Erro ao adicionar o vídeo.');
    }
  };

  const categories: Array<Video['category'] | 'ALL'> = ['ALL', 'LIVE', 'MUSIC', 'BACKSTAGE', 'MOMENTS'];

  const filteredVideos =
    activeCategory === 'ALL'
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section id="watch" className="py-20 sm:py-28 relative text-left">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <SectionHeading
            tag="VÍDEOS & CANAL OFICIAL"
            title="WATCH ENZZO DA SUL"
            subtitle="Videoclipes oficiais, lançamentos, feats em canais parceiros e registros de shows."
            className="mb-0"
          />

          <Button
            variant="outline"
            size="md"
            onClick={() => setShowAddForm(!showAddForm)}
            className="shrink-0 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Fechar Formulário' : '+ Adicionar Vídeo por Link'}</span>
          </Button>
        </div>

        {/* Dynamic Add Video Form */}
        {showAddForm && (
          <Card className="mb-10 p-6 border-2 border-accent/60 bg-surface/95 animate-in fade-in duration-300">
            <h3 className="text-lg font-display font-bold uppercase text-text mb-2 flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <span>Adicionar Novo Vídeo por Link do YouTube</span>
            </h3>
            <p className="text-xs font-mono text-text-muted mb-4">
              Cole o link de qualquer vídeo do YouTube (canal próprio ou de terceiros com sua participação). O card é gerado automaticamente!
            </p>

            {addSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 text-sm font-mono flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Vídeo adicionado com sucesso! Card criado na grade.</span>
              </div>
            ) : (
              <form onSubmit={handleAddVideo} className="flex flex-col gap-4">
                {addError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-400 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{addError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-mono text-text-muted uppercase">Link do YouTube *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      className="px-4 py-2 bg-surface text-text rounded-lg border border-surface-border text-sm font-sans focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-text-muted uppercase">Categoria</label>
                    <select
                      value={videoCategoryInput}
                      onChange={(e) => setVideoCategoryInput(e.target.value as any)}
                      className="px-4 py-2 bg-surface text-text rounded-lg border border-surface-border text-sm font-sans focus:border-accent focus:outline-none"
                    >
                      <option value="MUSIC">MUSIC (Clipe / Single)</option>
                      <option value="LIVE">LIVE (Show / Performance)</option>
                      <option value="BACKSTAGE">BACKSTAGE (Doc / Bastidores)</option>
                      <option value="MOMENTS">MOMENTS (Momentos)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-text-muted uppercase">Título do Vídeo (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ex: Enzzo da Sul — Participação Especial no Canal X"
                    value={videoTitleInput}
                    onChange={(e) => setVideoTitleInput(e.target.value)}
                    className="px-4 py-2 bg-surface text-text rounded-lg border border-surface-border text-sm font-sans focus:border-accent focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="glow" size="md" className="w-full sm:w-auto self-start mt-2">
                  + Adicionar Card de Vídeo
                </Button>
              </form>
            )}
          </Card>
        )}

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white border-accent shadow-glow font-bold'
                  : 'bg-surface text-text-muted border-surface-border hover:text-text hover:bg-surface-hover'
              }`}
            >
              {cat === 'ALL' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="cursor-pointer group flex flex-col p-0 overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant="accent">{video.category}</Badge>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-white rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2 text-left">
                <h4 className="text-base font-display font-bold text-text line-clamp-2 group-hover:text-accent transition-colors">
                  {video.title}
                </h4>
                <span className="text-xs font-mono text-text-dim">
                  {formatNumber(video.views)} VISUALIZAÇÕES
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
};
