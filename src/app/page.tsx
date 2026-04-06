
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Background Image com Overlay para elegância */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://fv5-5.files.fm/thumb_show.php?i=wsq5e49whv&view&v=1"
            alt="Ateliê Starbright Background"
            fill
            className="object-cover opacity-60 md:opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="max-w-5xl animate-fadeUp text-center space-y-6 md:space-y-8 flex flex-col items-center">
            <div className="space-y-4 md:space-y-6 flex flex-col items-center w-full">
              <span className="text-[10px] tracking-[0.3em] md:tracking-[0.5em] font-bold text-primary uppercase block mb-2 drop-shadow-sm">Onde a Luz se Torna Arte</span>
              
              <h1 className="text-4xl md:text-7xl font-headline font-bold text-foreground leading-tight tracking-tight drop-shadow-md">
                Ateliê <span className="text-primary italic">Starbright</span>
              </h1>

              <p className="text-lg md:text-2xl text-foreground/90 font-headline italic tracking-wide max-w-2xl mx-auto pt-2 drop-shadow-sm">
                "Peças exclusivas esculpidas para brilhar eternamente."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8 w-full sm:w-auto">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button className="w-full rounded-none h-14 md:h-16 px-10 md:px-12 tracking-[0.2em] uppercase font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="/sobre" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-none h-14 md:h-16 px-10 md:px-12 tracking-[0.2em] uppercase font-bold text-xs border-primary text-primary hover:bg-primary/10 hover:text-primary backdrop-blur-sm">
                  Nosso Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 space-y-6 md:space-y-0 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Peças de Curadoria</h2>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0 text-sm">Descubra texturas fluídas, quase líquidas, que deslizam sobre o corpo com a elegância de uma segunda pele.</p>
            </div>
            <Link href="/catalog">
              <Button variant="link" className="text-primary p-0 tracking-[0.2em] uppercase text-xs font-bold group">
                Ver Coleção Completa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 1].map((id, index) => (
              <Link key={index} href={`/catalog`} className="group space-y-3 hover-lift">
                <div className="aspect-square relative overflow-hidden bg-card/50 border border-muted/30">
                  <Image 
                    src={PlaceHolderImages.find(p => p.id === `bag-${id}`)?.imageUrl || ""} 
                    alt="Bolsa Starbright" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-background/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                      <Star className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-0.5">
                  <h3 className="text-[11px] md:text-[13px] font-headline tracking-wide font-bold truncate px-2 uppercase">Peça de Luxo</h3>
                  <p className="text-[10px] md:text-xs text-primary font-bold tracking-widest">€2.450</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden border border-primary/20 shadow-2xl order-2 lg:order-1">
              <Image 
                src={PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl || ""} 
                alt="Destaque Starbright" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left">
              <div className="space-y-2">
                <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-primary uppercase">Em Destaque</span>
                <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">Bolsa Pérola Luminosidade</h2>
              </div>
              <p className="text-base md:text-lg font-headline italic text-primary font-medium">"O Toque de Arte que seu Look Precisa"</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  Eleve sua produção a um novo patamar de sofisticação. Esta bolsa, inteiramente confeccionada em miçangas com acabamento que remete à delicadeza das pérolas em tom creme, é a definição de elegância atemporal.
                </p>
              </div>
              <Link href="/catalog">
                <Button className="w-full sm:w-auto rounded-none h-14 px-10 tracking-[0.2em] uppercase font-bold text-xs bg-primary hover:bg-primary/90">
                  Descobrir Peça
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 md:py-24 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">ATEMPORALIDADE</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Enquanto a moda é passageira, o brilho do cristal é eterno. Nossas peças definem eras.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">EXCLUSIVIDADE</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Cada bolsa StarBright é numerada e feita sob encomenda, garantindo que sua peça seja única.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">VERSATILIDADE CHIC</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Da Marina de Cascais a eventos de gala em Lisboa, a protagonista silenciosa de qualquer silhueta.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
