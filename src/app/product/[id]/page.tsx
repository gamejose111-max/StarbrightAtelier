
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingBag, Star, Share2, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Mock data for detail based on ID
  const product = {
    id: id,
    name: id === '1' ? "Celestial Tote" : id === '2' ? "Midnight Clutch" : id === '3' ? "Aura Crossbody" : "Solar Satchel",
    price: id === '1' ? "$2,450" : id === '2' ? "$1,890" : id === '3' ? "$1,200" : "$3,100",
    description: "Um ícone da alta costura moderna. Esta peça exclusiva combina elegância atemporal com acabamento impecável em couro premium. Perfeita para quem busca distinção e sofisticação em cada detalhe.",
    features: [
      "Feito à mão por artesãos especializados",
      "Ferragens com banho de ouro 18k",
      "Interior em camurça premium",
      "Certificado de autenticidade exclusivo",
      "Edição limitada Ateliê Starbright"
    ],
    mainImage: PlaceHolderImages.find(p => p.id === `bag-${id}`)?.imageUrl || PlaceHolderImages[1].imageUrl,
    thumbnails: [
      PlaceHolderImages[1].imageUrl,
      PlaceHolderImages[2].imageUrl,
      PlaceHolderImages[3].imageUrl,
    ]
  };

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Media Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-white border">
              <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.thumbnails.map((thumb, idx) => (
                <div key={idx} className="aspect-square relative overflow-hidden bg-white border cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={thumb} alt={`${product.name} detail ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase">Edição Limitada</span>
                  <h1 className="text-4xl font-headline font-bold tracking-tight">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon"><Heart className="h-5 w-5" /></Button>
                  <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-2xl text-primary font-bold tracking-widest">{product.price}</p>
                <div className="h-4 w-[1px] bg-muted" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <Star className="h-4 w-4 text-primary mr-2" />
                  (12 Avaliações)
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed font-body">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={`/checkout/${product.id}`} className="flex-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 tracking-widest uppercase font-bold text-xs">
                    <ShoppingBag className="mr-2 h-5 w-5" /> Adquirir Peça
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1 rounded-none h-14 tracking-widest uppercase font-bold text-xs border-muted">
                  Consultoria de Estilo
                </Button>
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
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b">
                <AccordionTrigger className="font-headline font-bold text-sm tracking-widest uppercase hover:no-underline py-4">Entrega e Prazos</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  Nossas peças são enviadas com seguro total e embalagem especial para presente. 
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
