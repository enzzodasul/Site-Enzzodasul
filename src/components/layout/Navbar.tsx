import React, { useState } from 'react';
import { Menu, X, Disc3, Shield } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/cn';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogoClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onLogoClick,
}) => {
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'music', label: 'MUSIC' },
    { id: 'live', label: 'LIVE' },
    { id: 'world', label: 'WORLD' },
    { id: 'connections', label: 'CONNECTIONS' },
    { id: 'watch', label: 'WATCH' },
    { id: 'moments', label: 'MOMENTS' },
    { id: 'booking', label: 'BOOKING' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-navbar transition-all duration-300',
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            handleLinkClick('home');
            onLogoClick?.();
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-accent/15 border border-accent/40 group-hover:border-accent transition-colors">
            <Disc3 className="w-5 h-5 text-accent animate-spin-slow group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-black tracking-wider text-base sm:text-lg text-text group-hover:text-accent transition-colors">
              ENZZO DA SUL
            </span>
            <span className="text-[9px] font-mono text-text-dim tracking-widest uppercase">
              Official Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200 rounded-md relative',
                  isActive
                    ? 'text-accent font-bold'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent shadow-glow rounded-full" />
                )}
              </button>
            );
          })}

          {/* Admin shortcut */}
          <button
            onClick={() => handleLinkClick('admin')}
            className={cn(
              'ml-2 p-2 text-text-dim hover:text-accent hover:bg-surface-hover rounded-md transition-colors',
              activeTab === 'admin' && 'text-accent'
            )}
            title="Painel Admin"
          >
            <Shield className="w-4 h-4" />
          </button>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('booking')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-display font-bold uppercase tracking-widest text-white bg-accent hover:bg-accent-hover rounded-md shadow-glow transition-all"
          >
            Contratar
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text hover:text-accent focus:outline-none"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-surface-border mt-3 px-6 py-6 flex flex-col gap-3 animate-in fade-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={cn(
                'text-left py-2.5 px-3 text-sm font-display font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-between',
                activeTab === link.id
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-text-muted hover:text-text hover:bg-surface-hover'
              )}
            >
              <span>{link.label}</span>
              {activeTab === link.id && (
                <span className="w-2 h-2 rounded-full bg-accent shadow-glow" />
              )}
            </button>
          ))}

          <button
            onClick={() => handleLinkClick('admin')}
            className="text-left py-2.5 px-3 text-xs font-mono uppercase tracking-wider text-text-dim hover:text-accent flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>Painel Administrativo</span>
          </button>

          <div className="pt-4 border-t border-surface-border flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('booking')}
              className="w-full py-3 text-center text-sm font-display font-bold uppercase tracking-widest text-white bg-accent rounded-lg shadow-glow"
            >
              Solicitar Show
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
