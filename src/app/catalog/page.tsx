
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
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
          <h1 className="text-5xl font-headline font-bold tracking-tight">A Coleção</h1>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-medium pt-2">
            Domínio Artesanal & Design Atemporal
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 border-y py-6 gap-8">
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <button 
                key={cat} 
                className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar coleção..." 
                className="pl-10 rounded-none border-muted focus:border-primary bg-transparent text-xs"
              />
            </div>
            <Button variant="outline" className="rounded-none border-muted px-6 uppercase tracking-widest text-[10px] font-bold h-10">
              Filtros <Filter className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, idx) => (
            <Link key={`${product.id}-${idx}`} href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-white mb-6">
                <Image 
                  src={product.image || ""} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-none tracking-widest uppercase text-[10px] font-bold h-12">
                    Ver Detalhes
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase font-bold">
                  {product.category} — {product.color}
                </span>
                <h3 className="font-headline text-xl tracking-wider font-bold group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-primary font-bold tracking-widest">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-32 text-center space-y-8">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Exibindo 8 de 24 peças</p>
          <div className="flex justify-center items-center gap-4">
            <div className="h-[1px] w-20 bg-muted"></div>
            <Button variant="ghost" className="rounded-none border-b-2 border-primary text-primary font-bold tracking-[0.2em] uppercase text-xs hover:bg-transparent">
              Carregar Mais
            </Button>
            <div className="h-[1px] w-20 bg-muted"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
