'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Container } from '@mui/material';

export default function BannerSection() {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        bgcolor: '#010010',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Centered text block */}
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.6rem', md: '2.2rem' },
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            color: '#FFFFFF',
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          Global Decentralize currency based on
          <br />
          blockchain technology
        </Typography>
        {/* Green subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: '#73FDAA',
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          Web3 is the latest efficient technology
        </Typography>
      </Box>

      {/* Two-column layout: Illustration LEFT + Feature cards RIGHT */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* LEFT: Illustration */}
          <Box
            sx={{
              flex: '0 0 auto',
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Green ambient glow behind illustration */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(115,253,170,0.25) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />
            <Image
              src="/images/8.png"
              alt="Crypto blockchain robot illustration"
              width={400}
              height={400}
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                height: 'auto',
                animation: 'float 5s ease-in-out infinite',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </Box>

          {/* RIGHT: Three Feature Cards with Right-side Green Gradient */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              width: '100%',
            }}
          >
            {[
              {
                title: 'Access Token Market',
                desc: 'Buy and sell token anytime and anywhere',
              },
              {
                title: 'User Friendly Interface',
                desc: 'Easy to navigate',
              },
              {
                title: 'Ownership Token control',
                desc: 'Be in control and own as many asset as possible',
              },
            ].map((card) => (
              <Box
                key={card.title}
                sx={{
                  background: 'linear-gradient(90deg, rgba(1,0,16,0.9) 20%, rgba(115,253,170,0.22) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(115,253,170,0.3)',
                  px: { xs: 3, md: 4 },
                  py: 2.5,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    background: 'linear-gradient(90deg, rgba(1,0,16,0.85) 10%, rgba(115,253,170,0.35) 100%)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#FFFFFF',
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: 0.5,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#A0AEC0', fontSize: '0.85rem' }}
                >
                  {card.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}