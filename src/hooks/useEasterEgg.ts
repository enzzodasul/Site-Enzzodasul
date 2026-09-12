import { useState, useEffect } from 'react';

export function useEasterEgg() {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Secret code sequence "ENZZO"
  const secretCode = ['e', 'n', 'z', 'z', 'o'];
  const [inputBuffer, setInputBuffer] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setInputBuffer((prev) => {
        const next = [...prev, key].slice(-secretCode.length);
        if (next.join('') === secretCode.join('')) {
          setUnlocked(true);
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setUnlocked(true);
      }
      return newCount;
    });
  };

  const closeEasterEgg = () => {
    setUnlocked(false);
    setClickCount(0);
  };

  return { unlocked, handleLogoClick, closeEasterEgg };
}
