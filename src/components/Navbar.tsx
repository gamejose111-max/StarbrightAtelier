
"use client"

import Link from 'next/link';
import { ShoppingBag, User, Sparkles, Menu, Package, ClipboardList, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
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
      setIsScrolled(window.scrollY > 20);
    };

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

  const handleLogout = async () => {
    if (auth) await signOut(auth);
  };

  const navLinks = [
    { name: "Bolsa de Mão", href: "/catalog" },
    { name: "Carteira de Mão", href: "/catalog" },
    { name: "Acessórios", href: "/catalog" },
    { name: "Novidades", href: "/catalog" },
  ];

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 border-b",
      isScrolled ? "bg-background/95 backdrop-blur-md py-2 shadow-sm" : "bg-background py-4 md:py-6"
    )}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-10">
          
          {/* COLUNA ESQUERDA: Menu Mobile e Links Desktop */}
          <div className="flex items-center justify-start">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" title="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background border-r-primary/20 p-0 rounded-none">
                <SheetHeader className="p-8 border-b border-muted text-left">
                  <SheetTitle className="font-headline tracking-widest font-bold uppercase">Categorias</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-8 px-8 space-y-8">
                  <nav className="flex flex-col space-y-5 text-sm font-bold tracking-[0.1em] uppercase">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.name}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  
                  <div className="space-y-4 pt-8 border-t border-muted">
                    <p className="text-[10px] tracking-[0.3em] font-bold text-primary uppercase">Institucional</p>
                    <nav className="flex flex-col space-y-5 text-sm font-bold tracking-[0.1em] uppercase">
                      <SheetClose asChild>
                        <Link href="/sobre" className="hover:text-primary transition-colors">O Manifesto</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/contato" className="hover:text-primary transition-colors">Contato</Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/ai-stylist" className="flex items-center gap-2 hover:text-primary transition-colors text-primary italic">
                          <Sparkles className="h-4 w-4" /> Estilista IA
                        </Link>
                      </SheetClose>
                    </nav>
                  </div>

                  {/* Mudar tema no mobile dentro do menu */}
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

            <nav className="hidden lg:flex items-center space-x-6 text-[10px] font-bold tracking-[0.2em] uppercase">
              <Link href="/catalog" className="hover:text-primary transition-colors">Coleção</Link>
              <Link href="/sobre" className="hover:text-primary transition-colors">Manifesto</Link>
              <Link href="/contato" className="hover:text-primary transition-colors">Contato</Link>
            </nav>
          </div>

          {/* COLUNA CENTRAL: Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="text-base sm:text-lg md:text-2xl font-headline tracking-[0.3em] md:tracking-[0.4em] font-bold text-foreground transition-all">
              STARBRIGHT
            </Link>
          </div>

          {/* COLUNA DIREITA: Ações */}
          <div className="flex items-center justify-end gap-1 md:gap-2">
            <Link href="/ai-stylist" className="hidden xl:flex items-center gap-1.5 hover:text-primary transition-colors text-primary italic text-[9px] font-bold uppercase tracking-widest mr-2">
              <Sparkles className="h-3 w-3" /> Estilista IA
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="hidden sm:flex rounded-full w-9 h-9"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 h-9" title={user ? "Minha Conta" : "Login"}>
                  <User className={cn("h-5 w-5", user && "text-primary")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-none w-56 border-primary/20 bg-background p-2 mt-4">
                {user ? (
                  <>
                    <div className="px-2 py-3 border-b mb-2">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground italic">Bem-vinda, Curadora</p>
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
