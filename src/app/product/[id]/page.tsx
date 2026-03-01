
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingBag, Star, Share2, Heart, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProductDetailPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  
  const productDoc = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'products', id as string);
  }, [firestore, id]);

  const { data: product, loading } = useDoc(productDoc);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-headline mb-4">Peça Não Encontrada</h1>
        <Link href="/catalog">
          <Button variant="outline">Voltar ao Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Media Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-white border">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <Badge className="rounded-none uppercase tracking-widest text-[10px]">Novidade</Badge>}
                {product.isOnPromotion && <Badge variant="secondary" className="rounded-none uppercase tracking-widest text-[10px]">Oferta</Badge>}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase">{product.category}</span>
                  <h1 className="text-4xl font-headline font-bold tracking-tight">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  {product.isOnPromotion ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">€{product.price.toLocaleString()}</span>
                      <span className="text-2xl text-primary font-bold tracking-widest">€{product.promotionPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-2xl text-primary font-bold tracking-widest">€{product.price.toLocaleString()}</span>
                  )}
                </div>
                <div className="h-4 w-[1px] bg-muted" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 text-primary mr-2" />
                </div>
              </div>
            </div>

            <div className="text-muted-foreground leading-relaxed font-body whitespace-pre-wrap">
              {product.description}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={`/checkout/${product.id}`} className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 tracking-widest uppercase font-bold text-xs">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Adquirir Peça
                  </Button>
                </Link>
                <Link href="/ai-stylist" className="flex-1">
                  <Button variant="outline" className="w-full rounded-none h-14 tracking-widest uppercase font-bold text-xs border-muted">
                    Consultoria de Estilo
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-8 border-y">
              <div className="flex items-center gap-3 text-sm font-medium tracking-tight">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Autenticidade Garantida
              </div>
              <div className="flex items-center gap-3 text-sm font-medium tracking-tight">
                <Truck className="h-5 w-5 text-primary" />
                Envio White-Glove
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b">
                <AccordionTrigger className="font-headline font-bold text-sm tracking-widest uppercase hover:no-underline py-4">Especificações</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features?.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                    {!product.features?.length && <li>Design exclusivo Ateliê Starbright</li>}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b">
                <AccordionTrigger className="font-headline font-bold text-sm tracking-widest uppercase hover:no-underline py-4">Entrega e Prazos</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  Nossas peças são enviadas com seguro total e embalagem especial para presente em toda a Europa. 
                  O prazo de aprovação do pedido é de até 24h úteis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
