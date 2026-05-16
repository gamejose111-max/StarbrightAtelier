
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Loader2, Sparkles } from 'lucide-react';

const HERO_IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/studio-6330463347-ad38a.firebasestorage.app/o/projects%2Fstudio-6330463347-ad38a%2Fimages%2Fl_0_u_m_i_n_a_r_i_a_s_o_f_t_w_a_r_e_l_o_g_o_w_i_t_h_a_s_t_a_r_a_n_d_f_l_o_w_e_r_s_r_o_u_n_d_v_e_c_t_o_r_s_t_y_l_e_l_u_x_u_r_y_w_h_i_t_e_f_i_g_u_r_e_s_v_i_n_t_a_g_e_v_i_c_t_o_r_i_a_n_w_i_t_h_w_h_i_t_e_r_o_s_e_s_o_n_t_h_e_c_o_r_n_e_r_s_p_l_a_y_f_a_i_r_d_i_s_p_l_a_y_f_o_n_t_s_a_n_s_l_u_x_u_r_y_c_l_e_a_n_g_o_l_d_e_n_v_e_r_y_l_u_x_u_r_y_1740049444158.png?alt=media&token=42b66723-5355-4654-8c85-618be29d675b";

export default function Home() {
  const firestore = useFirestore();

  const featuredQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'), limit(5));
  }, [firestore]);

  const { data: featuredProducts, isLoading } = useCollection(featuredQuery);
  const highlightProduct = featuredProducts && featuredProducts.length > 0 ? featuredProducts[0] : null;

  return (
    <div className="flex flex-col">
      {/* Hero Section - Imagem Original no Fundo */}
      <section className="relative h-screen flex flex-col items-center justify-end pb-32 overflow-hidden">
        {/* Imagem de Fundo Totalmente Original */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={HERO_IMAGE_URL} 
            alt="Ateliê Starbright" 
            fill 
            className="object-cover" 
            priority
            unoptimized
          />
        </div>

        {/* Conteúdo posicionado para não tapar o centro da imagem */}
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-fadeUp">
          <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 inline-block rounded-none border border-primary/20 shadow-2xl">
            <h2 className="text-2xl md:text-4xl font-headline italic font-bold text-foreground mb-6">
              "O Toque de Arte que seu Look Precisa"
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog">
                <Button className="rounded-none h-14 md:h-16 px-10 md:px-14 tracking-[0.2em] uppercase font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="/sobre">
                <Button variant="outline" className="rounded-none h-14 md:h-16 px-10 md:px-14 tracking-[0.2em] uppercase font-bold text-xs border-primary text-primary hover:bg-white/40">
                  Nosso Manifesto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Curadoria */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 space-y-6 md:space-y-0 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Curadoria Recente</h2>
              <p className="text-muted-foreground max-w-md mx-auto md:mx-0 text-sm">O brilho mais atual do nosso ateliê, selecionado para elevar a sua presença.</p>
            </div>
            <Link href="/catalog">
              <Button variant="link" className="text-primary p-0 tracking-[0.2em] uppercase text-xs font-bold group">
                Ver Coleção Completa <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="animate-spin h-8 w-8 text-primary/40" />
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.map((product: any) => (
                <Link key={product.id} href={`/product/${product.id}`} className="group space-y-3 hover-lift">
                  <div className="aspect-square relative overflow-hidden bg-card/50 border border-muted/30">
                    {product.imageUrl && (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-background/90 backdrop-blur-sm p-1.5 rounded-full shadow-md">
                        <Star className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary fill-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center space-y-0.5 px-2">
                    <h3 className="text-[11px] md:text-[13px] font-headline tracking-wide font-bold truncate uppercase">{product.name}</h3>
                    <p className="text-transform md:text-xs text-primary font-bold tracking-widest">
                      €{product.isOnPromotion ? product.promotionPrice.toLocaleString() : product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 bg-muted/10 border border-dashed">
              <span className="h-8 w-8 text-muted"><Sparkles /></span>
              <p className="text-muted-foreground font-body italic">O Ateliê está a preparar a próxima curadoria...</p>
              <Link href="/admin/products">
                <Button variant="outline" size="sm" className="text-[10px] uppercase font-bold tracking-widest">Adicionar Peças</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Produto em Destaque */}
      {highlightProduct && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="relative aspect-[4/5] overflow-hidden border border-primary/20 shadow-2xl order-2 lg:order-1 bg-white">
                <Image 
                  src={highlightProduct.imageUrl} 
                  alt={highlightProduct.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left">
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-primary uppercase">Obra em Destaque</span>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold leading-tight">{highlightProduct.name}</h2>
                </div>
                <p className="text-base md:text-lg font-headline italic text-primary font-medium">"O Toque de Arte que seu Look Precisa"</p>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-4">
                  <p>{highlightProduct.description}</p>
                </div>
                <Link href={`/product/${highlightProduct.id}`}>
                  <Button className="w-full sm:w-auto rounded-none h-14 px-10 tracking-[0.2em] uppercase font-bold text-xs bg-primary hover:bg-primary/90">
                    Descobrir Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Valores da Marca */}
      <section className="py-16 md:py-24 border-t bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 text-center">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">ATEMPORALIDADE</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Enquanto a moda é passageira, o brilho do cristal é eterno. Nossas peças definem eras.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">EXCLUSIVIDADE</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Cada bolsa StarBright é numerada e feita sob encomenda, garantindo que sua peça seja única.</p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-xs md:text-sm tracking-[0.3em] font-bold text-primary">VERSATILIDADE CHIC</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Da Marina de Cascais a eventos de gala em Lisboa, a protagonista silenciosa de qualquer silhueta.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
