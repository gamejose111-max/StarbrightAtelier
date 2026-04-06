
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function SplashLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500); // Duração total da animação

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-splash-exit">
      <div className="relative w-48 h-48 md:w-64 md:h-64 animate-logo-reveal">
        <Image
          src="https://fv5-5.files.fm/thumb_show.php?i=b6as6tpqsw"
          alt="Ateliê Starbright Logo"
          fill
          className="object-contain mix-blend-multiply"
          priority
        />
      </div>
      <div className="mt-8 overflow-hidden">
        <p className="font-headline tracking-[0.4em] text-xs md:text-sm uppercase font-bold animate-logo-reveal [animation-delay:0.3s] opacity-0">
          Ateliê Starbright
        </p>
      </div>
    </div>
  );
}
