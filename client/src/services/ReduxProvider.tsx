'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { setCredentials } from './authSlice';

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem('circlechain_token');
      const userStr = localStorage.getItem('circlechain_user');
      if (token) {
        const user = userStr ? JSON.parse(userStr) : undefined;
        dispatch(setCredentials({ token, user }));
      }
    } catch {
      // ignore parse error
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
