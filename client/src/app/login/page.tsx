'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  TextField,
  Alert,
  Link as MuiLink,
  Container,
  CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { setCredentials } from '../../services/authSlice';
import { useLoginMutation } from '../../services/authApi';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [loginUser, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/profile');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessInfo('Registration completed successfully! Please sign in with your credentials.');
    }
    const err = searchParams.get('error');
    if (err) {
      const decodedErr = decodeURIComponent(err);
      setError(decodedErr);
      toast.error(decodedErr);
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://cryptoapp-production-991c.up.railway.app';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessInfo('');

    if (!email.trim()) {
      const err = 'Please enter your email address.';
      setError(err);
      toast.error(err);
      return;
    }
    if (!password) {
      const err = 'Please enter your password.';
      setError(err);
      toast.error(err);
      return;
    }

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      }).unwrap();

      if (response.success && response.token) {
        dispatch(
          setCredentials({
            token: response.token,
            user: response.user,
          }),
        );
        toast.success(`Welcome back, ${response.user.name || 'User'}! Logged in successfully.`);
        router.push('/profile');
      }
    } catch (err: any) {
      const rawMsg =
        err?.data?.message ||
        err?.message ||
        'Invalid email or password. Please try again.';
      const msg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#010010',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 6,
      }}
    >
      {/* Ambient Glows */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          backgroundColor: 'rgba(115, 253, 170, 0.15)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(115, 253, 170, 0.12)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Brand Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #73FDAA 0%, rgba(115,253,170,0.2) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #73FDAA',
                  boxShadow: '0 0 20px rgba(115, 253, 170, 0.4)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#010010' }}>
                  ◆
                </Typography>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontFamily: '"Montserrat", sans-serif',
                  background: 'linear-gradient(90deg, #FFFFFF 60%, #73FDAA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Circlechain
              </Typography>
            </Box>
          </Link>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
            Sign in to access your Web3 portfolio and trading tools
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            bgcolor: 'rgba(10, 8, 25, 0.9)',
            border: '1px solid rgba(115, 253, 170, 0.2)',
            borderRadius: '24px',
            p: { xs: 3, sm: 5 },
            backdropFilter: 'blur(24px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Google SSO Button — Primary */}
          <Button
            id="google-login-btn"
            fullWidth
            variant="contained"
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.8,
              bgcolor: '#73FDAA',
              color: '#010010',
              fontWeight: 800,
              fontSize: '1.05rem',
              borderRadius: '16px',
              boxShadow: '0 4px 25px rgba(115, 253, 170, 0.4)',
              mb: 3,
              '&:hover': {
                bgcolor: '#8CFFB8',
                boxShadow: '0 8px 35px rgba(115, 253, 170, 0.6)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#808080', px: 1 }}>
              or sign in with email
            </Typography>
          </Divider>

          {successInfo && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
              {successInfo}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleEmailLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              id="login-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
              autoComplete="email"
            />
            <TextField
              id="login-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
              autoComplete="current-password"
            />

            <Button
              id="login-submit-btn"
              type="submit"
              fullWidth
              variant="outlined"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LockOutlinedIcon />}
              sx={{
                py: 1.5,
                borderRadius: '16px',
                borderColor: 'rgba(115, 253, 170, 0.4)',
                color: '#FFFFFF',
                fontWeight: 700,
                '&:hover': {
                  borderColor: '#73FDAA',
                  bgcolor: 'rgba(115, 253, 170, 0.1)',
                },
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Box>

          {/* Benefits */}
          <Box
            sx={{
              mt: 4,
              p: 2.5,
              borderRadius: '16px',
              bgcolor: 'rgba(115, 253, 170, 0.06)',
              border: '1px solid rgba(115, 253, 170, 0.12)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <AutoAwesomeIcon sx={{ fontSize: 16, color: '#73FDAA' }} />
              <Typography variant="caption" sx={{ color: '#73FDAA', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Secure Authentication
              </Typography>
            </Box>
            {[
              'Protected with salted bcrypt password hashing',
              'Fast JWT session management',
              'One-click Web3 access & wallet linking',
            ].map((benefit) => (
              <Typography key={benefit} variant="body2" sx={{ color: '#A0AEC0', mb: 0.5, display: 'flex', gap: 1 }}>
                <span style={{ color: '#73FDAA' }}>✓</span> {benefit}
              </Typography>
            ))}
          </Box>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: '#A0AEC0', mt: 3 }}
          >
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              href="/signup"
              sx={{ color: '#73FDAA', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Create one free
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default function LoginPage() {
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
      <LoginFormContent />
    </Suspense>
  );
}
