'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppSelector, useAppDispatch } from '../services/store';
import { logout } from '../services/authSlice';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    window.location.href = '/login';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const navLinks = [
    { title: 'How it work', href: '#how-it-works' },
    { title: 'Blog', href: '#market-trend' },
    { title: 'Support', href: '#footer' },
  ];

  /* ── Social icon SVGs (matching Figma exactly) ── */
  const SocialIcons = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
      {/* Telegram */}
      <Tooltip title="Telegram">
        <IconButton
          component="a" href="#"
          sx={{ p: 0.5, color: '#fff', width: 36, height: 36, borderRadius: '8px', }}
        >
          <img src="/images/3.png" alt="telegram" />
        </IconButton>
      </Tooltip>
      {/* Discord */}
      <Tooltip title="Discord">
        <IconButton
          component="a" href="#"
          sx={{ p: 0.5, color: '#fff', width: 36, height: 36, borderRadius: '8px', }}
        >
          <img src="/images/4.png" alt="discord" />
        </IconButton>
      </Tooltip>
      {/* LinkedIn */}
      <Tooltip title="LinkedIn">
        <IconButton
          component="a" href="#"
          sx={{ p: 0.5, color: '#fff', width: 36, height: 36, borderRadius: '8px', }}
        >
          <img src="/images/5.png" alt="linkedin" />
        </IconButton>
      </Tooltip>
      {/* Instagram */}
      <Tooltip title="Instagram">
        <IconButton
          component="a" href="#"
          sx={{ p: 0.5, color: '#fff', width: 36, height: 36, borderRadius: '8px', }}
        >
          <img src="/images/6.png" alt="instagram" />
        </IconButton>
      </Tooltip>
      {/* Facebook */}
      <Tooltip title="Facebook">
        <IconButton
          component="a" href="#"
          sx={{ p: 0.5, color: '#fff', width: 36, height: 36, borderRadius: '8px', }}
        >
          <img src="/images/7.png" alt="facebook" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#010010',
        borderBottom: '1px solid rgba(115,253,170,0.15)',
        boxShadow: 'none',
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          px: { xs: 2, md: 5 },
          py: 1.5,
          gap: 2,
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Figma diamond/node logo SVG */}
            <img src="/images/1.png" alt="logo" width={40} height={40} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1.3rem',
            }}
          >
            Circlechain
          </Typography>
        </Link>

        {/* ── Desktop Nav Links ── */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component="a"
                href={link.href}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontFamily: '"Montserrat", sans-serif',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { color: '#73FDAA', bgcolor: 'transparent' },
                }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        )}

        {/* ── Right Side: Social Icons + Auth ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile && <SocialIcons />}

          {isAuthenticated && user ? (
            <Box>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ p: 0.5, border: '2px solid #73FDAA', borderRadius: '50%' }}
              >
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  sx={{ width: 32, height: 32, bgcolor: '#73FDAA', color: '#010010', fontSize: '0.9rem', fontWeight: 800 }}
                >
                  {user.name?.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    mt: 1.5, bgcolor: '#0B0A1C',
                    border: '1px solid rgba(115,253,170,0.25)',
                    borderRadius: '16px',
                    minWidth: 200,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#fff' }}>{user.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#73FDAA' }}>{user.email}</Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <MenuItem onClick={() => { setAnchorEl(null); router.push('/profile'); }} sx={{ '&:hover': { bgcolor: 'rgba(115,253,170,0.1)' } }}>
                  <ListItemIcon><PersonIcon fontSize="small" sx={{ color: '#73FDAA' }} /></ListItemIcon>
                  <ListItemText primary="My Profile" />
                </MenuItem>
                {user?.role === 'admin' && (
                  <MenuItem onClick={() => { setAnchorEl(null); router.push('/dashboard'); }} sx={{ '&:hover': { bgcolor: 'rgba(115,253,170,0.1)' } }}>
                    <ListItemIcon><DashboardIcon fontSize="small" sx={{ color: '#73FDAA' }} /></ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </MenuItem>
                )}
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                <MenuItem onClick={handleLogout} sx={{ color: '#FF5C5C', '&:hover': { bgcolor: 'rgba(255,92,92,0.1)' } }}>
                  <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#FF5C5C' }} /></ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              onClick={handleGoogleLogin}
              variant="contained"
              sx={{
                bgcolor: '#73FDAA',
                color: '#010010',
                fontWeight: 700,
                borderRadius: '20px',
                px: 2.5,
                py: 0.8,
                fontSize: '0.85rem',
                textTransform: 'none',
                '&:hover': { bgcolor: '#8CFFB8' },
              }}
            >
              Sign In
            </Button>
          )}

          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#73FDAA' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: '#010010', p: 3 } }}
      >
        <Typography variant="h6" sx={{ color: '#73FDAA', fontWeight: 800, mb: 3 }}>Circlechain</Typography>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <ListItemButton component="a" href={link.href} onClick={() => setMobileOpen(false)}
                sx={{ color: '#fff', borderRadius: 2, '&:hover': { color: '#73FDAA', bgcolor: 'rgba(115,253,170,0.1)' } }}
              >
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 3 }}>
          <SocialIcons />
        </Box>
      </Drawer>
    </AppBar>
  );
}
