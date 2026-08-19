'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';

export default function Footer() {
  const quickLinks = [
    { title: 'How it work', href: '#how-it-works' },
    { title: 'Blog', href: '#blog' },
    { title: 'Support', href: '#support' },
  ];

  const socialLinks = [
    { label: 'Facebook', href: '#', iconPath: '/images/7.png' },
    { label: 'Instagram', href: '#', iconPath: '/images/6.png' },
    { label: 'LinkedIn', href: '#', iconPath: '/images/5.png' },
    { label: 'Discord', href: '#', iconPath: '/images/4.png' },
    { label: 'Telegram', href: '#', iconPath: '/images/3.png' },
  ];

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        bgcolor: '#01000B',
        color: '#FFFFFF',
        pt: { xs: 5, md: 7 },
        pb: { xs: 5, md: 7 },
        position: 'relative',
        // Top glowing green border line exact target image ki tarah
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, rgba(115,253,170,0) 0%, #73FDAA 25%, #73FDAA 75%, rgba(115,253,170,0) 100%)',
          boxShadow: '0 0 12px #73FDAA',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 4 }} justifyContent="space-between" alignItems="flex-start">

          {/* 1. Circlechain Logo & Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <img src="/images/1.png" alt="Circlechain Logo" width={38} height={38} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#FFFFFF',
                  letterSpacing: '0.5px',
                }}
              >
                Circlechain
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                lineHeight: 1.4,
                maxWidth: 320,
                fontSize: '0.875rem',
              }}
            >
              Amet minim mollit non deserunt ullamco est aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniamconsequat sunt nostrud amet.
            </Typography>
          </Grid>

          {/* 2. Quick Link */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ pl: { md: 4 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#FFFFFF',
                mb: 2.5,
                fontSize: '1.35rem',
              }}
            >
              Quick Link
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
              {quickLinks.map((link) => (
                <Button
                  key={link.title}
                  component="a"
                  href={link.href}
                  disableRipple
                  sx={{
                    color: '#B0B5C0',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    p: 0,
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    minWidth: 0,
                    '&:hover': {
                      color: '#FFFFFF',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* 3. Social Media & Copyright */}
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 180,
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#FFFFFF',
                  mb: 2.5,
                  fontSize: '1.35rem',
                }}

              >
                Social Media
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2 }}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.label} title={social.label}>
                    <IconButton
                      component="a"
                      href={social.href}
                      sx={{
                        width: 36,
                        height: 36,

                        borderRadius: '8px',
                        p: 0.6,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <img
                        src={social.iconPath}
                        alt={social.label}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Box>

            {/* Bottom-right Copyright Text */}
            <Typography
              variant="body2"
              sx={{
                color: '#D0D0D0',
                fontSize: '0.85rem',
                fontWeight: 500,
                mt: { xs: 4, md: 0 },
              }}
            >
              (c) 2022 Circlechain
            </Typography>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}