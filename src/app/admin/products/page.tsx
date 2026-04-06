
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Plus, Edit, Trash2, Star, Tag, ImageIcon, Check } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CATEGORIES = ["Bolsa de Mão", "Carteira de Mão", "Acessórios"];

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: products, loading: dataLoading } = useCollection(productsQuery);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const emptyForm = {
    name: '',
    price: 0,
    description: '',
    category: 'Bolsa de Mão',
    imageUrl: '',
    isNew: true,
    isOnPromotion: false,
    promotionPrice: 0,
    features: ''
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleOpenDialog = (product?: any) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        features: product.features?.join(', ') || ''
      });
    } else {
      setEditingProduct(null);
      setFormData(emptyForm);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!firestore) return;

    const data = {
      ...formData,
      price: Number(formData.price),
      promotionPrice: Number(formData.promotionPrice),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      updatedAt: serverTimestamp()
    };

    if (editingProduct) {
      const productRef = doc(firestore, 'products', editingProduct.id);
      updateDocumentNonBlocking(productRef, data);
    } else {
      const productsCol = collection(firestore, 'products');
      addDocumentNonBlocking(productsCol, {
        ...data,
        createdAt: serverTimestamp()
      });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!firestore || !confirm('Tem certeza que deseja excluir esta peça?')) return;
    const productRef = doc(firestore, 'products', id);
    deleteDocumentNonBlocking(productRef);
  };

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-32 pb-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold">Gestão da Coleção</h1>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs">Curadoria de Peças | Starbright</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="rounded-none h-12 px-6 gap-2">
                <Plus className="h-4 w-4" /> Nova Peça
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-none overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className="font-headline tracking-widest">{editingProduct ? 'Editar Peça' : 'Cadastrar Nova Peça'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold">Nome da Peça</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest font-bold">Preço (€)</Label>
                      <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-widest font-bold">Categoria</Label>
                      <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                        <SelectTrigger className="rounded-none">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                      <ImageIcon className="h-3 w-3" /> Selecionar Imagem da Galeria
                    </Label>
                    <div className="border border-muted p-4 bg-muted/5">
                      <ScrollArea className="h-[200px] pr-4">
                        <div className="grid grid-cols-3 gap-3">
                          {PlaceHolderImages.filter(img => img.id.includes('bag')).map((img) => (
                            <button
                              key={img.id}
                              onClick={() => setFormData({...formData, imageUrl: img.imageUrl})}
                              className={cn(
                                "relative aspect-square border-2 transition-all group overflow-hidden",
                                formData.imageUrl === img.imageUrl ? "border-primary" : "border-transparent hover:border-primary/50"
                              )}
                            >
                              <Image src={img.imageUrl} alt={img.description} fill className="object-cover" />
                              {formData.imageUrl === img.imageUrl && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                  <Check className="h-6 w-6 text-primary drop-shadow-md" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </ScrollArea>
                      {formData.imageUrl && (
                        <div className="mt-4 flex items-center gap-4 p-2 border bg-white">
                          <div className="relative h-12 w-12 shrink-0">
                            <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Imagem selecionada com sucesso</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between space-x-2 border p-4 bg-white">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold"><Star className="h-3 w-3 text-primary" /> Novidade</Label>
                        <p className="text-[10px] text-muted-foreground">Exibir selo de lançamento</p>
                      </div>
                      <Switch checked={formData.isNew} onCheckedChange={val => setFormData({...formData, isNew: val})} />
                    </div>
                    
                    <div className="border p-4 space-y-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold"><Tag className="h-3 w-3 text-primary" /> Promoção</Label>
                          <p className="text-[10px] text-muted-foreground">Aplicar desconto visual</p>
                        </div>
                        <Switch checked={formData.isOnPromotion} onCheckedChange={val => setFormData({...formData, isOnPromotion: val})} />
                      </div>
                      {formData.isOnPromotion && (
                        <div className="space-y-2 animate-fadeUp">
                          <Label className="text-[10px] uppercase tracking-widest font-bold">Preço Promocional (€)</Label>
                          <Input type="number" value={formData.promotionPrice} onChange={e => setFormData({...formData, promotionPrice: Number(e.target.value)})} className="rounded-none h-9" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold">Descrição</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-none min-h-[120px]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest font-bold">Destaques (separados por vírgula)</Label>
                    <Input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="Feito à mão, Couro premium..." className="rounded-none" />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-6 border-t mt-4">
                <Button onClick={handleSave} className="w-full rounded-none h-14 uppercase tracking-[0.2em] font-bold text-xs">
                  {editingProduct ? 'Confirmar Atualização' : 'Publicar Obra-Prima'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-none border-none shadow-xl overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="border-none">
                <TableHead className="w-20"></TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Peça</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Categoria</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Preço</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Status</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product: any) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors border-muted/20">
                  <TableCell>
                    <div className="relative h-14 w-14 border bg-muted/10">
                      {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight">{product.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{product.id.substring(0, 8)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[10px] uppercase tracking-widest font-medium text-muted-foreground">{product.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={product.isOnPromotion ? "text-xs line-through text-muted-foreground" : "font-bold text-primary"}>
                        €{product.price.toLocaleString()}
                      </span>
                      {product.isOnPromotion && (
                        <span className="font-bold text-primary">€{product.promotionPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {product.isNew && <Badge className="h-5 text-[8px] uppercase tracking-widest px-1.5">Novo</Badge>}
                      {product.isOnPromotion && <Badge variant="secondary" className="h-5 text-[8px] uppercase tracking-widest px-1.5">Promo</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="outline" className="rounded-none h-9 w-9 border-muted" onClick={() => handleOpenDialog(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="rounded-none h-9 w-9 text-destructive border-destructive/10 hover:bg-destructive/10" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!products?.length && (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center text-muted-foreground italic">
                    Nenhuma peça cadastrada. Adicione sua primeira obra-prima.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
