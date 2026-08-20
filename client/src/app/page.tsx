'use client';

import React, { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BannerSection from '../components/BannerSection';
import FeatureCards from '../components/FeatureCards';
import MarketTrends from '../components/MarketTrends';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../services/store';
import { updateUserWallet } from '../services/authSlice';
import { useUpdateWalletMutation } from '../services/authApi';

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState('');
  const [manualAddressInput, setManualAddressInput] = useState('');
  const [savedInDb, setSavedInDb] = useState(false);
  const [selectedWalletName, setSelectedWalletName] = useState('');

  const [updateWalletMutation, { isLoading: isSavingWallet }] = useUpdateWalletMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [mounted, isAuthenticated]);

  if (!mounted || !isAuthenticated) return null;

  const handleConnectWallet = () => {
    const existingWallet = user?.walletAddress?.trim();

    if (existingWallet) {
      // User HAS added a wallet address -> Connect immediately and show success toast!
      setConnectedAddress(existingWallet);
      setConnected(true);
      setSavedInDb(true);
      setSelectedWalletName('Saved Wallet');
      setWalletModalOpen(true);
      toast.success(`Wallet Connected Successfully!\nAddress: ${existingWallet.substring(0, 8)}...${existingWallet.slice(-6)}`);
    } else {
      // User HAS NOT added a wallet address -> Show error toast and prompt them to add it!
      setConnected(false);
      setWalletModalOpen(true);
      toast.error('Connect Wallet Failed! Please add your wallet address first.');
    }
  };

  const handleSaveAndConnectManual = async () => {
    const addr = manualAddressInput.trim();
    if (!addr) {
      toast.error('Please enter a valid wallet address first.');
      return;
    }

    setConnecting(true);
    try {
      if (isAuthenticated && token) {
        const response = await updateWalletMutation({ walletAddress: addr }).unwrap();
        if (response.success) {
          dispatch(updateUserWallet(addr));
          setConnectedAddress(addr);
          setConnected(true);
          setSavedInDb(true);
          setSelectedWalletName('Web3 Wallet');
          toast.success(`Wallet Address Saved & Connected!\n${addr.substring(0, 8)}...${addr.slice(-6)}`);
          setManualAddressInput('');
          setTimeout(() => setWalletModalOpen(false), 2000);
        }
      }
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || 'Failed to save wallet address.';
      toast.error(msg);
    } finally {
      setConnecting(false);
    }
  };

  const doConnect = async (walletName: string) => {
    setSelectedWalletName(walletName);
    setConnecting(true);
    setConnected(false);
    setSavedInDb(false);

    let fullAddress = '';

    // Attempt real browser Metamask if available
    try {
      if (typeof window !== 'undefined' && (window as any).ethereum && walletName.includes('MetaMask')) {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          fullAddress = accounts[0];
        }
      }
    } catch (e) {
      console.warn('Real MetaMask connection cancelled/unavailable:', e);
    }

    // Check if user already had a saved wallet address
    if (!fullAddress && user?.walletAddress?.trim()) {
      fullAddress = user.walletAddress.trim();
    }

    if (!fullAddress) {
      setConnecting(false);
      toast.error(`Could not connect ${walletName}! No wallet address found. Please enter your wallet address below.`);
      return;
    }

    setConnectedAddress(fullAddress);
    dispatch(updateUserWallet(fullAddress));

    // Save to MongoDB Database
    if (isAuthenticated && token) {
      try {
        const response = await updateWalletMutation({ walletAddress: fullAddress }).unwrap();
        if (response.success) {
          setSavedInDb(true);
        }
      } catch (err) {
        console.error('Failed to save connected wallet in MongoDB:', err);
      }
    }

    setConnecting(false);
    setConnected(true);
    toast.success(`${walletName} Connected Successfully!\nAddress: ${fullAddress.substring(0, 8)}...${fullAddress.slice(-6)}`);
    setTimeout(() => {
      setWalletModalOpen(false);
    }, 2200);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#010010',
        color: '#FFFFFF',
        overflowX: 'hidden',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        '@keyframes pulse': {
          '0%': { boxShadow: '0 0 30px rgba(115,253,170,0.2)' },
          '100%': { boxShadow: '0 0 60px rgba(115,253,170,0.5)' },
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }}
    >
      <Navbar />
      <HeroSection onConnectWallet={handleConnectWallet} />
      <BannerSection />
      <FeatureCards />
      <MarketTrends />
      <NewsletterSection />
      <Footer />

      {/* Global Wallet Modal */}
      <Dialog
        open={walletModalOpen}
        onClose={() => !connecting && setWalletModalOpen(false)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: '#0B0A1C',
              border: '1px solid rgba(115,253,170,0.3)',
              borderRadius: '20px',
              p: 2,
              maxWidth: 440,
              width: '100%',
            },
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', fontWeight: 800, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: 'rgba(115, 253, 170, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AccountBalanceWalletIcon sx={{ color: '#73FDAA', fontSize: 20 }} />
          </Box>
          Connect Web3 Wallet
        </DialogTitle>

        <DialogContent sx={{ py: 2 }}>
          {connected ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <CheckCircleIcon sx={{ fontSize: 56, color: '#73FDAA', mb: 1.5 }} />
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 800 }}>
                {selectedWalletName || 'Wallet'} Connected!
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#73FDAA',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  bgcolor: 'rgba(115, 253, 170, 0.12)',
                  py: 1,
                  px: 2,
                  borderRadius: '12px',
                  display: 'inline-block',
                  mt: 1.5,
                  mb: 1.5,
                  fontSize: '0.85rem',
                }}
              >
                {connectedAddress
                  ? `${connectedAddress.substring(0, 10)}...${connectedAddress.slice(-6)}`
                  : '0x...'}
              </Typography>

              {savedInDb && (
                <Alert severity="success" sx={{ borderRadius: '12px', textAlign: 'left', mt: 1 }}>
                  Wallet address saved to MongoDB database successfully!
                </Alert>
              )}
            </Box>
          ) : connecting ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <CircularProgress sx={{ color: '#73FDAA', mb: 2 }} />
              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                Connecting to {selectedWalletName || 'Wallet'}...
              </Typography>
              <Typography variant="caption" sx={{ color: '#A0AEC0', mt: 0.5, display: 'block' }}>
                Please wait while we establish secure Web3 connection
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              {/* Option 1: Manual Wallet Address Entry */}
              <Box sx={{ p: 2, borderRadius: '14px', bgcolor: 'rgba(115, 253, 170, 0.05)', border: '1px solid rgba(115, 253, 170, 0.2)' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#73FDAA', mb: 1 }}>
                  Add / Save Wallet Address
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    placeholder="0x... (Ethereum / Solana address)"
                    value={manualAddressInput}
                    onChange={(e) => setManualAddressInput(e.target.value)}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        color: '#FFFFFF',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        '& fieldset': { borderColor: 'rgba(115, 253, 170, 0.3)' },
                        '&:hover fieldset': { borderColor: '#73FDAA' },
                        '&.Mui-focused fieldset': { borderColor: '#73FDAA' },
                      },
                    }}
                  />
                  <Button
                    onClick={handleSaveAndConnectManual}
                    disabled={!manualAddressInput.trim() || isSavingWallet}
                    variant="contained"
                    startIcon={isSavingWallet ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                    sx={{
                      bgcolor: '#73FDAA',
                      color: '#010010',
                      fontWeight: 800,
                      borderRadius: '10px',
                      whiteSpace: 'nowrap',
                      px: 2,
                      '&:hover': { bgcolor: '#8CFFB8' },
                    }}
                  >
                    Save & Connect
                  </Button>
                </Box>
              </Box>

              <Typography variant="caption" sx={{ color: '#808080', textAlign: 'center' }}>
                — OR CONNECT EXTENSION —
              </Typography>

              {/* Option 2: Browser Providers */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'MetaMask', icon: '🦊' },
                  { name: 'Phantom', icon: '👻' },
                  { name: 'WalletConnect', icon: '🔗' },
                ].map((w) => (
                  <Button
                    key={w.name}
                    onClick={() => doConnect(w.name)}
                    variant="outlined"
                    sx={{
                      justifyContent: 'flex-start',
                      px: 3,
                      py: 1.5,
                      borderRadius: '14px',
                      borderColor: 'rgba(115,253,170,0.3)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#73FDAA',
                        bgcolor: 'rgba(115,253,170,0.12)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <span style={{ fontSize: '1.3rem', marginRight: '12px' }}>{w.icon}</span>
                    {w.name}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={() => setWalletModalOpen(false)}
            disabled={connecting}
            sx={{ color: '#A0AEC0', fontWeight: 600 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

