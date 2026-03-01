
'use client';

import React, { useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export const FirebaseClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ReturnType<typeof initializeFirebase> | null>(null);

  useEffect(() => {
    setServices(initializeFirebase());
  }, []);

  if (!services) return null;

  return (
    <FirebaseProvider
      app={services.app}
      firestore={services.firestore}
      auth={services.auth}
    >
      {children}
    </FirebaseProvider>
  );
};
