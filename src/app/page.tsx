
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Loader2, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const firestore = useFirestore();

  const featuredQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'), limit(5));
  }, [firestore]);

  const { data: featuredProducts, isLoading } = useCollection(featuredQuery);
  const highlightProduct = featuredProducts && featuredProducts.length > 0 ? featuredProducts[0] : null;

  return (
    <div className="flex flex-col">
      <section className="relative h-[90vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <Image 
            src={PlaceHolderImages.find(p => p.id === 'hero-bag')?.imageUrl || ""} 
            alt="Ateliê Starbright Background" 
            fill 
            className="object-cover opacity-60" 
            priority
            data-ai-hint="luxury sparkles"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,186,48,0.2)_0%,transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex justify-center">
          <div className="max-w-5xl animate-fadeUp text-center space-y-6 md:space-y-8 flex flex-col items-center">
            <div className="space-y-4 md:space-y-6 flex flex-col items-center w-full">
              <span className="text-[10px] tracking-[0.3em] md:tracking-[0.5em] font-bold text-primary uppercase block mb-2 drop-shadow-md">Onde a Luz se Torna Arte</span>
              
              <h1 className="text-4xl md:text-7xl font-headline font-bold text-white leading-tight tracking-tight">
                Ateliê <span className="text-primary italic drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] brightness-110 [text-shadow:2px_2px_10px_rgba(0,0,0,0.8)]">Starbright</span>
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 md:pt-8 w-full sm:w-auto">
              <Link href="/catalog" className="w-full sm:w-auto">
                <Button className="w-full rounded-none h-14 md:h-16 px-10 md:px-12 tracking-[0.2em] uppercase font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="/sobre" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-none h-14 md:h-16 px-10 md:px-12 tracking-[0.2em] uppercase font-bold text-xs border-primary text-primary hover:bg-primary/10 hover:text-primary backdrop-blur-sm bg-black/20">
                  Nosso Manifesto
                </Button>
              </Link>
            </div>

            <p className="text-lg md:text-2xl text-white font-headline italic tracking-wide max-w-2xl mx-auto pt-4 drop-shadow-md [text-shadow:1px_1px_5px_rgba(0,0,0,0.5)]">
              "Peças exclusivas esculpidas para brilhar eternamente."
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 space-y-6 md:space-y-0 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Curadoria Recente</h2>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0 text-sm">O brilho mais atual do nosso ateliê, selecionado para elevar a sua presença.</p>
            </div>
            <Link href="/catalog">
              <Button variant="link" className="text-primary p-0 tracking-[0.2em] uppercase text-xs font-bold group">
                Ver Coleção Completa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-primary/40" />
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.map((product: any) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group space-y-3 hover-lift">
                  <div className="aspect-square relative overflow-hidden bg-card/50 border border-muted/30">
                    {product.imageUrl && (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-background/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                        <Star className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary fill-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-0.5 px-2">
                    <h3 className="text-[11px] md:text-[13px] font-headline tracking-wide font-bold truncate uppercase">{product.name}</h3>
                    <p className="text-[10px] md:text-xs text-primary font-bold tracking-widest">
                      €{product.isOnPromotion ? product.promotionPrice.toLocaleString() : product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 bg-muted/10 border border-dashed">
              <span className="h-8 w-8 text-muted"><Sparkles /></span>
              <p className="text-muted-foreground font-body italic">O Ateliê está a preparar a próxima curadoria...</p>
              <Link href="/admin/products">
                <Button variant="outline" size="sm" className="text-[10px] uppercase font-bold tracking-widest">Adicionar Peças</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {highlightProduct && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden border border-primary/20 shadow-2xl order-2 lg:order-1 bg-white">
                <Image 
                  src={highlightProduct.imageUrl} 
                  alt={highlightProduct.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left">
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-primary uppercase">Obra em Destaque</span>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">{highlightProduct.name}</h2>
                </div>
                <p className="text-base md:text-lg font-headline italic text-primary font-medium">"O Toque de Arte que seu Look Precisa"</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-4">
                  <p>{highlightProduct.description}</p>
                </div>
                <Link href={`/product/${highlightProduct.id}`}>
                  <Button className="w-full sm:w-auto rounded-none h-14 px-10 tracking-[0.2em] uppercase font-bold text-xs bg-primary hover:bg-primary/90">
                    Descobrir Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

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
