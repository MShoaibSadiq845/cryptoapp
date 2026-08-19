'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Container, Button } from '@mui/material';

interface HeroSectionProps {
  onConnectWallet?: () => void;
}

export default function HeroSection({ onConnectWallet }: HeroSectionProps) {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        bgcolor: '#010010',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow — matches Figma green glow behind illustration */}
      <Box
        sx={{
          position: 'absolute',
          right: '-5%',
          top: '0%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(115,253,170,0.28) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 0 },
          }}
        >
          {/* LEFT: Text Content — matches Figma exactly */}
          <Box sx={{ flex: 1, pr: { md: 4 }, zIndex: 1 }}>
            {/* Heading — exact Figma text */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 800,
                fontFamily: '"Montserrat", sans-serif',
                color: '#FFFFFF',
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              Save, Buy and Sell
              <br />
              Your blockchain
              <br />
              asset
            </Typography>

            {/* Subtitle — exact Figma copy */}
            <Typography
              variant="body1"
              sx={{
                color: '#A0AEC0',
                fontSize: { xs: '0.95rem', md: '1rem' },
                lineHeight: 1.7,
                mb: 4,
                maxWidth: 380,
              }}
            >
              The easy to manage and trade
              <br />
              your cryptocurrency asset
            </Typography>

            {/* CTA Buttons — matching Figma: "Connect Wallet" outlined green + "Start Trading" dark */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                id="hero-connect-wallet-btn"
                variant="outlined"
                onClick={onConnectWallet}
                sx={{
                  borderColor: '#73FDAA',
                  color: '#73FDAA',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontFamily: '"Montserrat", sans-serif',
                  '&:hover': {
                    bgcolor: 'rgba(115,253,170,0.1)',
                    borderColor: '#73FDAA',
                  },
                }}
              >
                Connect Wallet
              </Button>
              <Button
                id="hero-start-trading-btn"
                variant="contained"
                component="a"
                href="#market-trend"
                sx={{
                  bgcolor: '#1A1A2E',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  px: 3,
                  py: 1.2,
                  textTransform: 'none',
                  fontFamily: '"Montserrat", sans-serif',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: '#252542',
                  },
                }}
              >
                Start Trading
              </Button>
            </Box>
          </Box>

          {/* RIGHT: 3D Crypto Illustration */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: { xs: 240, md: 380 },
            }}
          >
            <Image
              src="/images/2.png"
              alt="Crypto trading 3D illustration"
              width={520}
              height={420}
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 30px rgba(115,253,170,0.3))',
                animation: 'float 4s ease-in-out infinite',
                maxWidth: '100%',
                height: 'auto',
              }}
              priority
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
