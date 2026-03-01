
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';

const products = [
  { id: 1, name: "Celestial Tote", price: "$2,450", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl, color: "Cream" },
  { id: 2, name: "Midnight Clutch", price: "$1,890", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl, color: "Gold/Black" },
  { id: 3, name: "Aura Crossbody", price: "$1,200", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl, color: "Tan" },
  { id: 4, name: "Solar Satchel", price: "$3,100", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl, color: "Burgundy" },
  { id: 5, name: "Stellar Evening Bag", price: "$2,200", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl, color: "Silver" },
  { id: 6, name: "Orbit Handbag", price: "$1,550", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl, color: "Pearl" },
  { id: 7, name: "Nebula Pouch", price: "$950", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl, color: "Onyx" },
  { id: 8, name: "Nova Bucket Bag", price: "$1,800", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl, color: "Champagne" },
];

export default function CatalogPage() {
  return (
    <div className="pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-headline font-bold tracking-tight">The Collection</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">Explore our complete universe of luxury</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-none border-muted px-6 uppercase tracking-widest text-xs font-bold">
              Sort By <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-none border-muted px-6 uppercase tracking-widest text-xs font-bold">
              Filters <Filter className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group hover-lift">
              <div className="aspect-[4/5] relative overflow-hidden bg-white border border-transparent group-hover:border-muted transition-colors">
                <Image 
                  src={product.image || ""} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-6 space-y-1">
                <p className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground uppercase">{product.color}</p>
                <h3 className="font-headline text-lg tracking-wider font-bold">{product.name}</h3>
                <p className="text-primary font-bold tracking-widest pt-1">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center">
          <div className="flex space-x-2">
            <Button variant="ghost" className="rounded-none border-b-2 border-primary text-primary font-bold">1</Button>
            <Button variant="ghost" className="rounded-none text-muted-foreground">2</Button>
            <Button variant="ghost" className="rounded-none text-muted-foreground">3</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
