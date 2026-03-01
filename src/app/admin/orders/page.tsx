"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Check, X, Eye, Package, User, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'orders'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: orders, loading: dataLoading } = useCollection(ordersQuery);

  const handleUpdateStatus = (orderId: string, status: 'accepted' | 'cancelled') => {
    if (!firestore) return;
    const orderRef = doc(firestore, 'orders', orderId);
    updateDocumentNonBlocking(orderRef, { status });
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
            <h1 className="text-4xl font-headline font-bold">Gestão de Pedidos</h1>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-xs">Painel do Administrador | Starbright</p>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className="rounded-none px-4 py-2 border-primary text-primary">
              {orders?.length || 0} Total de Pedidos
            </Badge>
          </div>
        </div>

        <Card className="rounded-none border-none shadow-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-primary/5">
              <TableRow className="border-none">
                <TableHead className="font-bold tracking-widest text-xs uppercase">Data</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Cliente</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Produto</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Valor</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase">Status</TableHead>
                <TableHead className="font-bold tracking-widest text-xs uppercase text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order: any) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="text-xs font-medium">
                    {order.createdAt?.toDate().toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{order.customerName}</span>
                      <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{order.productName}</TableCell>
                  <TableCell className="font-bold text-primary">{order.productPrice}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={order.status === 'accepted' ? 'default' : order.status === 'cancelled' ? 'destructive' : 'outline'}
                      className="rounded-none text-[10px] uppercase font-bold tracking-wider"
                    >
                      {order.status === 'pending' ? 'Pendente' : order.status === 'accepted' ? 'Aceito' : 'Cancelado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <OrderDetailsDialog order={order} />
                      
                      {order.status === 'pending' && (
                        <>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="rounded-none h-8 w-8 text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleUpdateStatus(order.id, 'accepted')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="rounded-none h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!orders?.length && (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center text-muted-foreground italic">
                    Nenhum pedido registrado no momento.
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

function OrderDetailsDialog({ order }: { order: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-none h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl rounded-none border-primary/20">
        <DialogHeader>
          <DialogTitle className="font-headline tracking-widest text-xl">Detalhes do Pedido #{order.id.substring(0,6)}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          <div className="space-y-4">
            <h4 className="text-xs tracking-widest font-bold text-primary flex items-center gap-2">
              <User className="h-3 w-3" /> CLIENTE
            </h4>
            <div className="text-sm space-y-1">
              <p className="font-bold">{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
              <p className="text-muted-foreground">{order.customerPhone}</p>
            </div>

            <h4 className="text-xs tracking-widest font-bold text-primary pt-4 flex items-center gap-2">
              <MapPin className="h-3 w-3" /> ENDEREÇO
            </h4>
            <div className="text-sm space-y-1">
              <p>{order.address}, {order.number}</p>
              <p>{order.neighborhood} - {order.residenceType}</p>
              <p>{order.city} / {order.state}</p>
              <p className="font-mono text-xs">{order.zipCode}</p>
            </div>
          </div>

          <div className="space-y-4 border-l md:pl-8">
            <h4 className="text-xs tracking-widest font-bold text-primary flex items-center gap-2">
              <Package className="h-3 w-3" /> PRODUTO
            </h4>
            <div className="text-sm space-y-1">
              <p className="font-bold">{order.productName}</p>
              <p className="text-primary font-bold">{order.productPrice}</p>
              <p className="text-xs text-muted-foreground italic">ID: {order.productId}</p>
            </div>

            <h4 className="text-xs tracking-widest font-bold text-primary pt-4">STATUS ATUAL</h4>
            <Badge className="rounded-none uppercase text-[10px] tracking-widest font-bold">
              {order.status}
            </Badge>
            <p className="text-[10px] text-muted-foreground pt-2">
              Registrado em: {order.createdAt?.toDate().toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}