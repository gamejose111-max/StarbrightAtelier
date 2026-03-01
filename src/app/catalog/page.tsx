
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const products = [
  { id: 1, name: "Celestial Tote", price: "€2.450", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl, color: "Creme", category: "Totes" },
  { id: 2, name: "Midnight Clutch", price: "€1.890", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl, color: "Dourado/Preto", category: "Clutches" },
  { id: 3, name: "Aura Crossbody", price: "€1.200", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl, color: "Caramelo", category: "Crossbody" },
  { id: 4, name: "Solar Satchel", price: "€3.100", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl, color: "Borgonha", category: "Satchels" },
  { id: 5, name: "Stellar Evening Bag", price: "€2.200", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl, color: "Prata", category: "Noite" },
  { id: 6, name: "Orbit Handbag", price: "€1.550", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl, color: "Pérola", category: "Bolsas de Mão" },
  { id: 7, name: "Nebula Pouch", price: "€950", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl, color: "Ônix", category: "Pouches" },
  { id: 8, name: "Nova Bucket Bag", price: "€1.800", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl, color: "Champagne", category: "Bucket" },
];

const categories = ["Todos", "Totes", "Clutches", "Crossbody", "Satchels", "Noite"];

export default function CatalogPage() {
  return (
    <div className="pt-24 pb-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header section */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl font-headline font-bold tracking-tight">A Coleção</h1>
          <div className="h-0.5 w-16 bg-primary mx-auto"></div>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-medium pt-2">
            Domínio Artesanal & Design Atemporal
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 border-y py-4 gap-6">
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

        {/* Catalog Grid - Organized and more compact */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
          {products.map((product, idx) => (
            <Link key={`${product.id}-${idx}`} href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-white mb-4 border border-muted/30">
                <Image 
                  src={product.image || ""} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-primary hover:text-white rounded-none tracking-widest uppercase text-[9px] font-bold h-10 shadow-sm border-none">
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
                <p className="text-primary font-bold tracking-widest text-sm">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-24 text-center space-y-6">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Exibindo 8 de 24 peças exclusivas</p>
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-muted"></div>
            <Button variant="ghost" className="rounded-none border-b border-primary text-primary font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-transparent h-auto py-1 px-0">
              Ver Mais Peças
            </Button>
            <div className="h-[1px] w-12 bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
