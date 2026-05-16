
'use client';

import { useState, useEffect } from 'react';

export function SplashLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Tempo de exibição da animação inicial
    const timer = setTimeout(() => {
      setShow(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-splash-exit">
      <div className="relative flex flex-col items-center">
        {/* Animação Principal da Marca */}
        <div className="overflow-hidden mb-4">
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-bold tracking-[0.3em] uppercase animate-logo-reveal [animation-delay:0.2s] opacity-0 text-foreground selection:bg-transparent" style={{ animationFillMode: 'forwards' }}>
            Starbright
          </h1>
        </div>
        
        {/* Linha Divisora Animada */}
        <div className="h-[1px] bg-primary/40 animate-logo-reveal [animation-delay:0.4s] opacity-0 w-0 transition-all duration-700 ease-out" style={{ animationFillMode: 'forwards', width: '60%' }}></div>
        
        {/* Subtítulo Complementar */}
        <div className="mt-6 overflow-hidden">
          <p className="font-headline tracking-[0.5em] text-[10px] md:text-xs uppercase font-bold text-primary animate-logo-reveal [animation-delay:0.6s] opacity-0 italic" style={{ animationFillMode: 'forwards' }}>
            Ateliê de Luxo
          </p>
        </div>
      </div>
      
      {/* Detalhe de Brilho de Fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,186,48,0.08)_0%,transparent_70%)] pointer-events-none"></div>
    </div>
  );
}
