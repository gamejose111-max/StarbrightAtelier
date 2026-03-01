
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin/products');
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="max-w-md w-full rounded-none border-primary/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="font-headline tracking-widest text-2xl uppercase">Acesso Restrito</CardTitle>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">Ateliê Starbright | Administração</p>
        </CardHeader>
        <CardContent className="pt-6">
          <Button 
            onClick={handleLogin} 
            className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase font-bold text-xs gap-3"
          >
            <LogIn className="h-4 w-4" /> Entrar com Google
          </Button>
          <p className="text-[10px] text-center text-muted-foreground mt-8 leading-relaxed italic">
            "Área protegida para curadores e administradores do Ateliê."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
