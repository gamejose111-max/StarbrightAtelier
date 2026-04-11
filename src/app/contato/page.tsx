
'use client';

import { Phone, Mail, MapPin, Instagram, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContatoPage() {
  const instagramUrl = "https://www.instagram.com/ateliestarbright?igsh=MWU4c2ZhNW44bDhidQ==";
  const whatsappUrl = "https://wa.me/351966446258";

  return (
    <div className="min-h-screen pt-32 pb-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase">Atendimento Exclusivo</span>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Entre em Contato</h1>
          <div className="h-1 w-24 bg-primary mx-auto"></div>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto italic">
            "Para encomendas personalizadas ou dúvidas sobre nossa coleção estelar, nossa equipe está pronta para atendê-la com a exclusividade que você merece."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <Card className="rounded-none border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-headline text-lg font-bold tracking-widest uppercase">Atendimento Telefônico</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs tracking-widest text-primary font-bold uppercase mb-1">Contacto Geral</p>
                        <a href="tel:+351966446258" className="text-xl font-bold hover:text-primary transition-colors tracking-tighter">
                          +351 966 446 258
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline text-lg font-bold tracking-widest uppercase">E-mail</h3>
                    <p className="text-muted-foreground text-sm mb-4">Para propostas comerciais e parcerias.</p>
                    <a href="mailto:contato@starbright.pt" className="text-lg font-bold hover:text-primary transition-colors">
                      contato@starbright.pt
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Location / Socials */}
          <div className="space-y-8">
             <Card className="rounded-none border-primary/20 bg-card overflow-hidden">
                <CardContent className="p-8 space-y-6">
                   <div className="space-y-2">
                      <h3 className="font-headline text-lg font-bold tracking-widest uppercase">Presença Digital</h3>
                      <p className="text-sm text-muted-foreground">Siga o brilho do Ateliê StarBright nas redes sociais.</p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="rounded-none border-muted h-12 uppercase text-[10px] tracking-widest font-bold gap-2 w-full">
                          <Instagram className="h-4 w-4" /> Instagram
                        </Button>
                      </a>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="rounded-none border-muted h-12 uppercase text-[10px] tracking-widest font-bold gap-2 w-full">
                          <MessageSquare className="h-4 w-4" /> WhatsApp
                        </Button>
                      </a>
                   </div>

                   <div className="pt-8 border-t space-y-4">
                      <div className="flex gap-4">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <div className="text-sm">
                           <p className="font-bold uppercase tracking-widest">Base de Operações</p>
                           <p className="text-muted-foreground italic">Cascais & Lisboa, Portugal</p>
                           <p className="text-xs text-muted-foreground mt-2">Atendimento presencial sob agendamento prévio.</p>
                        </div>
                      </div>
                   </div>
                </CardContent>
             </Card>

             <div className="bg-primary/5 p-8 border-l-4 border-primary">
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  "O verdadeiro luxo está na atenção aos detalhes. Cada contato é tratado com a mesma precisão que dedicamos à lapidação dos nossos cristais."
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
