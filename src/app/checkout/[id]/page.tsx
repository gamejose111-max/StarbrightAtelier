
"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShoppingBag, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, serverTimestamp, doc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import Link from 'next/link';

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const firestore = useFirestore();
  
  const [fetchingCep, setFetchingCep] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Buscar produto real do Firestore
  const productDocRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'products', id as string);
  }, [firestore, id]);

  const { data: product, loading: productLoading } = useDoc(productDocRef);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    number: '',
    residenceType: 'Casa'
  });

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length < 5) return;

    setFetchingCep(true);
    try {
      // Nota: ViaCEP funciona apenas para CEPs brasileiros. 
      // Para Portugal, seria necessário outra API, mas manteremos o suporte genérico.
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro || prev.address,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setFetchingCep(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !product) return;

    const finalPrice = product.isOnPromotion ? product.promotionPrice : product.price;

    const ordersCol = collection(firestore, 'orders');
    addDocumentNonBlocking(ordersCol, {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      zipCode: formData.cep,
      address: formData.address,
      neighborhood: formData.neighborhood,
      city: formData.city,
      state: formData.state,
      number: formData.number,
      residenceType: formData.residenceType,
      productId: product.id,
      productName: product.name,
      productPrice: `€${finalPrice.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    
    setSubmitted(true);
  };

  if (productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product && !productLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-headline font-bold">Peça Não Encontrada</h1>
        <p className="text-muted-foreground mb-8">Não foi possível carregar os detalhes desta obra-prima.</p>
        <Link href="/catalog">
          <Button variant="outline" className="rounded-none">Voltar ao Catálogo</Button>
        </Link>
      </div>
    );
  }

  const displayPrice = product?.isOnPromotion ? product.promotionPrice : product?.price;
  const formattedPrice = displayPrice?.toLocaleString('pt-PT', { minimumFractionDigits: 2 });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-32">
        <div className="text-center space-y-6 animate-fadeUp max-w-md px-4">
          <CheckCircle2 className="h-20 w-20 text-primary mx-auto" />
          <h1 className="text-3xl font-headline font-bold">Pedido Enviado com Sucesso!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Obrigado por escolher o Ateliê Starbright. Seu pedido está em análise por nossa equipe e você receberá uma confirmação em breve no e-mail <strong>{formData.email}</strong>.
          </p>
          <Button onClick={() => router.push('/')} className="w-full rounded-none tracking-widest uppercase font-bold">
            Voltar para a Loja
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-3xl font-headline font-bold mb-8">Finalizar Compra</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="rounded-none border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-headline tracking-widest flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" /> Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="rounded-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone / WhatsApp</Label>
                    <Input id="phone" required placeholder="+351 000 000 000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-none" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-none border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-headline tracking-widest flex items-center gap-2">
                    <MapPin className="h-5 w-5" /> Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">Código Postal / CEP</Label>
                      <div className="relative">
                        <Input 
                          id="cep" 
                          required 
                          placeholder="0000-000" 
                          value={formData.cep} 
                          onChange={e => setFormData({...formData, cep: e.target.value})}
                          onBlur={handleCepBlur}
                          className="rounded-none" 
                        />
                        {fetchingCep && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Tipo de Residência</Label>
                      <RadioGroup defaultValue="Casa" className="flex gap-4 pt-2" onValueChange={val => setFormData({...formData, residenceType: val})}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Casa" id="casa" />
                          <Label htmlFor="casa" className="font-normal">Casa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Apartamento" id="apto" />
                          <Label htmlFor="apto" className="font-normal">Apartamento</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número / Porta</Label>
                      <Input id="number" required value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} className="rounded-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro / Freguesia</Label>
                      <Input id="neighborhood" required value={formData.neighborhood} onChange={e => setFormData({...formData, neighborhood: e.target.value})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado / Distrito</Label>
                      <Input id="state" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="rounded-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full h-16 rounded-none bg-primary text-primary-foreground text-lg tracking-[0.2em] uppercase font-bold hover:bg-primary/90">
                Confirmar Pedido
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <Card className="rounded-none border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-headline tracking-widest">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 border overflow-hidden">
                      {product?.imageUrl && (
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-sm tracking-tight">{product?.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Edição Estelar</p>
                      <p className="font-bold text-primary pt-2">€{formattedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>€{formattedPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envio</span>
                      <span className="text-primary font-bold">Gratuito</span>
                    </div>
                    <div className="flex justify-between border-t pt-4 font-bold text-lg">
                      <span>Total</span>
                      <span>€{formattedPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-6 bg-white border-l-4 border-primary italic text-sm text-muted-foreground">
                "Este pedido será enviado para aprovação do Ateliê. Você receberá uma notificação assim que confirmarmos a disponibilidade da peça exclusiva."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
