
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Sparkles, Star } from 'lucide-react';

const featuredProducts = [
  { id: 1, name: "Celestial Tote", price: "$2,450", image: PlaceHolderImages.find(p => p.id === 'bag-1')?.imageUrl },
  { id: 2, name: "Midnight Clutch", price: "$1,890", image: PlaceHolderImages.find(p => p.id === 'bag-2')?.imageUrl },
  { id: 3, name: "Aura Crossbody", price: "$1,200", image: PlaceHolderImages.find(p => p.id === 'bag-3')?.imageUrl },
  { id: 4, name: "Solar Satchel", price: "$3,100", image: PlaceHolderImages.find(p => p.id === 'bag-4')?.imageUrl },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={PlaceHolderImages.find(p => p.id === 'hero-bag')?.imageUrl || ""} 
            alt="Luxury Handbag Hero" 
            fill 
            className="object-cover"
            priority
            data-ai-hint="luxury handbag"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 animate-fadeUp">
            <span className="text-xs tracking-[0.3em] font-bold text-primary uppercase mb-4 block">New Season Arrival</span>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-6 leading-tight drop-shadow-sm">
              Timeless Radiance <br /> For Every Moment
            </h1>
            <p className="text-lg text-white/90 mb-10 font-body leading-relaxed">
              Discover our signature collection of luxury handbags, designed with celestial inspiration and artisanal craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-10 tracking-widest uppercase text-xs">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/ai-stylist">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 rounded-none px-10 tracking-widest uppercase text-xs backdrop-blur-sm">
                  Find Your Style
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">The Starbright Edit</h2>
              <p className="text-muted-foreground max-w-md">Explore our most coveted pieces, curated for their exceptional craftsmanship and enduring style.</p>
            </div>
            <Link href="/catalog">
              <Button variant="link" className="text-primary p-0 tracking-[0.2em] uppercase text-xs font-bold group">
                View All Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group space-y-4 hover-lift">
                <div className="aspect-square relative overflow-hidden bg-white border">
                  <Image 
                    src={product.image || ""} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-headline tracking-widest font-bold pt-2">{product.name}</h3>
                  <p className="text-sm text-primary font-bold tracking-wider">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Stylist Promo */}
      <section className="relative h-[600px] overflow-hidden flex items-center">
        <Image 
          src={PlaceHolderImages.find(p => p.id === 'stylist-bg')?.imageUrl || ""} 
          alt="AI Stylist Background" 
          fill 
          className="object-cover"
          data-ai-hint="luxury atelier"
        />
        <div className="absolute inset-0 bg-white/80" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <div className="space-y-8 animate-fadeUp">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-2">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">Personalized Luxury</h2>
            <p className="text-xl text-muted-foreground font-body leading-relaxed">
              Not sure which bag matches your upcoming gala or daily professional look? 
              Our AI-powered stylist uses your preferences to find the perfect Starbright masterpiece.
            </p>
            <Link href="/ai-stylist">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-12 h-14 tracking-[0.2em] uppercase text-xs font-bold">
                Experience AI Stylist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">CRAFTSMANSHIP</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Each piece is handcrafted by master artisans using the finest materials sourced globally.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">CONCIERGE</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Dedicated personal shopping assistance for a tailored luxury experience.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm tracking-[0.3em] font-bold text-primary">DELIVERY</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Complimentary white-glove delivery on all orders over $1,500.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
