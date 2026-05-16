
"use client"

import { useState, useEffect, useRef } from 'react';
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
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Edit, Trash2, Star, Tag, Upload, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = ["Bolsa de Mão", "Carteira de Mão", "Acessórios"];

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Se o arquivo for muito grande (ex: > 10MB), avisar antes mesmo de tentar processar
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito pesado",
        description: "Tente uma foto com menos de 10MB.",
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new (window as any).Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Comprimir para JPEG com 70% de qualidade para garantir que fique abaixo de 1MB
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        
        // Verificar se mesmo comprimido ainda é grande demais (raro com 1200px)
        if (dataUrl.length > 1000000) {
           toast({
            variant: "destructive",
            title: "Imagem muito grande",
            description: "Mesmo comprimida, a imagem excede o limite. Tente outra foto.",
          });
          setIsUploading(false);
          return;
        }

        setFormData({ ...formData, imageUrl: dataUrl });
        setIsUploading(false);
        toast({
          title: "Foto processada",
          description: "Imagem otimizada para o catálogo.",
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    if (!firestore) return;
    if (!formData.imageUrl) {
      toast({
        variant: "destructive",
        title: "Imagem faltante",
        description: "Por favor, adicione uma imagem para a peça.",
      });
      return;
    }

    if (!formData.name) {
      toast({
        variant: "destructive",
        title: "Nome faltante",
        description: "A peça precisa de um nome.",
      });
      return;
    }

    const data = {
      ...formData,
      price: Number(formData.price),
      promotionPrice: Number(formData.promotionPrice),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      updatedAt: serverTimestamp()
    };

    try {
      if (editingProduct) {
        const productRef = doc(firestore, 'products', editingProduct.id);
        updateDocumentNonBlocking(productRef, data);
        toast({
          title: "Peça atualizada",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        const productsCol = collection(firestore, 'products');
        addDocumentNonBlocking(productsCol, {
          ...data,
          createdAt: serverTimestamp()
        });
        toast({
          title: "Peça publicada",
          description: "A nova obra-prima já está no catálogo.",
        });
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Verifique sua conexão ou se a imagem é muito grande.",
      });
    }
  };

  const handleDelete = (id: string) => {
    if (!firestore) return;
    const productRef = doc(firestore, 'products', id);
    deleteDocumentNonBlocking(productRef);
    toast({
      title: "Peça removida",
      description: "A peça foi excluída da coleção.",
    });
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
    <div className="min-h-screen pt-24 md:pt-32 pb-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-6">
          <div className="space-y-1 md:space-y-2 text-left">
            <h1 className="text-2xl md:text-4xl font-headline font-bold text-foreground">Gestão da Coleção</h1>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">Curadoria de Peças | Starbright</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto rounded-none h-12 px-8 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-[10px] md:text-xs">
                <Plus className="h-4 w-4" /> Nova Peça
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-none overflow-y-auto max-h-[95vh] border-primary/20 p-4 md:p-6">
              <DialogHeader className="border-b pb-4">
                <DialogTitle className="font-headline tracking-[0.15em] md:tracking-[0.2em] text-xl md:text-2xl uppercase">{editingProduct ? 'Editar Obra-Prima' : 'Nova Obra-Prima'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 py-4 md:py-6">
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Imagem da Peça</Label>
                    
                    {!formData.imageUrl ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-primary/20 bg-primary/5 aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors group"
                      >
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Otimizando Foto...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 md:h-12 md:w-12 text-primary/40 group-hover:text-primary transition-colors mb-4" />
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-center px-4">Toque para escolher foto do telemóvel</p>
                            <p className="text-[9px] text-muted-foreground mt-1">A imagem será comprimida automaticamente</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="relative aspect-square border bg-white group">
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 md:gap-4">
                           <Button 
                            variant="destructive" 
                            size="sm" 
                            className="rounded-none font-bold uppercase tracking-widest text-[9px] md:text-[10px]"
                            onClick={removeImage}
                           >
                            <X className="h-3 w-3 mr-1" /> Remover
                           </Button>
                           <Button 
                            variant="secondary" 
                            size="sm" 
                            className="rounded-none font-bold uppercase tracking-widest text-[9px] md:text-[10px]"
                            onClick={() => fileInputRef.current?.click()}
                           >
                            <Edit className="h-3 w-3 mr-1" /> Trocar
                           </Button>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <CheckCircle2 className="h-6 w-6 text-green-500 fill-white" />
                        </div>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Status e Visibilidade</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between p-3 md:p-4 border bg-muted/5">
                        <div className="space-y-0.5">
                          <Label className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold"><Star className="h-3 w-3 text-primary" /> Novidade</Label>
                          <p className="text-[9px] text-muted-foreground">Exibir selo estelar</p>
                        </div>
                        <Switch checked={formData.isNew} onCheckedChange={val => setFormData({...formData, isNew: val})} />
                      </div>
                      
                      <div className="border p-3 md:p-4 space-y-4 bg-muted/5">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold"><Tag className="h-3 w-3 text-primary" /> Promoção</Label>
                            <p className="text-[9px] text-muted-foreground">Desconto visual exclusivo</p>
                          </div>
                          <Switch checked={formData.isOnPromotion} onCheckedChange={val => setFormData({...formData, isOnPromotion: val})} />
                        </div>
                        {formData.isOnPromotion && (
                          <div className="space-y-2 pt-2 animate-fadeUp">
                            <Label className="text-[9px] uppercase tracking-widest font-bold">Preço Promocional (€)</Label>
                            <Input type="number" value={formData.promotionPrice} onChange={e => setFormData({...formData, promotionPrice: Number(e.target.value)})} className="rounded-none h-10 border-primary/20" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Nome da Peça</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="rounded-none h-12 border-primary/20 font-bold" placeholder="Ex: Bolsa Celestial Gold" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Preço (€)</Label>
                      <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="rounded-none h-12 border-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Categoria</Label>
                      <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                        <SelectTrigger className="rounded-none h-12 border-primary/20">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          {CATEGORIES.map(cat => (
                            <SelectItem key={cat} value={cat} className="text-[10px] uppercase tracking-widest font-bold">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Descrição Detalhada</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-none min-h-[120px] md:min-h-[160px] border-primary/20 italic text-sm" placeholder="Descreva a inspiração..." />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-primary">Destaques (Separados por vírgula)</Label>
                    <Input value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="Feito à mão, Miçangas luxo..." className="rounded-none h-12 border-primary/20 text-sm" />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-6 border-t mt-4 flex flex-col sm:flex-row gap-4">
                <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="w-full sm:flex-1 rounded-none h-14 uppercase tracking-widest font-bold text-[10px]">Cancelar</Button>
                <Button 
                  onClick={handleSave} 
                  disabled={isUploading}
                  className="w-full sm:flex-[2] rounded-none h-14 uppercase tracking-widest font-bold text-[10px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingProduct ? 'Confirmar Atualização' : 'Publicar no Catálogo'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-none border-none shadow-2xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary/10">
                <TableRow className="border-none">
                  <TableHead className="w-20 md:w-24 px-4 md:px-6"></TableHead>
                  <TableHead className="font-bold tracking-widest text-[9px] md:text-[10px] uppercase text-primary">Obra-Prima</TableHead>
                  <TableHead className="hidden md:table-cell font-bold tracking-widest text-[10px] uppercase text-primary">Categoria</TableHead>
                  <TableHead className="font-bold tracking-widest text-[9px] md:text-[10px] uppercase text-primary">Valor</TableHead>
                  <TableHead className="hidden sm:table-cell font-bold tracking-widest text-[10px] uppercase text-primary">Selo</TableHead>
                  <TableHead className="font-bold tracking-widest text-[9px] md:text-[10px] uppercase text-primary text-right px-4 md:px-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product: any) => (
                  <TableRow key={product.id} className="hover:bg-primary/5 transition-colors border-muted/20">
                    <TableCell className="px-4 md:px-6 py-4">
                      <div className="relative h-12 w-12 md:h-16 md:w-16 border bg-muted/10 shadow-sm overflow-hidden">
                        {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-[13px] md:text-sm tracking-tight text-foreground uppercase truncate max-w-[120px] md:max-w-none">{product.name}</span>
                        <span className="text-[8px] md:text-[9px] text-muted-foreground uppercase tracking-widest font-bold italic">{product.id.substring(0, 8)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{product.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={product.isOnPromotion ? "text-[10px] md:text-xs line-through text-muted-foreground/60" : "font-bold text-primary text-xs md:text-sm"}>
                          €{product.price?.toLocaleString()}
                        </span>
                        {product.isOnPromotion && (
                          <span className="font-bold text-primary text-xs md:text-sm">€{product.promotionPrice?.toLocaleString()}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex gap-1.5">
                        {product.isNew && <Badge className="h-5 text-[8px] uppercase tracking-widest px-2 bg-primary text-primary-foreground border-none">Novo</Badge>}
                        {product.isOnPromotion && <Badge variant="secondary" className="h-5 text-[8px] uppercase tracking-widest px-2 border-none">Promo</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-4 md:px-6">
                      <div className="flex justify-end gap-1 md:gap-3">
                        <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9 hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => handleOpenDialog(product)}>
                          <Edit className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9 text-destructive hover:bg-destructive/10 transition-colors">
                              <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-none border-primary/20">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-headline uppercase tracking-widest">Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja remover esta obra-prima da coleção? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-none uppercase tracking-widest text-[10px] font-bold">Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(product.id)}
                                className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 uppercase tracking-widest text-[10px] font-bold"
                              >
                                Confirmar Exclusão
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!products?.length && !dataLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-96 text-center text-muted-foreground italic font-headline text-lg">
                      O Ateliê aguarda sua primeira curadoria.
                    </TableCell>
                  </TableRow>
                )}
                {dataLoading && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-96 text-center">
                      <Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
