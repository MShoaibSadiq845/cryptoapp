'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 24,
        right: 24,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#0B0A1C',
          color: '#FFFFFF',
          border: '1px solid rgba(115, 253, 170, 0.4)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(115, 253, 170, 0.25)',
          borderRadius: '16px',
          padding: '14px 20px',
          fontFamily: '"Montserrat", sans-serif',
          fontSize: '0.92rem',
          fontWeight: 600,
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: '#73FDAA',
            secondary: '#010010',
          },
          style: {
            border: '1px solid #73FDAA',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(115, 253, 170, 0.35)',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#FF5C5C',
            secondary: '#FFFFFF',
          },
          style: {
            border: '1px solid #FF5C5C',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 92, 92, 0.35)',
          },
        },
      }}
    />
  );
}
