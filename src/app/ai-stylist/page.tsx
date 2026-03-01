
"use client"

import { useState } from 'react';
import { recommendHandbags, RecommendHandbagsOutput } from '@/ai/flows/ai-powered-style-recommender';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function AIStylistPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendHandbagsOutput | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const output = await recommendHandbags({
        occasion: formData.get('occasion') as string,
        stylePreference: formData.get('stylePreference') as string,
        wardrobeItems: formData.get('wardrobeItems') as string,
      });
      setResult(output);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="h-4 w-4" /> Assistente de Estilo IA
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Sua Estilista Pessoal do Ateliê</h1>
          <p className="text-muted-foreground text-lg font-body">
            Descreva suas necessidades e deixe nossa inteligência encontrar a bolsa perfeita para o seu estilo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Card className="rounded-none border-primary/20 shadow-xl overflow-hidden bg-card">
              <div className="bg-primary p-6 text-primary-foreground">
                <h3 className="font-headline tracking-widest font-bold">Preferências</h3>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="occasion" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">A Ocasião</Label>
                    <Input id="occasion" name="occasion" placeholder="ex: Casamento de Verão, Reunião de Diretoria" required className="rounded-none border-muted focus:border-primary bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stylePreference" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">Preferência de Estilo</Label>
                    <Input id="stylePreference" name="stylePreference" placeholder="ex: Minimalista, Moderno e Ousado" required className="rounded-none border-muted focus:border-primary bg-background" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wardrobeItems" className="text-xs tracking-widest uppercase font-bold text-muted-foreground">Guarda-Roupa Correspondente</Label>
                    <Textarea id="wardrobeItems" name="wardrobeItems" placeholder="O que você planeja vestir? (ex: Vestido de seda, terno sob medida)" required className="rounded-none border-muted focus:border-primary min-h-[100px] bg-background" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-none tracking-widest uppercase font-bold">
                    {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Obter Recomendações"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-7">
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="animate-spin h-12 w-12 text-primary" />
                <p className="text-lg font-headline italic text-muted-foreground">Consultando nossos arquivos para o seu par perfeito...</p>
              </div>
            ) : result ? (
              <div className="space-y-8 animate-fadeUp">
                <div className="bg-card border-l-4 border-primary p-8 shadow-sm">
                  <h2 className="text-2xl font-headline font-bold mb-4">Nota da Estilista</h2>
                  <p className="text-muted-foreground italic leading-relaxed">{result.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {result.recommendations.map((bag, i) => (
                    <Card key={i} className="rounded-none border-none shadow-md overflow-hidden bg-card">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-64 md:h-auto">
                          <Image src={bag.imageUrl} alt={bag.name} fill className="object-cover" />
                        </div>
                        <div className="md:w-2/3 p-8 flex flex-col justify-center space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase">{bag.brand}</span>
                            <h4 className="text-xl font-headline font-bold">{bag.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{bag.description}</p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {bag.features.map((feature, idx) => (
                              <span key={idx} className="text-[10px] bg-muted px-2 py-1 uppercase tracking-wider font-bold text-muted-foreground">{feature}</span>
                            ))}
                          </div>
                          <Button variant="outline" className="w-fit rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-4 group">
                            Ver Detalhes <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[500px] border-2 border-dashed border-muted rounded-none flex flex-col items-center justify-center text-center p-12 space-y-4 bg-muted/20">
                <Sparkles className="h-12 w-12 text-muted/40" />
                <h3 className="text-2xl font-headline font-bold text-muted-foreground">Suas Recomendações Aparecerão Aqui</h3>
                <p className="text-muted-foreground max-w-sm">Preencha o formulário para receber uma seleção curada de bolsas adaptada especificamente ao seu próximo evento e guarda-roupa.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
