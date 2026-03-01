
"use client"

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Filter, Search, Loader2, Sparkles, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function CatalogPage() {
  const firestore = useFirestore();
  const productsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: products, loading } = useCollection(productsQuery);
  const categories = ["Todos", "Totes", "Clutches", "Crossbody", "Satchels", "Noite"];

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tight">A Coleção</h1>
          <div className="h-0.5 w-16 bg-primary mx-auto"></div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-medium pt-2">
            Domínio Artesanal & Design Atemporal
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 border-y border-border py-4 gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button 
                key={cat} 
                className="text-[9px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                placeholder="Buscar coleção..." 
                className="pl-9 rounded-none border-muted focus:border-primary bg-transparent text-[10px] h-9"
              />
            </div>
            <Button variant="outline" className="rounded-none border-muted px-4 uppercase tracking-widest text-[9px] font-bold h-9">
              Filtros <Filter className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {products?.map((product: any) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-card mb-4 border border-muted/30">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {product.isNew && (
                    <Badge className="rounded-none text-[8px] tracking-widest uppercase bg-primary text-primary-foreground border-none">
                      Novidade
                    </Badge>
                  )}
                  {product.isOnPromotion && (
                    <Badge className="rounded-none text-[8px] tracking-widest uppercase bg-secondary text-secondary-foreground border-none">
                      Promoção
                    </Badge>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button className="w-full bg-card/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white rounded-none tracking-widest uppercase text-[9px] font-bold h-10 shadow-sm border-none">
                    Ver Peça
                  </Button>
                </div>
              </div>

              <div className="space-y-1 text-center">
                <span className="text-[9px] tracking-[0.15em] text-muted-foreground uppercase font-bold block">
                  {product.category}
                </span>
                <h3 className="font-headline text-base tracking-wide font-bold group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  {product.isOnPromotion ? (
                    <>
                      <span className="text-muted-foreground text-xs line-through">€{product.price.toLocaleString()}</span>
                      <span className="text-primary font-bold tracking-widest text-sm">€{product.promotionPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-primary font-bold tracking-widest text-sm">€{product.price.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!products?.length && !loading && (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
            <Sparkles className="h-8 w-8 text-muted" />
            <p className="text-muted-foreground font-body italic">Nossa nova coleção está sendo preparada...</p>
          </div>
        )}

        <div className="mt-24 text-center space-y-6">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Exibindo {products?.length || 0} peças exclusivas</p>
        </div>
      </div>
    </div>
  );
}
