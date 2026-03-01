
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShoppingBag, Star, Share2, Heart, ShieldCheck, Truck } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Mock data for detail
  const product = {
    name: "Celestial Tote",
    price: "$2,450",
    description: "The Celestial Tote is a masterpiece of modern design, featuring our signature gold-finished hardware and meticulously sourced Italian calfskin. Its structured silhouette and spacious interior make it the ultimate companion for both professional settings and elegant travel.",
    features: [
      "Handcrafted in Italy",
      "Signature Starbright 18k gold-plated hardware",
      "Supple full-grain calfskin leather",
      "Internal suede lining with multiple compartments",
      "Dimensions: 32cm W x 25cm H x 15cm D"
    ],
    mainImage: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl,
    thumbnails: [
      PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl,
      PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl,
      PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl,
    ]
  };

  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Media Section */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden bg-white border">
              <Image src={product.mainImage || ""} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.thumbnails.map((thumb, idx) => (
                <div key={idx} className="aspect-square relative overflow-hidden bg-white border cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={thumb || ""} alt={`${product.name} detail ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase">Handbags</span>
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
                  (24 Reviews)
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed font-body">
              {product.description}
            </p>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase font-bold text-muted-foreground">Selected Color: Cream</label>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F4F3F0] border-2 border-primary cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-transparent cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-[#E8987D] border-2 border-transparent cursor-pointer" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-14 tracking-widest uppercase font-bold text-xs">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Shopping Bag
                </Button>
                <Button variant="outline" className="flex-1 rounded-none h-14 tracking-widest uppercase font-bold text-xs border-muted">
                  Personal Styling Consultation
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-8 border-y">
              <div className="flex items-center gap-3 text-sm font-medium tracking-tight">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Authenticity Guaranteed
              </div>
              <div className="flex items-center gap-3 text-sm font-medium tracking-tight">
                <Truck className="h-5 w-5 text-primary" />
                Complimentary Shipping
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b">
                <AccordionTrigger className="font-headline font-bold text-sm tracking-widest uppercase hover:no-underline py-4">Specifications</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-b">
                <AccordionTrigger className="font-headline font-bold text-sm tracking-widest uppercase hover:no-underline py-4">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  Enjoy complimentary express shipping on all orders. Returns are accepted within 30 days in original packaging. 
                  White glove delivery available for local atelier clients.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
