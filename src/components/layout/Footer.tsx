import React from 'react';
import { Instagram, Music2, Youtube, Radio, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#040405] border-t border-surface-border pt-16 pb-28 sm:pb-16 text-text-muted text-left">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-surface-border">
          {/* Column 1: Artist Identity */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.scdn.co/image/ab6761610000e5eb89121e3528305896b6de7278"
                alt="Enzzo da Sul"
                className="w-10 h-10 rounded-full object-cover border border-accent shadow-glow"
              />
              <span className="text-2xl font-display font-black text-white tracking-wider">
                ENZZO DA SUL
              </span>
            </div>
            <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              MUSIC • LIVE • WORLD
            </p>
            <p className="text-sm text-text-muted leading-relaxed max-w-md">
              Plataforma oficial do artista Enzzo da Sul. Conectando lançamentos, performances ao vivo, turnês e canais oficiais de streaming.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-text uppercase tracking-widest font-bold">
              Navegação
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {['home', 'music', 'live', 'world', 'connections', 'watch', 'moments', 'booking'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      onNavigate(tab);
                      document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-accent transition-colors uppercase tracking-wider text-xs font-mono"
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: All Official External Platforms */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-text uppercase tracking-widest font-bold">
              Canais Oficiais
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="https://open.spotify.com/artist/2bl0nc1YVl0cxi5m68pMEH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors text-xs font-mono"
                >
                  <Music2 className="w-4 h-4 text-emerald-400" />
                  <span>Spotify Oficial</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://music.apple.com/br/artist/enzzo-da-sul/1275587030"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors text-xs font-mono"
                >
                  <Radio className="w-4 h-4 text-rose-400" />
                  <span>Apple Music</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@enzzodasul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors text-xs font-mono"
                >
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube Oficial</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/enzzodasul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors text-xs font-mono"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram @enzzodasul</span>
                  <ArrowUpRight className="w-3 h-3 text-text-dim ml-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dim">
          <p>© {new Date().getFullYear()} ENZZO DA SUL (OFICIAL). Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span>CANAL OFICIAL</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>ENZZO DA SUL</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
