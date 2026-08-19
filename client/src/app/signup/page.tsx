'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  TextField,
  Container,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '../../services/store';
import { useRegisterMutation } from '../../services/authApi';

function SignupContent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.replace('/profile');
    }
  }, [mounted, isAuthenticated, router]);

  const handleGoogleSignup = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://cryptoapp-production-991c.up.railway.app';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!fullName) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await registerUser({
        name: fullName,
        email: email.trim(),
        password,
      }).unwrap();

      if (response.success) {
        setSuccessMsg('Account created successfully! Redirecting to login page...');
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 1200);
      }
    } catch (err: any) {
      const msg =
        err?.data?.message ||
        err?.message ||
        'Registration failed. Please check your details and try again.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
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
          top: '15%',
          right: '5%',
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
          bottom: '5%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: 'rgba(115, 253, 170, 0.1)',
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
            Create your account
          </Typography>
          <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
            Join 1.4M+ traders on the world's premier Web3 platform
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
          {/* Steps Preview */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mb: 4,
            }}
          >
            {[
              { step: '1', label: 'Sign Up' },
              { step: '2', label: 'Connect Wallet' },
              { step: '3', label: 'Start Trading' },
            ].map((item, i) => (
              <Box key={item.step} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: i === 0 ? '#73FDAA' : 'rgba(115, 253, 170, 0.15)',
                    border: '2px solid rgba(115, 253, 170, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 800, color: i === 0 ? '#010010' : '#73FDAA' }}
                  >
                    {item.step}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: i === 0 ? '#FFFFFF' : '#A0AEC0', fontWeight: 600 }}>
                  {item.label}
                </Typography>
                {i < 2 && (
                  <Box sx={{ width: 20, height: 1, bgcolor: 'rgba(115, 253, 170, 0.2)', ml: 0.5 }} />
                )}
              </Box>
            ))}
          </Box>

          {/* Google Signup Button */}
          <Button
            id="google-signup-btn"
            fullWidth
            variant="contained"
            onClick={handleGoogleSignup}
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
            Sign up with Google
          </Button>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#808080', px: 1 }}>
              or create with email
            </Typography>
          </Divider>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
              {successMsg}
            </Alert>
          )}

          {/* Email Signup Form */}
          <Box
            component="form"
            onSubmit={handleSignupSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                id="signup-firstname"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
                variant="outlined"
                autoComplete="given-name"
              />
              <TextField
                id="signup-lastname"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                variant="outlined"
                autoComplete="family-name"
              />
            </Box>
            <TextField
              id="signup-email"
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
              id="signup-password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
              autoComplete="new-password"
              helperText="Minimum 6 characters"
            />

            <Button
              id="signup-submit-btn"
              type="submit"
              fullWidth
              variant="outlined"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <RocketLaunchIcon />}
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Box>

          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'center', color: '#808080', mt: 2.5 }}
          >
            By creating an account, you agree to our{' '}
            <MuiLink href="#" sx={{ color: '#73FDAA' }}>
              Terms of Service
            </MuiLink>{' '}
            and{' '}
            <MuiLink href="#" sx={{ color: '#73FDAA' }}>
              Privacy Policy
            </MuiLink>
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: '#A0AEC0', mt: 2 }}
          >
            Already have an account?{' '}
            <MuiLink
              component={Link}
              href="/login"
              sx={{ color: '#73FDAA', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Sign In
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default function SignupPage() {
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
      <SignupContent />
    </Suspense>
  );
}

