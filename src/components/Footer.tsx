
'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="font-headline text-xl tracking-widest font-bold">ATELIÊ STARBRIGHT</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Bolsas de luxo requintadas criadas para o indivíduo moderno. Elegância em cada ponto, brilho em cada detalhe.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">COLEÇÃO</h4>
            <ul className="space-y-4 text-sm uppercase tracking-wider font-medium">
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Bolsas de Mão</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Carteiras de Mão</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Acessórios</Link></li>
              <li><Link href="/catalog" className="hover:text-primary transition-colors">Novidades</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">CONTATO & ATENDIMENTO</h4>
            <div className="space-y-4 text-[10px] tracking-[0.15em] uppercase font-bold">
              <div className="space-y-1">
                <p className="text-primary">Atendimento</p>
                <a href="tel:+351966446258" className="text-muted-foreground hover:text-primary transition-colors">+351 966 446 258</a>
              </div>
              <ul className="pt-4 space-y-3 border-t border-muted">
                <li><Link href="/contato" className="hover:text-primary transition-colors">Página de Contato</Link></li>
                <li><Link href="/sobre" className="hover:text-primary transition-colors">O Manifesto</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">NEWSLETTER</h4>
            <p className="text-sm text-muted-foreground">Assine para receber atualizações, acesso a ofertas exclusivas e muito mais.</p>
            <div className="flex gap-2">
              <Input placeholder="Endereço de e-mail" className="bg-background border-muted rounded-none" />
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} ATELIÊ STARBRIGHT. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>TERMOS DE SERVIÇO</span>
            <span>COOKIES</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
