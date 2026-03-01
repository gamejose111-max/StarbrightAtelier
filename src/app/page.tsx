
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Sparkles, Star, Gem } from 'lucide-react';

const featuredProducts = [
  { id: 1, name: "Celestial Tote", price: "€2.450", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl },
  { id: 2, name: "Midnight Clutch", price: "€1.890", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl },
  { id: 3, name: "Aura Crossbody", price: "€1.200", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl },
  { id: 4, name: "Solar Satchel", price: "€3.100", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl },
  { id: 5, name: "Stellar Bag", price: "€2.200", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={PlaceHolderImages.find(p => p.id === 'hero-bag')?.imageUrl || ""} 
            alt="Bolsa de Luxo Hero" 
            fill 
            className="object-cover"
            priority
            data-ai-hint="luxury handbag"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl bg-white/5 backdrop-blur-md border border-white/20 p-8 md:p-12 animate-fadeUp">
            <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase mb-4 block">A Arte de Brilhar em Cada Detalhe</span>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-6 leading-tight drop-shadow-sm">
              Esculpimos Luz <br /> Em Peças Eternas
            </h1>
            <p className="text-lg text-white/90 mb-10 font-body leading-relaxed italic">
              "No Ateliê StarBright, não criamos apenas bolsas; esculpimos luz."
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 tracking-widest uppercase text-xs">
                  Comprar Coleção
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 rounded-none px-10 tracking-widest uppercase text-xs backdrop-blur-sm">
                  O Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Snapshot */}
      <section className="py-24 bg-white border-y">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Gem className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">O Cristal de Vidro de Alta Pureza</h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed italic">
              "Utilizamos o cristal de vidro de alta pureza, lapidado para capturar a luz e devolvê-la em um espectro de brilho inigualável. O que você segura em suas mãos é um exercício de paciência e precisão."
            </p>
            <div className="pt-4">
               <Link href="/sobre" className="text-primary font-bold tracking-[0.2em] uppercase text-xs border-b border-primary pb-1 hover:text-primary/80 transition-colors">
                Leia o Manifesto Completo
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Organized Grids */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">Peças de Curadoria</h2>
              <p className="text-muted-foreground max-w-md">Descubra texturas fluídas, quase líquidas, que deslizam sobre o corpo com a elegância de uma segunda pele.</p>
            </div>
            <Link href="/catalog">
              <Button variant="link" className="text-primary p-0 tracking-[0.2em] uppercase text-xs font-bold group">
                Ver Coleção Completa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group space-y-3 hover-lift">
                <div className="aspect-square relative overflow-hidden bg-white border border-muted/50">
                  <Image 
                    src={product.image || ""} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                      <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-0.5">
                  <h3 className="text-[13px] font-headline tracking-wide font-bold truncate px-2">{product.name}</h3>
                  <p className="text-xs text-primary font-bold tracking-widest">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">ATEMPORALIDADE</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Enquanto a moda é passageira, o brilho do cristal é eterno. Nossas peças definem eras.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">EXCLUSIVIDADE</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Cada bolsa StarBright é numerada e feita sob encomenda, garantindo que sua peça seja única.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">VERSATILIDADE CHIC</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Da Marina de Cascais a eventos de gala em Lisboa, a protagonista silenciosa de qualquer silhueta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Stylist Promo */}
      <section className="relative h-[500px] overflow-hidden flex items-center">
        <Image 
          src={PlaceHolderImages.find(p => p.id === 'stylist-bg')?.imageUrl || ""} 
          alt="Fundo Estilista IA" 
          fill 
          className="object-cover"
          data-ai-hint="luxury atelier"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <div className="space-y-8 animate-fadeUp">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Consultoria de Luz</h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Encontre o brilho que melhor reflete sua presença. Nossa estilista baseada em IA ajuda você a escolher a obra-prima Starbright ideal.
            </p>
            <Link href="/ai-stylist">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 h-14 tracking-[0.2em] uppercase text-xs font-bold">
                Experimentar Estilista IA
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
