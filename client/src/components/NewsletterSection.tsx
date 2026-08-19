'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Collapse,
  Paper,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useSubscribeNewsletterMutation } from '../services/newsletterApi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();
  const [result, setResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Email address is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError('');
    setResult(null);

    try {
      const response = await subscribeNewsletter({ email: email.trim() }).unwrap();
      setResult({
        type: 'success',
        message: response.message || 'Successfully subscribed! Check your inbox.',
      });
      setEmail('');
    } catch (err: any) {
      const message =
        err?.data?.message ||
        (Array.isArray(err?.data?.message)
          ? err?.data?.message?.[0]
          : null) ||
        'Something went wrong. Please try again.';
      setResult({
        type: 'error',
        message: Array.isArray(message) ? message[0] : message,
      });
    }
  };

  return (
    <Box
      component="section"
      id="newsletter"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            borderRadius: '28px',
            border: '1px solid rgba(115, 253, 170, 0.3)',
            bgcolor: 'rgba(10, 8, 25, 0.85)',
            backdropFilter: 'blur(24px)',
            overflow: 'hidden',
            p: { xs: 4, md: 7 },
            textAlign: 'center',
            boxShadow: '5px 1px 13px 4px rgba(115, 253, 170, 0.15)',
          }}
        >
          {/* Background ambient glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              backgroundColor: 'rgba(115, 253, 170, 0.12)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-20%',
              left: '-5%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              backgroundColor: 'rgba(115, 253, 170, 0.1)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Icon */}
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '20px',
                bgcolor: 'rgba(115, 253, 170, 0.15)',
                border: '1px solid rgba(115, 253, 170, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 0 20px rgba(115, 253, 170, 0.3)',
              }}
            >
              <NotificationsActiveIcon sx={{ fontSize: 36, color: '#73FDAA' }} />
            </Box>

            {/* Title matching Figma: "Want to be aware of all update" */}
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                fontWeight: 800,
                color: '#FFFFFF',
                fontFamily: '"Montserrat", sans-serif',
                mb: 1.5,
              }}
            >
              Want to be aware of all update
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#A0AEC0',
                fontSize: '1.05rem',
                mb: 4,
                maxWidth: 520,
                mx: 'auto',
              }}
            >
              Subscribe to our newsletter and get exclusive crypto intelligence, market alerts, and Web3 insights delivered directly to your inbox.
            </Typography>

            {/* Result Alert */}
            <Collapse in={result !== null}>
              <Alert
                severity={result?.type === 'success' ? 'success' : 'error'}
                icon={
                  result?.type === 'success' ? (
                    <CheckCircleOutlinedIcon />
                  ) : (
                    <ErrorOutlinedIcon />
                  )
                }
                sx={{
                  mb: 3,
                  borderRadius: '14px',
                  bgcolor:
                    result?.type === 'success'
                      ? 'rgba(115, 253, 170, 0.12)'
                      : 'rgba(255, 92, 92, 0.12)',
                  border: `1px solid ${result?.type === 'success' ? 'rgba(115, 253, 170, 0.4)' : 'rgba(255, 92, 92, 0.4)'}`,
                  color: result?.type === 'success' ? '#73FDAA' : '#FF8080',
                  '& .MuiAlert-icon': {
                    color: result?.type === 'success' ? '#73FDAA' : '#FF8080',
                  },
                }}
              >
                {result?.message}
              </Alert>
            </Collapse>

            {/* Form: Email Input + Subscribe Button matching Figma */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              <TextField
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                  if (result) setResult(null);
                }}
                placeholder="Enter your email address"
                error={!!emailError}
                helperText={emailError}
                disabled={isLoading}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ mr: 1, color: '#73FDAA', fontSize: 20 }} />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    bgcolor: 'rgba(115, 253, 170, 0.05)',
                    border: '2px solid rgba(115, 253, 170, 0.3)',
                    color: '#FFFFFF',
                    '& fieldset': { border: 'none' },
                    '&:hover': { border: '2px solid rgba(115, 253, 170, 0.6)' },
                    '&.Mui-focused': { border: '2px solid #73FDAA' },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#808080',
                  },
                }}
              />

              <Button
                id="newsletter-subscribe-btn"
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  bgcolor: '#36FB82',
                  color: '#010010',
                  fontWeight: 800,
                  fontSize: '1rem',
                  borderRadius: '16px',
                  px: 4,
                  py: 1.5,
                  minWidth: { xs: '100%', sm: 160 },
                  boxShadow: '0 4px 20px rgba(54, 251, 130, 0.4)',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    bgcolor: '#73FDAA',
                    boxShadow: '0 8px 30px rgba(115, 253, 170, 0.55)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(115, 253, 170, 0.3)',
                    color: '#010010',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: '#010010' }} />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </Box>

            <Typography
              variant="caption"
              sx={{ color: '#808080', display: 'block', mt: 2 }}
            >
              No spam. Unsubscribe anytime. We respect your privacy.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
