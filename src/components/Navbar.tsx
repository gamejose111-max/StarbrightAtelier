
"use client"

import Link from 'next/link';
import { ShoppingBag, Search, User, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-6"
    )}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6 text-sm font-medium tracking-widest uppercase">
              <Link href="/catalog" className="hover:text-primary transition-colors">Coleção</Link>
              <Link href="/ai-stylist" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Sparkles className="h-3.5 w-3.5" />
                Estilista IA
              </Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-headline tracking-[0.2em] font-bold text-foreground">
            STARBRIGHT
          </Link>

          <div className="flex items-center space-x-2 md:space-x-5">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">2</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
