
"use client"

import Link from 'next/link';
import { ShoppingBag, Search, User, Sparkles, Menu, Package, ClipboardList, Moon, Sun, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-6"
    )}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6 text-sm font-medium tracking-widest uppercase">
              <Link href="/catalog" className="hover:text-primary transition-colors">Coleção</Link>
              <Link href="/sobre" className="hover:text-primary transition-colors">O Manifesto</Link>
              <Link href="/contato" className="hover:text-primary transition-colors flex items-center gap-1.5">
                <Phone className="h-3 w-3" /> Contato
              </Link>
              <Link href="/ai-stylist" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Sparkles className="h-3.5 w-3.5" />
                Estilista IA
              </Link>
            </nav>
          </div>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-headline tracking-[0.2em] font-bold text-foreground">
            STARBRIGHT
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full w-9 h-9"
              title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none w-48 border-primary/20 bg-background">
                <DropdownMenuItem className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3" asChild>
                  <Link href="/admin/orders">
                    <ClipboardList className="mr-2 h-4 w-4" /> Gestão de Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3" asChild>
                  <Link href="/admin/products">
                    <Package className="mr-2 h-4 w-4" /> Gestão de Produtos
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/catalog">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
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
