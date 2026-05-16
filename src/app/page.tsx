
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Loader2, Sparkles } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// Imagem oficial do Ateliê com fallbacks de segurança
const HERO_IMAGE_URL = "https://instagram.fopo3-1.fna.fbcdn.net/v/t51.82787-15/698705765_18087407699183921_4944892723646332832_n.webp?_nc_cat=110&ig_cache_key=Mzg5ODIyMjcyNTU0OTE1ODYyNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=AGpuJodQKKwQ7kNvwHhXUNE&_nc_oc=Ado6ExKs8RhfqRwVFSbXs-w-Md8uhHrJf1XqdHD8_Fli9Pbb0v4wpZ2ZNvLHrQkQM74&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fopo3-1.fna&_nc_gid=9vQ1_tc7QGKpSUYz8uFIPA&_nc_ss=7a22e&oh=00_Af4lSY-_Gwx_zt5O5bp2BFFPq2qW3r6_NSXXAwYuYGZqeQ&oe=6A0E20A1";

export default function Home() {
  const firestore = useFirestore();

  const featuredQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'), limit(5));
  }, [firestore]);

  const { data: featuredProducts, isLoading } = useCollection(featuredQuery);
  const highlightProduct = featuredProducts && featuredProducts.length > 0 ? featuredProducts[0] : null;

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section - Imagem de Fundo Oficial Sem Filtros */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Imagem de Fundo - Pura e Sem Filtros conforme solicitado */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={HERO_IMAGE_URL} 
            alt="Ateliê Starbright Official Background" 
            fill 
            className="object-cover" 
            priority
            unoptimized={true}
          />
        </div>

        {/* Conteúdo posicionado com Nome da Empresa Profissional Ultra HD */}
        <div className="container mx-auto px-4 relative z-10 text-center mt-auto pb-32 animate-fadeUp">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-white drop-shadow-[0_10px_20px_rgba(0,0,0,1)] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] uppercase tracking-[0.3em] leading-tight">
                Ateliê <br className="sm:hidden" /> <span className="text-primary drop-shadow-[0_10px_25px_rgba(0,0,0,1)] drop-shadow-[0_0_40px_rgba(232,186,48,0.4)]">Starbright</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/catalog">
                <Button className="rounded-none h-14 md:h-16 px-10 md:px-14 tracking-[0.2em] uppercase font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl border-none">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" className="rounded-none h-14 md:h-16 px-10 md:px-14 tracking-[0.2em] uppercase font-bold text-xs border-primary text-primary hover:bg-primary/10 bg-white/20 backdrop-blur-md">
                  Nosso Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Curadoria */}
      <section className="py-16 md:py-24 bg-background border-t">
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
                    <p className="text-transform md:text-xs text-primary font-bold tracking-widest">
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

      {/* Produto em Destaque */}
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
    </div>
  );
}
