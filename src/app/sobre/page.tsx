
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Gem, Sparkles, Star } from 'lucide-react';

export default function SobrePage() {
  return (
    <div className="pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-16 text-center">
            <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase">Manifesto StarBright</span>
            <h1 className="text-4xl md:text-6xl font-headline font-bold">A Arte de Brilhar em Cada Detalhe</h1>
            <div className="h-1 w-24 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12 text-lg font-body leading-relaxed text-muted-foreground">
              <section className="space-y-6">
                <h2 className="text-2xl font-headline font-bold text-foreground">O Manifesto</h2>
                <p>
                  Existem acessórios que acompanham um momento, e existem obras que definem uma era. No <strong className="text-primary">Ateliê StarBright</strong>, não criamos apenas bolsas; esculpimos luz.
                </p>
                <p>
                  Cada peça é o resultado de uma curadoria minuciosa. Utilizamos o <strong className="text-foreground">cristal de vidro de alta pureza</strong>, lapidado para capturar a luz e devolvê-la em um espectro de brilho inigualável. O que você segura em suas mãos não é apenas um acessório, é um exercício de paciência e precisão.
                </p>
              </section>

              <div className="relative aspect-video overflow-hidden border border-primary/10 shadow-lg">
                 <Image 
                   src={PlaceHolderImages.find(p => p.id === 'company-image')?.imageUrl || ""} 
                   alt="Bolsa de Pérolas StarBright" 
                   fill 
                   className="object-cover"
                 />
              </div>

              <section className="space-y-6">
                <p>
                  Nossas artesãs entrelaçam, fio a fio, milhares de pequenas esferas de vidro, criando texturas que evocam a sofisticação das joias vintage com a modernidade do design contemporâneo. 
                </p>
                <p className="italic text-primary-foreground bg-primary/10 p-6 border-l-4 border-primary">
                  "O resultado? Uma textura fluida, quase líquida, que desliza sobre o corpo com a elegância de uma segunda pele."
                </p>
              </section>

              <section className="space-y-8">
                <h3 className="text-2xl font-headline font-bold text-foreground">Por que escolher o cristal de vidro?</h3>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-widest text-sm mb-2">Atemporalidade</h4>
                      <p className="text-sm">Enquanto a moda é passageira, o brilho do cristal é eterno. Nossas peças são feitas para atravessar gerações.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Gem className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-widest text-sm mb-2">Exclusividade</h4>
                      <p className="text-sm">Cada bolsa StarBright é numerada e feita sob encomenda, garantindo que sua peça seja tão única quanto a sua presença.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground uppercase tracking-widest text-sm mb-2">Versatilidade Chic</h4>
                      <p className="text-sm">Do entardecer na Marina de Cascais a um evento de gala em Lisboa, a sua StarBright é a protagonista silenciosa que eleva qualquer silhueta.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 sticky top-32 space-y-8">
              <div className="border border-primary/20 p-8 space-y-6 bg-muted/10">
                <h3 className="font-headline text-xl font-bold">O Toque de Luxo</h3>
                <p className="text-sm leading-relaxed">
                  Não buscamos o volume, buscamos a perfeição. Cada bolsa é finalizada com metais de alta gramatura e fechos precisos, pensados para quem não abre mão do conforto, mas exige o espetáculo.
                </p>
                <p className="text-sm leading-relaxed">
                  Ser StarBright é compreender que o verdadeiro luxo não é o que se ostenta, mas a qualidade do que se escolhe. É o peso do cristal na mão, a frieza do vidro contra a pele em uma noite quente e o reflexo magnético que você deixa por onde passa.
                </p>
                <div className="pt-4 border-t border-primary/10">
                  <p className="font-headline text-lg font-bold">Ateliê StarBright</p>
                  <p className="text-xs tracking-widest text-primary font-bold uppercase">Onde a luz encontra o design</p>
                </div>
              </div>
              
              <div className="aspect-[3/4] relative">
                <Image 
                  src={PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl || ""} 
                  alt="Peça StarBright" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
