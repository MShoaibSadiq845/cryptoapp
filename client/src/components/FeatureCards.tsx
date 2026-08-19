'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function FeatureCards() {
  const features = [
    {
      title: 'Access Token Market',
      subtitle: 'Buy and sell token anytime and anywhere',
      description:
        'Seamless access to global crypto liquidity pools with real-time settlement and deep market depth.',
      icon: <StorefrontIcon sx={{ fontSize: 36, color: '#010010' }} />,
      tag: 'Liquid DeFi',
    },
    {
      title: 'User Friendly Interface',
      subtitle: 'Easy to navigate',
      description:
        'Intuitive dashboard designed for both novice traders and institutional Web3 power users.',
      icon: <TouchAppIcon sx={{ fontSize: 36, color: '#010010' }} />,
      tag: 'Zero Friction',
    },
    {
      title: 'Ownership Token control',
      subtitle: 'Be in control and own as many asset as possible',
      description:
        'Non-custodial smart contract infrastructure ensuring absolute sovereignty over your private keys.',
      icon: <SecurityIcon sx={{ fontSize: 36, color: '#010010' }} />,
      tag: 'Self-Custody',
    },
  ];

  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}



      </Container>
    </Box>
  );
}
