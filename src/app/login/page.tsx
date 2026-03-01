
"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin/products');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    setError(null);
    setIsLoggingIn(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error("Erro ao fazer login:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else if (err.code === 'auth/api-key-not-valid') {
        setError("Erro de configuração: Ative o método 'E-mail/Senha' no Console do Firebase.");
      } else {
        setError("Ocorreu um erro ao tentar acessar. Tente novamente.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="max-w-md w-full rounded-none border-primary/20 shadow-2xl bg-card">
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
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="rounded-none border-muted focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-none border-muted focus:border-primary"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="rounded-none border-destructive/50 bg-destructive/5 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs font-bold uppercase tracking-widest">Erro de Acesso</AlertTitle>
                <AlertDescription className="text-xs italic">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase font-bold text-xs gap-3"
            >
              {isLoggingIn ? <Loader2 className="animate-spin h-4 w-4" /> : <LogIn className="h-4 w-4" />}
              Acessar Painel
            </Button>
          </form>
          
          <p className="text-[10px] text-center text-muted-foreground mt-8 leading-relaxed italic">
            "Área protegida para curadores e administradores do Ateliê."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
