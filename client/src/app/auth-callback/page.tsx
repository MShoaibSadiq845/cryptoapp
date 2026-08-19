'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch } from '../../services/store';
import { setCredentials } from '../../services/authSlice';
import { UserProfile } from '../../services/authSlice';

function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const picture = searchParams.get('picture');

    if (token && email) {
      const user: UserProfile = {
        _id: id || undefined,
        email: decodeURIComponent(email),
        name: decodeURIComponent(name || ''),
        picture: decodeURIComponent(picture || ''),
        provider: 'google',
      };

      dispatch(setCredentials({ token, user }));

      // Redirect to profile / dashboard
      setTimeout(() => {
        router.replace('/profile');
      }, 800);
    } else {
      // No token – redirect to login
      router.replace('/login?error=auth_failed');
    }
  }, [searchParams, dispatch, router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#010010',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #73FDAA 0%, rgba(115,253,170,0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #73FDAA',
          boxShadow: '0 0 30px rgba(115, 253, 170, 0.5)',
          mb: 1,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#010010' }}>
          ◆
        </Typography>
      </Box>

      <CircularProgress
        size={50}
        thickness={4}
        sx={{ color: '#73FDAA' }}
      />

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: '#FFFFFF', fontFamily: '"Montserrat", sans-serif' }}
      >
        Authenticating...
      </Typography>
      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
        Verifying your Google account with Circlechain
      </Typography>
    </Box>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: '#010010',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#73FDAA' }} />
        </Box>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
