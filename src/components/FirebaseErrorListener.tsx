
'use client';

import { useState, useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Escuta erros de permissão e só os lança em ambiente de desenvolvimento.
 */
export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // Apenas logar o erro, não crashar o site em produção
      if (process.env.NODE_ENV === 'development') {
        setError(error);
      } else {
        console.error('Firestore Permission Error:', error.message);
      }
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (error && process.env.NODE_ENV === 'development') {
    throw error;
  }

  return null;
}
