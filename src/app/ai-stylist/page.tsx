
"use client"

import { useState } from 'react';
import { recommendHandbags, RecommendHandbagsOutput } from '@/ai/flows/ai-powered-style-recommender';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AIStylistPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendHandbagsOutput | null>(null);
  const firestore = useFirestore();

  // Buscar produtos reais da loja
  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'));
  }, [firestore]);

  const { data: products } = useCollection(productsQuery);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!products || products.length === 0) return;
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Preparar lista de produtos simplificada para a IA
    const availableProducts = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price
    }));

    try {
      const output = await recommendHandbags({
        occasion: formData.get('occasion') as string,
        stylePreference: formData.get('stylePreference') as string,
        wardrobeItems: formData.get('wardrobeItems') as string,
        availableProducts: availableProducts,
      });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Função para encontrar os dados completos do produto no nosso array local
  const getProductData = (id: string) => {
    return products?.find((p: any) => p.id === id);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="h-4 w-4" /> Consultoria de Luz
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Sua Estilista Pessoal Starbright</h1>
          <p className="text-muted-foreground text-lg font-body">
            Nossa inteligência analisa o seu perfil e seleciona as obras-primas do nosso catálogo que mais brilham com você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Card className="rounded-none border-primary/20 shadow-xl overflow-hidden bg-card">
              <div className="bg-primary p-6 text-primary-foreground">
                <h3 className="font-headline tracking-widest font-bold">Suas Preferências</h3>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="occasion" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">A Ocasião</Label>
                    <Input id="occasion" name="occasion" placeholder="ex: Casamento na Marina de Cascais" required className="rounded-none border-muted focus:border-primary bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stylePreference" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">Estilo Pessoal</Label>
                    <Input id="stylePreference" name="stylePreference" placeholder="ex: Minimalista e Sofisticada" required className="rounded-none border-muted focus:border-primary bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wardrobeItems" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">O que vai vestir?</Label>
                    <Textarea id="wardrobeItems" name="wardrobeItems" placeholder="Descreva seu look (ex: Vestido longo de seda preta)" required className="rounded-none border-muted focus:border-primary min-h-[100px] bg-background" />
                  </div>
                  <Button type="submit" disabled={loading || !products?.length} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-none tracking-widest uppercase font-bold">
                    {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Analisar Catálogo"}
                  </Button>
                  {!products?.length && (
                    <p className="text-[10px] text-center text-muted-foreground mt-2 italic">Aguardando o catálogo carregar...</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
                <p className="text-lg font-headline italic text-muted-foreground">Curando as melhores opções para você...</p>
              </div>
            ) : result ? (
              <div className="space-y-8 animate-fadeUp">
                <div className="bg-card border-l-4 border-primary p-8 shadow-sm">
                  <h2 className="text-2xl font-headline font-bold mb-4">Nota da Estilista</h2>
                  <p className="text-muted-foreground italic leading-relaxed">{result.summary}</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {result.recommendations.map((rec, i) => {
                    const product = getProductData(rec.productId);
                    if (!product) return null;

                    return (
                      <Card key={i} className="rounded-none border-none shadow-md overflow-hidden bg-card hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative h-64 md:h-auto">
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="md:w-2/3 p-8 flex flex-col justify-center space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">Sugestão Real</span>
                              <h4 className="text-xl font-headline font-bold">{product.name}</h4>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed font-bold italic">"{rec.reason}"</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-muted">
                              <span className="text-lg font-bold text-primary">€{product.price.toLocaleString()}</span>
                              <Link href={`/product/${product.id}`}>
                                <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase text-[10px] tracking-widest font-bold group">
                                  Ver Detalhes <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-[500px] border-2 border-dashed border-muted rounded-none flex flex-col items-center justify-center text-center p-12 space-y-4 bg-muted/20">
                <Sparkles className="h-12 w-12 text-muted/40" />
                <h3 className="text-2xl font-headline font-bold text-muted-foreground">Seu Brilho Ideal</h3>
                <p className="text-muted-foreground max-w-sm">Preencha suas preferências para que nossa IA encontre as peças do Ateliê que melhor refletem sua presença.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
