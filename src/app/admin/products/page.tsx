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
import { Loader2, Plus, Edit, Trash2, Star, Tag } from 'lucide-react';
import Image from 'next/image';

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
            <DialogContent className="max-w-2xl rounded-none">
              <DialogHeader>
                <DialogTitle className="font-headline tracking-widest">{editingProduct ? 'Editar Peça' : 'Cadastrar Nova Peça'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nome da Peça</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preço (€)</Label>
                      <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
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
                  <div className="space-y-2">
                    <Label>URL da Imagem</Label>
                    <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="rounded-none" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2 border p-3">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2"><Star className="h-3 w-3 text-primary" /> Novidade</Label>
                      <p className="text-[10px] text-muted-foreground">Exibir selo de lançamento</p>
                    </div>
                    <Switch checked={formData.isNew} onCheckedChange={val => setFormData({...formData, isNew: val})} />
                  </div>
                  <div className="border p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center gap-2"><Tag className="h-3 w-3 text-primary" /> Promoção</Label>
                        <p className="text-[10px] text-muted-foreground">Aplicar desconto visual</p>
                      </div>
                      <Switch checked={formData.isOnPromotion} onCheckedChange={val => setFormData({...formData, isOnPromotion: val})} />
                    </div>
                    {formData.isOnPromotion && (
                      <div className="space-y-2">
                        <Label>Preço Promocional (€)</Label>
                        <Input type="number" value={formData.promotionPrice} onChange={e => setFormData({...formData, promotionPrice: Number(e.target.value)})} className="rounded-none h-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-none min-h-[80px]" />
                  </div>
                  <div className="space-y-2">
                    <Label>Destaques (separados por vírgula)</Label>
                    <Input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="Feito à mão, Couro premium..." className="rounded-none" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSave} className="w-full rounded-none h-12 uppercase tracking-widest font-bold">Salvar Alterações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-none border-none shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="border-none">
                <TableHead className="w-20"></TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Peça</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Categoria</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Preço</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Destaques</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product: any) => (
                <TableRow key={product.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="relative h-12 w-12 border bg-white">
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{product.name}</span>
                      <div className="flex gap-1 mt-1">
                        {product.isNew && <Badge className="h-4 text-[8px] uppercase px-1">Novo</Badge>}
                        {product.isOnPromotion && <Badge variant="secondary" className="h-4 text-[8px] uppercase px-1">Promo</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs uppercase tracking-wider">{product.category}</TableCell>
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
                  <TableCell className="text-xs text-muted-foreground">
                    {product.features?.slice(0, 2).join(', ')}...
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="outline" className="rounded-none h-8 w-8" onClick={() => handleOpenDialog(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="rounded-none h-8 w-8 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleDelete(product.id)}>
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