import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockSongs, mockShows, mockLocations, mockArtists, mockCareerStats } from '../data/mockData';
import { Music, Calendar, MapPin, Users, Video, Image, BarChart3, Settings, ShieldCheck } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'songs' | 'shows' | 'map' | 'artists' | 'stats'
  >('songs');

  const [songsList, setSongsList] = useState(mockSongs);
  const [showsList, setShowsList] = useState(mockShows);

  const tabs = [
    { id: 'songs', label: 'MÚSICAS', icon: Music },
    { id: 'shows', label: 'SHOWS', icon: Calendar },
    { id: 'map', label: 'MAPA & CIDADES', icon: MapPin },
    { id: 'artists', label: 'ARTISTAS & REDE', icon: Users },
    { id: 'stats', label: 'ESTATÍSTICAS', icon: BarChart3 },
  ] as const;

  return (
    <div className="pt-28 pb-20 max-w-site mx-auto px-4 sm:px-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="accent" className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              ADMIN DASHBOARD
            </Badge>
          </div>
          <h1 className="text-3xl font-display font-bold uppercase text-text">
            Gestão da Plataforma ENZZO DA SUL
          </h1>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all ${
                isActive
                  ? 'bg-accent text-white border-accent shadow-glow font-bold'
                  : 'bg-surface text-text-muted border-surface-border hover:text-text'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'songs' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-text">Gerenciar Músicas</h2>
            <Button variant="glow" size="sm">+ Adicionar Música</Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {songsList.map((song) => (
              <Card key={song.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img src={song.coverUrl} alt={song.title} className="w-12 h-12 rounded object-cover" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-text">{song.title}</span>
                    <span className="text-xs font-mono text-text-muted">{song.plays.toLocaleString()} plays</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">Editar</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'shows' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-text">Gerenciar Agenda de Shows</h2>
            <Button variant="glow" size="sm">+ Adicionar Show</Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {showsList.map((show) => (
              <Card key={show.id} className="flex items-center justify-between p-4">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-text">{show.title}</span>
                  <span className="text-xs font-mono text-accent">{show.date} • {show.venue} ({show.city})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={show.ticketStatus === 'available' ? 'accent' : 'neutral'}>
                    {show.ticketStatus}
                  </Badge>
                  <Button variant="secondary" size="sm">Editar</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-text">Locais do Mapa ({mockLocations.length})</h2>
            <Button variant="glow" size="sm">+ Nova Cidade</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockLocations.map((loc) => (
              <Card key={loc.id} className="p-4 flex flex-col justify-between">
                <div>
                  <span className="font-display font-bold text-text">{loc.city}, {loc.country}</span>
                  <span className="text-xs font-mono text-accent block">{loc.showsCount} apresentações</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'artists' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-text">Artistas & Conexões ({mockArtists.length})</h2>
            <Button variant="glow" size="sm">+ Nova Conexão</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockArtists.map((artist) => (
              <Card key={artist.id} className="p-4 flex items-center gap-3">
                <img src={artist.avatarUrl} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-text">{artist.name}</span>
                  <span className="text-xs font-mono text-text-muted">{artist.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-display font-bold text-text">Métricas Gerais da Carreira</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 flex flex-col">
              <span className="text-xs font-mono text-text-muted">Total Streams</span>
              <span className="text-2xl font-display font-black text-accent mt-1">{mockCareerStats.streams.toLocaleString()}</span>
            </Card>
            <Card className="p-4 flex flex-col">
              <span className="text-xs font-mono text-text-muted">Total Shows</span>
              <span className="text-2xl font-display font-black text-accent mt-1">{mockCareerStats.shows}</span>
            </Card>
            <Card className="p-4 flex flex-col">
              <span className="text-xs font-mono text-text-muted">Cidades</span>
              <span className="text-2xl font-display font-black text-accent mt-1">{mockCareerStats.cities}</span>
            </Card>
            <Card className="p-4 flex flex-col">
              <span className="text-xs font-mono text-text-muted">Países</span>
              <span className="text-2xl font-display font-black text-accent mt-1">{mockCareerStats.countries}</span>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
