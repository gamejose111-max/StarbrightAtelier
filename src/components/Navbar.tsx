"use client"

import Link from 'next/link';
import { ShoppingBag, User, Sparkles, Menu, Package, ClipboardList, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      // Usar requestAnimationFrame para garantir que o scroll não bloqueie a UI
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = useCallback(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
  };

  const navLinks = [
    { name: "Coleção", href: "/catalog" },
    { name: "Manifesto", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-4 md:py-5"
    )}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 items-center">
          
          {/* LADO ESQUERDO: Menu e Links */}
          <div className="flex items-center justify-start gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" title="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background border-r-primary/20 p-0 rounded-none transition-transform duration-300">
                <SheetHeader className="p-8 border-b border-muted text-left">
                  <SheetTitle className="font-headline tracking-widest font-bold uppercase">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-8 px-8 space-y-8">
                  <nav className="flex flex-col space-y-5 text-sm font-bold tracking-[0.1em] uppercase">
                    <SheetClose asChild>
                      <Link href="/" className="hover:text-primary transition-colors">Início</Link>
                    </SheetClose>
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link href="/ai-stylist" className="flex items-center gap-2 text-primary italic">
                        <Sparkles className="h-4 w-4" /> Estilista IA
                      </Link>
                    </SheetClose>
                  </nav>
                  
                  <div className="pt-8 border-t border-muted">
                     <Button 
                        variant="ghost" 
                        className="w-full justify-start px-0 font-bold tracking-[0.1em] uppercase text-xs gap-3"
                        onClick={toggleDarkMode}
                      >
                        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                      </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <nav className="hidden lg:flex items-center space-x-6 text-[9px] font-bold tracking-[0.2em] uppercase">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CENTRO: Nome da Marca */}
          <div className="flex justify-center items-center">
            <Link href="/" className="group flex flex-col items-center">
              <h1 className={cn(
                "font-headline font-bold tracking-[0.4em] uppercase group-hover:text-primary transition-all duration-300 whitespace-nowrap",
                isScrolled ? "text-[11px]" : "text-sm md:text-base"
              )}>
                Starbright
              </h1>
            </Link>
          </div>

          {/* DIREITA: Ações de Luxo */}
          <div className="flex items-center justify-end gap-1 md:gap-3">
            <Link href="/ai-stylist" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors text-primary italic text-[9px] font-bold uppercase tracking-widest mr-2">
              <Sparkles className="h-3 w-3" /> Estilista IA
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9" title={user ? "Minha Conta" : "Login"}>
                  <User className={cn("h-5 w-5 transition-colors", user && "text-primary")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none w-56 border-primary/20 bg-background p-2 mt-4 animate-in fade-in zoom-in-95 duration-200">
                {user ? (
                  <>
                    <div className="px-2 py-3 border-b mb-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground italic">Bem-vinda</p>
                      <p className="text-[9px] text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3" asChild>
                      <Link href="/admin/orders">
                        <ClipboardList className="mr-2 h-4 w-4" /> Pedidos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3" asChild>
                      <Link href="/admin/products">
                        <Package className="mr-2 h-4 w-4" /> Catálogo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3 text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Encerrar Sessão
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className="cursor-pointer font-bold tracking-widest text-[10px] uppercase py-3" asChild>
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" /> Acesso Restrito
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/catalog">
              <Button variant="ghost" size="icon" className="w-9 h-9" title="Carrinho">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
