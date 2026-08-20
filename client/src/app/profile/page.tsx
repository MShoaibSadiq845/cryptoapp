'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Divider,
  LinearProgress,
  TextField,
  Alert,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast from 'react-hot-toast';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { logout, updateUserWallet, updateUserPicture } from '../../services/authSlice';
import {
  useGetProfileQuery,
  useUpdateWalletMutation,
  useUpdatePictureMutation,
} from '../../services/authApi';

function ProfileContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth);
  const [copied, setCopied] = useState(false);
  const [walletInput, setWalletInput] = useState('');
  const [walletSaved, setWalletSaved] = useState(false);
  const [walletError, setWalletError] = useState('');
  const [pictureSaved, setPictureSaved] = useState(false);
  const [pictureError, setPictureError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // RTK Query: fetch fresh profile from backend
  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !mounted || !isAuthenticated || !token,
  });

  const [updateWalletMutation, { isLoading: isUpdatingWallet }] = useUpdateWalletMutation();
  const [updatePictureMutation, { isLoading: isUpdatingPicture }] = useUpdatePictureMutation();

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, router]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      const err = 'Please select a valid image file (PNG, JPG, JPEG, WEBP).';
      setPictureError(err);
      toast.error(err);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const err = 'Image size must be less than 5MB.';
      setPictureError(err);
      toast.error(err);
      return;
    }

    setPictureError('');
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const response = await updatePictureMutation({ picture: base64 }).unwrap();
        if (response.success) {
          dispatch(updateUserPicture(base64));
          setPictureSaved(true);
          toast.success('Profile photo updated successfully!');
          setTimeout(() => setPictureSaved(false), 4000);
        }
      } catch (err: any) {
        const errMsg = err?.data?.message || err?.message || 'Failed to update profile picture in database.';
        setPictureError(errMsg);
        toast.error(errMsg);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  if (!mounted) {
    return (
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
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const displayUser = profileData?.user || user;

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully!');
    window.location.href = '/login';
  };

  const handleCopyWallet = () => {
    if (displayUser?.walletAddress) {
      navigator.clipboard.writeText(displayUser.walletAddress);
      setCopied(true);
      toast.success('Wallet address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveWallet = async () => {
    if (walletInput.trim()) {
      setWalletError('');
      try {
        const response = await updateWalletMutation({
          walletAddress: walletInput.trim(),
        }).unwrap();

        if (response.success) {
          dispatch(updateUserWallet(walletInput.trim()));
          setWalletSaved(true);
          toast.success('Wallet address saved to database successfully!');
          setWalletInput('');
          setTimeout(() => setWalletSaved(false), 4000);
        }
      } catch (err: any) {
        const errMsg = err?.data?.message || err?.message || 'Failed to save wallet in database.';
        setWalletError(errMsg);
        toast.error(errMsg);
      }
    }
  };

  const profileCompletion = [
    !!displayUser?.name,
    !!displayUser?.email,
    !!displayUser?.picture,
    !!displayUser?.walletAddress,
  ].filter(Boolean).length * 25;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#010010', pb: 8 }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'rgba(10, 8, 25, 0.9)',
          borderBottom: '1px solid rgba(115, 253, 170, 0.15)',
          backdropFilter: 'blur(20px)',
          py: 2,
          px: { xs: 2, md: 6 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#A0AEC0', '&:hover': { color: '#73FDAA' } }}
          >
            Home
          </Button>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: '"Montserrat", sans-serif',
              background: 'linear-gradient(90deg, #FFFFFF 60%, #73FDAA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ◆ Circlechain
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {displayUser?.role === 'admin' && (
            <Button
              component={Link}
              href="/dashboard"
              startIcon={<DashboardIcon />}
              variant="outlined"
              sx={{
                borderColor: 'rgba(115, 253, 170, 0.4)',
                color: '#73FDAA',
                borderRadius: '20px',
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Dashboard
            </Button>
          )}
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            variant="outlined"
            sx={{ borderColor: 'rgba(255,92,92,0.4)', color: '#FF8080', borderRadius: '20px' }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          {/* Left: Profile Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                borderRadius: '24px',
                background: 'linear-gradient(180deg, rgba(115,253,170,0.12) 0%, rgba(10,8,25,0.9) 100%)',
                border: '1px solid rgba(115, 253, 170, 0.25)',
                textAlign: 'center',
                p: 4,
                position: 'sticky',
                top: 16,
              }}
            >
              {/* Hidden File Input for Picture Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                style={{ display: 'none' }}
              />

              {/* Avatar with Upload Capability */}
              <Tooltip title="Click to upload profile photo" arrow>
                <Box
                  onClick={handleAvatarClick}
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    mb: 1.5,
                    cursor: 'pointer',
                    borderRadius: '50%',
                    '&:hover .avatar-hover-overlay': {
                      opacity: 1,
                    },
                    '&:hover .camera-badge': {
                      transform: 'scale(1.15)',
                    },
                  }}
                >
                  <Avatar
                    src={displayUser?.picture}
                    alt={displayUser?.name}
                    sx={{
                      width: 108,
                      height: 108,
                      bgcolor: '#73FDAA',
                      color: '#010010',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      border: '4px solid #73FDAA',
                      boxShadow: '0 0 25px rgba(115, 253, 170, 0.5)',
                      mx: 'auto',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {displayUser?.name?.charAt(0) || 'U'}
                  </Avatar>

                  {/* Loading Spinner or Hover Overlay */}
                  {isUpdatingPicture ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 108,
                        height: 108,
                        borderRadius: '50%',
                        bgcolor: 'rgba(1, 0, 16, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                      }}
                    >
                      <CircularProgress size={32} sx={{ color: '#73FDAA' }} />
                    </Box>
                  ) : (
                    <Box
                      className="avatar-hover-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 108,
                        height: 108,
                        borderRadius: '50%',
                        bgcolor: 'rgba(1, 0, 16, 0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                        zIndex: 2,
                      }}
                    >
                      <CameraAltIcon sx={{ color: '#73FDAA', fontSize: 28, mb: 0.5 }} />
                      <Typography variant="caption" sx={{ color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 700 }}>
                        Upload
                      </Typography>
                    </Box>
                  )}

                  {/* Camera / Provider badge */}
                  <Box
                    className="camera-badge"
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      bgcolor: '#73FDAA',
                      border: '3px solid #010010',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      transition: 'transform 0.2s ease',
                      zIndex: 3,
                    }}
                  >
                    {displayUser?.provider === 'google' && !displayUser?.picture?.startsWith('data:') ? (
                      <GoogleIcon sx={{ fontSize: 13, color: '#010010' }} />
                    ) : (
                      <CameraAltIcon sx={{ fontSize: 14, color: '#010010' }} />
                    )}
                  </Box>
                </Box>
              </Tooltip>

              <Typography
                variant="caption"
                onClick={handleAvatarClick}
                sx={{
                  display: 'block',
                  color: '#73FDAA',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  mb: 1.5,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Change Photo
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
                {displayUser?.name || 'Web3 User'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#73FDAA', mb: 1 }}>
                {displayUser?.email}
              </Typography>

              <Chip
                label={displayUser?.provider === 'google' ? 'Verified Google Account' : 'Verified Web3 Account'}
                icon={<CheckCircleIcon sx={{ fontSize: '16px !important', color: '#010010 !important' }} />}
                sx={{
                  bgcolor: '#73FDAA',
                  color: '#010010',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  mb: 3,
                }}
              />

              {/* Profile Completion */}
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 600 }}>
                    Profile Completion
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#73FDAA', fontWeight: 800 }}>
                    {profileCompletion}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  sx={{
                    borderRadius: '8px',
                    height: 8,
                    bgcolor: 'rgba(115, 253, 170, 0.12)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#73FDAA',
                      borderRadius: '8px',
                    },
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  borderColor: 'rgba(255, 92, 92, 0.4)',
                  color: '#FF8080',
                  borderRadius: '16px',
                  '&:hover': { bgcolor: 'rgba(255, 92, 92, 0.1)', borderColor: '#FF8080' },
                }}
              >
                Sign Out
              </Button>
            </Card>
          </Grid>

          {/* Right: Details */}
          <Grid size={{ xs: 12, md: 8 }}>
            {pictureSaved && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: '14px' }}>
                Profile photo uploaded and updated in database successfully!
              </Alert>
            )}

            {pictureError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '14px' }}>
                {pictureError}
              </Alert>
            )}

            {walletSaved && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: '14px' }}>
                Wallet address updated and saved to database successfully!
              </Alert>
            )}

            {walletError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '14px' }}>
                {walletError}
              </Alert>
            )}

            {/* Account Info Card */}
            <Card
              sx={{
                borderRadius: '20px',
                border: '1px solid rgba(115, 253, 170, 0.2)',
                bgcolor: 'rgba(10, 8, 25, 0.8)',
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: '#FFFFFF', mb: 3 }}
                >
                  Account Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'rgba(115, 253, 170, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <PersonIcon sx={{ color: '#73FDAA' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#808080', display: 'block' }}>
                          Full Name
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                          {displayUser?.name || '—'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'rgba(115, 253, 170, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <EmailIcon sx={{ color: '#73FDAA' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#808080', display: 'block' }}>
                          Email Address
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                          {displayUser?.email || '—'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'rgba(115, 253, 170, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <GoogleIcon sx={{ color: '#73FDAA' }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#808080', display: 'block' }}>
                          Authentication
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#73FDAA' }}>
                          {displayUser?.provider === 'google' ? 'Google SSO' : 'Email & Password'}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          bgcolor: 'rgba(115, 253, 170, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AccountBalanceWalletIcon sx={{ color: '#73FDAA' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: '#808080', display: 'block' }}>
                          Wallet Address
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: '#FFFFFF',
                              fontFamily: 'monospace',
                              fontSize: '0.8rem',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              maxWidth: 160,
                            }}
                          >
                            {displayUser?.walletAddress
                              ? `${displayUser.walletAddress.substring(0, 10)}...${displayUser.walletAddress.slice(-6)}`
                              : 'Not connected'}
                          </Typography>
                          {displayUser?.walletAddress && (
                            <Tooltip title={copied ? 'Copied!' : 'Copy address'}>
                              <IconButton
                                size="small"
                                onClick={handleCopyWallet}
                                sx={{ color: '#73FDAA' }}
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Wallet Management */}
            <Card
              sx={{
                borderRadius: '20px',
                border: '1px solid rgba(115, 253, 170, 0.2)',
                bgcolor: 'rgba(10, 8, 25, 0.8)',
                mb: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 3 }}>
                  Wallet Management
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    id="wallet-address-input"
                    placeholder="Enter your Ethereum / Solana wallet address"
                    value={walletInput}
                    onChange={(e) => setWalletInput(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '14px',
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        color: '#FFFFFF',
                        fontFamily: 'monospace',
                        '& fieldset': {
                          borderColor: 'rgba(115, 253, 170, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#73FDAA',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#73FDAA',
                          boxShadow: '0 0 10px rgba(115, 253, 170, 0.3)',
                        },
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#A0AEC0',
                        opacity: 0.8,
                        fontSize: '0.88rem',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSaveWallet}
                    disabled={!walletInput.trim() || isUpdatingWallet}
                    startIcon={isUpdatingWallet ? <CircularProgress size={18} color="inherit" /> : null}
                    sx={{
                      bgcolor: '#73FDAA',
                      color: '#010010',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      borderRadius: '14px',
                      whiteSpace: 'nowrap',
                      px: 3.5,
                      py: 1,
                      boxShadow: '0 0 15px rgba(115, 253, 170, 0.4)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        bgcolor: '#8CFFB8',
                        boxShadow: '0 0 25px rgba(115, 253, 170, 0.7)',
                        transform: 'scale(1.02)',
                      },
                      '&.Mui-disabled': {
                        bgcolor: 'rgba(115, 253, 170, 0.15)',
                        color: 'rgba(255, 255, 255, 0.35)',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    {isUpdatingWallet ? 'Saving...' : 'Save Wallet'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card
              sx={{
                borderRadius: '20px',
                border: '1px solid rgba(115, 253, 170, 0.2)',
                bgcolor: 'rgba(10, 8, 25, 0.8)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 3 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {[

                    { label: 'Trade Markets', href: '/#market-trend', icon: <AccountBalanceWalletIcon /> },
                    { label: 'Go to Homepage', href: '/', icon: <ArrowBackIcon /> },
                  ].map((action) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={action.label}>
                      <Button
                        component={Link}
                        href={action.href}
                        fullWidth
                        variant="outlined"
                        startIcon={action.icon}
                        sx={{
                          py: 1.5,
                          borderRadius: '14px',
                          borderColor: 'rgba(115, 253, 170, 0.3)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#73FDAA',
                            bgcolor: 'rgba(115, 253, 170, 0.1)',
                            color: '#73FDAA',
                          },
                        }}
                      >
                        {action.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function ProfilePage() {
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
      <ProfileContent />
    </Suspense>
  );
}

