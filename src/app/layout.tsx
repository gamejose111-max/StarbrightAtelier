import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FirebaseClientProvider } from '@/firebase';
import { SplashLoader } from '@/components/SplashLoader';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Ateliê StarBright | A Arte de Brilhar em Cada Detalhe',
  description: 'Coleção exclusiva de bolsas de luxo esculpidas em cristal de vidro. Onde a luz encontra o design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col">
        <SplashLoader />
        <FirebaseClientProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}