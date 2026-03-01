
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-white border-t py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="font-headline text-xl tracking-widest font-bold">STARBRIGHT ATELIER</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Exquisite luxury handbags crafted for the modern individual. Elegance in every stitch, brilliance in every detail.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">COLLECTION</h4>
            <ul className="space-y-4 text-sm uppercase tracking-wider font-medium">
              <li><Link href="/catalog?cat=handbags" className="hover:text-primary transition-colors">Handbags</Link></li>
              <li><Link href="/catalog?cat=clutches" className="hover:text-primary transition-colors">Evening Clutches</Link></li>
              <li><Link href="/catalog?cat=totes" className="hover:text-primary transition-colors">Luxury Totes</Link></li>
              <li><Link href="/catalog?cat=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">CLIENT CARE</h4>
            <ul className="space-y-4 text-sm uppercase tracking-wider font-medium">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline text-sm tracking-[0.2em] font-bold">NEWSLETTER</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex gap-2">
              <Input placeholder="E-mail address" className="bg-background border-muted rounded-none" />
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} STARBRIGHT ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>TERMS OF SERVICE</span>
            <span>COOKIE SETTINGS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
