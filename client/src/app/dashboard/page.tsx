'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Divider,
  Avatar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { logout, setCredentials } from '../../services/authSlice';

interface DbUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
  provider?: string;
  walletAddress?: string;
  picture?: string;
  createdAt?: string;
}

interface DbSwap {
  _id: string;
  userEmail?: string;
  coinSymbol: string;
  coinName: string;
  usdAmount: number;
  estimatedAmount: number;
  priceAtSwap: number;
  status: string;
  createdAt?: string;
}

function DashboardContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth);

  // Data states
  const [usersList, setUsersList] = useState<DbUser[]>([]);
  const [swapsList, setSwapsList] = useState<DbSwap[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'swaps'>('users');
  const [updatingUserRole, setUpdatingUserRole] = useState<string | null>(null);
  const [roleMessage, setRoleMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch users and swaps from MongoDB
  const fetchDashboardData = async () => {
    setIsLoadingData(true);
    setDataError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const [usersRes, swapsRes] = await Promise.all([
        fetch(`${apiUrl}/users`),
        fetch(`${apiUrl}/swaps`),
      ]);

      const usersData = await usersRes.json();
      const swapsData = await swapsRes.json();

      if (usersData.success) {
        setUsersList(usersData.users || []);
      }
      if (swapsData.success) {
        setSwapsList(swapsData.swaps || []);
      }
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setDataError('Failed to load dynamic data from MongoDB. Ensure server is running.');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (mounted && isAuthenticated) {
      fetchDashboardData();
    }
  }, [mounted, isAuthenticated]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, router]);

  // Handler to promote/demote user role in MongoDB
  const handleToggleRole = async (targetUser: DbUser) => {
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    setUpdatingUserRole(targetUser._id);
    setRoleMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/users/${targetUser._id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();

      if (data.success) {
        setUsersList((prev) =>
          prev.map((u) => (u._id === targetUser._id ? { ...u, role: newRole } : u)),
        );
        setRoleMessage(`Successfully updated role of ${targetUser.name} to ${newRole.toUpperCase()}!`);
        setTimeout(() => setRoleMessage(''), 4000);

        // If promoting logged-in user, update Redux credentials
        if (user && (user._id === targetUser._id || user.id === targetUser._id)) {
          dispatch(setCredentials({ user: { ...user, role: newRole }, token: token || '' }));
        }
      }
    } catch (err) {
      console.error('Failed to update role:', err);
    } finally {
      setUpdatingUserRole(null);
    }
  };

  // Handler for granting self Admin access for testing
  const handleGrantSelfAdmin = async () => {
    if (!user) return;
    const userId = user._id || user.id;
    if (!userId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setCredentials({ user: { ...user, role: 'admin' }, token: token || '' }));
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to grant admin access:', err);
    }
  };

  if (!mounted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#010010',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: '#73FDAA' }} />
        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
          Loading Admin Dashboard...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // 🔒 ROLE GUARD: Check if logged in user is Admin
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#010010', py: 10, px: 2 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              bgcolor: 'rgba(10, 8, 25, 0.9)',
              border: '1px solid rgba(255, 92, 92, 0.4)',
              borderRadius: '24px',
              p: 4,
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(255, 92, 92, 0.15)',
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 92, 92, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
              }}
            >
              <LockIcon sx={{ color: '#FF5C5C', fontSize: 36 }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 1 }}>
              Admin Access Required
            </Typography>

            <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3, lineHeight: 1.6 }}>
              The Dashboard is restricted exclusively to <b>Admin</b> accounts. Your current role is{' '}
              <b style={{ color: '#73FDAA' }}>{user?.role || 'user'}</b>.
            </Typography>

            <Alert severity="info" sx={{ mb: 3, borderRadius: '14px', textAlign: 'left' }}>
              Want to test the Admin Dashboard? Click the button below to assign yourself the <b>ADMIN</b> role in MongoDB!
            </Alert>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleGrantSelfAdmin}
                startIcon={<AdminPanelSettingsIcon />}
                sx={{
                  bgcolor: '#73FDAA',
                  color: '#010010',
                  fontWeight: 800,
                  borderRadius: '16px',
                  py: 1.2,
                  '&:hover': { bgcolor: '#8CFFB8' },
                }}
              >
                Grant Me Admin Access (Testing Mode)
              </Button>

              <Button
                variant="outlined"
                component={Link}
                href="/profile"
                startIcon={<PersonIcon />}
                sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', borderRadius: '16px' }}
              >
                Go to My Profile
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  // Calculate dynamic database statistics
  const totalUsersCount = usersList.length;
  const totalSwapsCount = swapsList.length;
  const totalSwapVolume = swapsList.reduce((acc, curr) => acc + (curr.usdAmount || 0), 0);
  const connectedWalletsCount = usersList.filter((u) => !!u.walletAddress).length;

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
            ◆ Circlechain Admin
          </Typography>
          <Chip
            icon={<AdminPanelSettingsIcon sx={{ fontSize: '16px !important', color: '#010010 !important' }} />}
            label="ADMIN DASHBOARD"
            sx={{
              bgcolor: '#73FDAA',
              color: '#010010',
              fontWeight: 800,
              fontSize: '0.7rem',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="Refresh MongoDB Data">
            <IconButton onClick={fetchDashboardData} sx={{ color: '#73FDAA' }}>
              <RefreshIcon className={isLoadingData ? 'spin-icon' : ''} />
            </IconButton>
          </Tooltip>
          <Button
            component={Link}
            href="/profile"
            startIcon={<PersonIcon />}
            sx={{ color: '#73FDAA' }}
          >
            {user?.name?.split(' ')[0] || 'Profile'}
          </Button>
          <Button
            onClick={() => {
              dispatch(logout());
              window.location.href = '/login';
            }}
            startIcon={<LogoutIcon />}
            variant="outlined"
            sx={{ borderColor: 'rgba(255,92,92,0.4)', color: '#FF8080', borderRadius: '20px' }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>

      {/* Loading Bar when Data is Fetching */}
      {isLoadingData && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress sx={{ bgcolor: 'rgba(115, 253, 170, 0.15)', '& .MuiLinearProgress-bar': { bgcolor: '#73FDAA' } }} />
        </Box>
      )}

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        {/* Alerts */}
        {roleMessage && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '14px' }}>
            {roleMessage}
          </Alert>
        )}

        {dataError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '14px' }}>
            {dataError}
          </Alert>
        )}

        {/* 4 Stat Cards fetched dynamically from MongoDB */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {/* Total Registered Users */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(115,253,170,0.12) 0%, rgba(10,8,25,0.9) 100%)',
                border: '1px solid rgba(115, 253, 170, 0.25)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 700 }}>
                  TOTAL REGISTERED USERS
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'rgba(115,253,170,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PeopleIcon sx={{ color: '#73FDAA' }} />
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                {isLoadingData ? <CircularProgress size={24} sx={{ color: '#73FDAA' }} /> : totalUsersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#73FDAA', fontWeight: 600, display: 'block', mt: 1 }}>
                ● Real-time MongoDB Count
              </Typography>
            </Card>
          </Grid>

          {/* Total Swaps Executed */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(98,126,234,0.12) 0%, rgba(10,8,25,0.9) 100%)',
                border: '1px solid rgba(98, 126, 234, 0.25)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 700 }}>
                  TOTAL SWAPS EXECUTED
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'rgba(98,126,234,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SwapHorizIcon sx={{ color: '#627EEA' }} />
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                {isLoadingData ? <CircularProgress size={24} sx={{ color: '#627EEA' }} /> : totalSwapsCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#627EEA', fontWeight: 600, display: 'block', mt: 1 }}>
                ● Saved Trades Collection
              </Typography>
            </Card>
          </Grid>

          {/* Total Swapped Volume ($) */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(243,186,47,0.12) 0%, rgba(10,8,25,0.9) 100%)',
                border: '1px solid rgba(243, 186, 47, 0.25)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 700 }}>
                  TOTAL SWAP VOLUME ($)
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'rgba(243,186,47,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountBalanceWalletIcon sx={{ color: '#F3BA2F' }} />
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                {isLoadingData ? (
                  <CircularProgress size={24} sx={{ color: '#F3BA2F' }} />
                ) : (
                  `$${totalSwapVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                )}
              </Typography>
              <Typography variant="caption" sx={{ color: '#F3BA2F', fontWeight: 600, display: 'block', mt: 1 }}>
                ● Volume Transacted
              </Typography>
            </Card>
          </Grid>

          {/* Connected Web3 Wallets */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(20,241,149,0.12) 0%, rgba(10,8,25,0.9) 100%)',
                border: '1px solid rgba(20, 241, 149, 0.25)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#A0AEC0', fontWeight: 700 }}>
                  CONNECTED WALLETS
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: 'rgba(20,241,149,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SecurityIcon sx={{ color: '#14F195' }} />
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                {isLoadingData ? <CircularProgress size={24} sx={{ color: '#14F195' }} /> : connectedWalletsCount}
              </Typography>
              <Typography variant="caption" sx={{ color: '#14F195', fontWeight: 600, display: 'block', mt: 1 }}>
                ● On-chain Bound Users
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Tab Navigation for Tables */}
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(115, 253, 170, 0.2)', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              '& .MuiTabs-indicator': { bgcolor: '#73FDAA', height: 3 },
            }}
          >
            <Tab
              label={`Registered Users (${usersList.length})`}
              value="users"
              icon={<PeopleIcon />}
              iconPosition="start"
              sx={{
                color: '#A0AEC0',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&.Mui-selected': { color: '#73FDAA' },
              }}
            />
            <Tab
              label={`Web3 Swaps History (${swapsList.length})`}
              value="swaps"
              icon={<SwapHorizIcon />}
              iconPosition="start"
              sx={{
                color: '#A0AEC0',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&.Mui-selected': { color: '#73FDAA' },
              }}
            />
          </Tabs>
        </Box>

        {/* Table 1: Registered Users List */}
        {activeTab === 'users' && (
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: 'rgba(10, 8, 25, 0.85)',
              border: '1px solid rgba(115, 253, 170, 0.2)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(115, 253, 170, 0.08)' }}>
                <TableRow>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>User</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Email</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Provider</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Role</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Wallet Address</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800, textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoadingData ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <CircularProgress sx={{ color: '#73FDAA', mb: 1 }} />
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Fetching users from MongoDB database...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : usersList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ color: '#A0AEC0', py: 4 }}>
                      No registered users found in database.
                    </TableCell>
                  </TableRow>
                ) : (
                  usersList.map((u) => (
                    <TableRow key={u._id} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            src={u.picture}
                            alt={u.name}
                            sx={{ width: 36, height: 36, bgcolor: '#73FDAA', color: '#010010', fontWeight: 800 }}
                          >
                            {u.name?.charAt(0) || 'U'}
                          </Avatar>
                          {u.name}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#A0AEC0' }}>{u.email}</TableCell>
                      <TableCell sx={{ color: '#FFFFFF' }}>
                        <Chip
                          label={u.provider === 'google' ? 'Google SSO' : 'Local Auth'}
                          icon={u.provider === 'google' ? <GoogleIcon sx={{ fontSize: '14px !important' }} /> : undefined}
                          size="small"
                          sx={{
                            bgcolor: u.provider === 'google' ? 'rgba(234, 67, 53, 0.2)' : 'rgba(115, 253, 170, 0.15)',
                            color: u.provider === 'google' ? '#FF6B6B' : '#73FDAA',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={(u.role || 'user').toUpperCase()}
                          size="small"
                          sx={{
                            bgcolor: u.role === 'admin' ? '#73FDAA' : 'rgba(98, 126, 234, 0.2)',
                            color: u.role === 'admin' ? '#010010' : '#627EEA',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#73FDAA', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                        {u.walletAddress ? `${u.walletAddress.substring(0, 8)}...${u.walletAddress.substring(u.walletAddress.length - 6)}` : 'Not Set'}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleToggleRole(u)}
                          disabled={updatingUserRole === u._id}
                          sx={{
                            borderColor: u.role === 'admin' ? 'rgba(255,92,92,0.4)' : 'rgba(115,253,170,0.4)',
                            color: u.role === 'admin' ? '#FF8080' : '#73FDAA',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                          }}
                        >
                          {updatingUserRole === u._id ? (
                            <CircularProgress size={14} color="inherit" />
                          ) : u.role === 'admin' ? (
                            'Demote to User'
                          ) : (
                            'Make Admin'
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Table 2: Web3 Swaps History */}
        {activeTab === 'swaps' && (
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: 'rgba(10, 8, 25, 0.85)',
              border: '1px solid rgba(115, 253, 170, 0.2)',
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(115, 253, 170, 0.08)' }}>
                <TableRow>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>User Email</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Asset / Coin</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>USD Amount</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Estimated Received</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Price at Swap</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Date</TableCell>
                  <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoadingData ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                      <CircularProgress sx={{ color: '#73FDAA', mb: 1 }} />
                      <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                        Fetching swaps history from MongoDB database...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : swapsList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ color: '#A0AEC0', py: 4 }}>
                      No swap transactions recorded yet in MongoDB.
                    </TableCell>
                  </TableRow>
                ) : (
                  swapsList.map((s) => (
                    <TableRow key={s._id} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' } }}>
                      <TableCell sx={{ color: '#A0AEC0' }}>{s.userEmail || 'Guest'}</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 800 }}>
                        <Chip
                          label={s.coinSymbol}
                          size="small"
                          sx={{ bgcolor: 'rgba(115, 253, 170, 0.2)', color: '#73FDAA', fontWeight: 800, mr: 1 }}
                        />
                        {s.coinName}
                      </TableCell>
                      <TableCell sx={{ color: '#73FDAA', fontWeight: 800 }}>
                        ${s.usdAmount?.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 700 }}>
                        {s.estimatedAmount} {s.coinSymbol}
                      </TableCell>
                      <TableCell sx={{ color: '#A0AEC0' }}>
                        ${s.priceAtSwap?.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: '#A0AEC0', fontSize: '0.8rem' }}>
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Just now'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<CheckCircleIcon sx={{ fontSize: '14px !important', color: '#010010 !important' }} />}
                          label={s.status || 'Completed'}
                          size="small"
                          sx={{ bgcolor: '#73FDAA', color: '#010010', fontWeight: 800 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default function DashboardPage() {
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
      <DashboardContent />
    </Suspense>
  );
}
