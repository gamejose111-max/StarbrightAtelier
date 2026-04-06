
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

const featuredProducts = [
  { id: 1, name: "Bolsa Pérola Luminosidade", price: "€2.450", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl },
  { id: 2, name: "Midnight Clique", price: "€1.890", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl },
  { id: 3, name: "Aura Crossbody", price: "€1.200", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl },
  { id: 4, name: "Solar Satchel", price: "€3.100", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl },
  { id: 5, name: "Stellar Bag", price: "€2.200", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl },
];

export default function Home() {
  const heroTitleImg = PlaceHolderImages.find(p => p.id === 'hero-title-img')?.imageUrl;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={PlaceHolderImages.find(p => p.id === 'hero-bag')?.imageUrl || ""}
            alt="Ateliê Starbright"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="max-w-5xl animate-fadeUp text-center space-y-12 flex flex-col items-center">
            <div className="space-y-6 flex flex-col items-center w-full">
              <span className="text-[10px] tracking-[0.5em] font-bold text-primary uppercase block mb-4">Onde a Luz se Torna Arte</span>
              
              {/* Logo PNG Aumentada */}
              <div className="relative w-full max-w-5xl aspect-[4/1] transition-all hover:scale-[1.03] duration-1000 ease-in-out">
                {heroTitleImg && (
                  <Image 
                    src={heroTitleImg} 
                    alt="Ateliê Starbright" 
                    fill 
                    className="object-contain"
                    priority
                  />
                )}
              </div>

              <p className="text-xl md:text-2xl text-white/90 font-headline italic tracking-wide max-w-2xl mx-auto">
                "Peças exclusivas esculpidas para brilhar eternamente."
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 w-full sm:w-auto">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button className="w-full rounded-none h-16 px-12 tracking-[0.2em] uppercase font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="/sobre" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-none h-16 px-12 tracking-[0.2em] uppercase font-bold text-xs border-white text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                  Nosso Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
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
              <Link key={product.id} href={`/catalog`} className="group space-y-3 hover-lift">
                <div className="aspect-square relative overflow-hidden bg-card/50 border border-muted/30">
                  <Image 
                    src={product.image || ""} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-background/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
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

      {/* Product Highlight Section - Bolsa Pérola */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden border border-primary/20 shadow-2xl">
              <Image 
                src={PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl || ""} 
                alt="Bolsa Pérola Luminosidade" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs tracking-[0.4em] font-bold text-primary uppercase">Em Destaque</span>
                <h2 className="text-4xl font-headline font-bold leading-tight">Bolsa Pérola Luminosidade</h2>
              </div>
              <p className="text-lg font-headline italic text-primary font-medium">"O Toque de Arte que seu Look Precisa"</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Eleve sua produção a um novo patamar de sofisticação. Esta bolsa, inteiramente confeccionada em miçangas com acabamento que remete à delicadeza das pérolas em tom creme, é a definição de elegância atemporal.
                </p>
                <p>
                  Mais do que um acessório, esta é uma peça de design pensada para quem valoriza a beleza nos detalhes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <h4 className="text-[10px] tracking-widest font-bold uppercase mb-2">Dimensões</h4>
                  <p className="text-sm">32 cm x 20 cm</p>
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest font-bold uppercase mb-2">Acabamento</h4>
                  <p className="text-sm">Esferas Estilo Pérola</p>
                </div>
              </div>
              <Link href="/catalog">
                <Button className="rounded-none h-14 px-10 tracking-[0.2em] uppercase font-bold text-xs bg-primary hover:bg-primary/90">
                  Descobrir Peça
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 border-t">
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
      <section className="relative h-[400px] overflow-hidden flex items-center bg-muted/30">
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
