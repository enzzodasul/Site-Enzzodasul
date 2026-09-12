import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/layout/Navbar';
import { LiveNowBanner } from './components/layout/LiveNowBanner';
import { Footer } from './components/layout/Footer';
import { GlobalAudioPlayer } from './components/player/GlobalAudioPlayer';
import { HomePage } from './pages/Home';
import { MusicPage } from './pages/Music';
import { LivePage } from './pages/Live';
import { WorldPage } from './pages/World';
import { ConnectionsPage } from './pages/Connections';
import { WatchPage } from './pages/Watch';
import { MomentsPage } from './pages/Moments';
import { BookingPage } from './pages/Booking';
import { AdminPage } from './pages/Admin';
import { useEasterEgg } from './hooks/useEasterEgg';
import { Modal } from './components/ui/Modal';
import { Badge } from './components/ui/Badge';
import { Sparkles } from 'lucide-react';

export function App() {
  const getInitialTab = () => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    if (['home', 'music', 'live', 'world', 'connections', 'watch', 'moments', 'booking', 'admin'].includes(path)) {
      return path;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);
  const { unlocked, handleLogoClick, closeEasterEgg } = useEasterEgg();

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.history.pushState({}, '', `/${tab === 'home' ? '' : tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'music':
        return <MusicPage />;
      case 'live':
        return <LivePage />;
      case 'world':
        return <WorldPage />;
      case 'connections':
        return <ConnectionsPage />;
      case 'watch':
        return <WatchPage />;
      case 'moments':
        return <MomentsPage />;
      case 'booking':
        return <BookingPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-background text-text flex flex-col selection:bg-accent selection:text-white">
        <LiveNowBanner
          isLive={true}
          city="Porto Alegre"
          venue="Espaço Hall Urbano"
          onOpenDetails={() => {
            handleNavigate('live');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <Navbar
          activeTab={activeTab}
          onNavigate={(tab) => {
            handleNavigate(tab);
            if (tab !== 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onLogoClick={handleLogoClick}
        />

        <main className="flex-1">
          {renderContent()}
        </main>

        <Footer
          onNavigate={(tab) => {
            handleNavigate(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        <GlobalAudioPlayer />

        {/* Easter Egg Modal */}
        <Modal
          isOpen={unlocked}
          onClose={closeEasterEgg}
          title="Modo Secreto — Enzzo Universe"
        >
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent text-accent flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8" />
            </div>
            <Badge variant="accent">UNLOCKED SECRET MEMBER BADGE</Badge>
            <h3 className="text-xl font-display font-bold text-white">
              Você descobriu o segredo do universo Enzzo da Sul!
            </h3>
            <p className="text-sm text-text-muted max-w-sm">
              Você acessou uma camada exclusiva de frequências sonoras da turnê. Obrigado por apoiar a verdadeira arte urbana sulista.
            </p>
          </div>
        </Modal>
      </div>
    </AudioProvider>
  );
}

export default App;
