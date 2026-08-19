'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Tabs,
  Tab,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppSelector } from '../services/store';

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  rawPrice: number;
  price: string;
  change: string;
  isPositive: boolean;
  color: string;
  category: 'all' | 'gainers' | 'defi' | 'layer1';
  points: number[];
  image?: string;
}

const DEFAULT_COIN_COLORS: Record<string, string> = {
  btc: '#F7931A',
  eth: '#627EEA',
  bnb: '#F3BA2F',
  usdt: '#26A17B',
  sol: '#14F195',
  uni: '#FF007A',
  xrp: '#23292F',
  avax: '#E84142',
};

const INITIAL_FALLBACK_COINS: CryptoCoin[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'BITCOIN',
    rawPrice: 65997,
    price: '$65,997.00',
    change: '+1.41%',
    isPositive: true,
    color: '#F7931A',
    category: 'layer1',
    points: [40, 42, 38, 45, 48, 46, 52, 58],
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'ETHEREUM',
    rawPrice: 1973.97,
    price: '$1,973.97',
    change: '+2.22%',
    isPositive: true,
    color: '#627EEA',
    category: 'layer1',
    points: [30, 32, 36, 35, 42, 40, 48, 55],
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BINANCE',
    rawPrice: 609.35,
    price: '$609.35',
    change: '+0.82%',
    isPositive: true,
    color: '#F3BA2F',
    category: 'layer1',
    points: [25, 28, 26, 30, 31, 33, 35, 36],
  },
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'TETHER',
    rawPrice: 0.9998,
    price: '$0.9998',
    change: '+0.03%',
    isPositive: true,
    color: '#26A17B',
    category: 'all',
    points: [20, 20, 20, 20, 20, 20, 20, 20],
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'SOLANA',
    rawPrice: 80.92,
    price: '$80.92',
    change: '+5.18%',
    isPositive: true,
    color: '#14F195',
    category: 'gainers',
    points: [20, 25, 22, 30, 38, 45, 52, 60],
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'UNISWAP',
    rawPrice: 3.42,
    price: '$3.42',
    change: '+3.60%',
    isPositive: true,
    color: '#FF007A',
    category: 'defi',
    points: [15, 18, 16, 22, 25, 28, 30, 34],
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'RIPPLE',
    rawPrice: 1.033,
    price: '$1.0330',
    change: '-0.42%',
    isPositive: false,
    color: '#23292F',
    category: 'layer1',
    points: [30, 28, 29, 26, 24, 25, 22, 21],
  },
  {
    id: 'avalanche',
    symbol: 'AVAX',
    name: 'AVALANCHE',
    rawPrice: 34.12,
    price: '$34.12',
    change: '+2.95%',
    isPositive: true,
    color: '#E84142',
    category: 'gainers',
    points: [20, 22, 25, 24, 30, 32, 36, 40],
  },
];

export default function MarketTrends() {
  const { user } = useAppSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gainers' | 'defi' | 'layer1'>('all');
  const [coins, setCoins] = useState<CryptoCoin[]>(INITIAL_FALLBACK_COINS);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Swap Modal States
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<CryptoCoin | null>(null);
  const [tradeAmount, setTradeAmount] = useState('100');
  const [isSwapping, setIsSwapping] = useState(false);
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState('');
  const [tradeError, setTradeError] = useState('');

  const fetchLiveCryptoData = async (catParam?: 'all' | 'gainers' | 'defi' | 'layer1') => {
    const cat = catParam || selectedCategory;
    setIsLoadingApi(true);

    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,tether,solana,uniswap,ripple,avalanche&sparkline=true';

    if (cat === 'gainers') {
      url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=true';
    } else if (cat === 'defi') {
      url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=decentralized-finance-defi&order=market_cap_desc&per_page=8&page=1&sparkline=true';
    } else if (cat === 'layer1') {
      url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,cardano,avalanche-2,polkadot,near&sparkline=true';
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API response error: ${response.statusText}`);
      }
      let data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        // If top gainers tab, sort by highest 24h price change percentage
        if (cat === 'gainers') {
          data = [...data]
            .sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
            .slice(0, 8);
        }

        const formattedCoins: CryptoCoin[] = data.map((coin: any) => {
          const sym = (coin.symbol || '').toLowerCase();
          const changeVal = coin.price_change_percentage_24h ?? 0;
          const isPositive = changeVal >= 0;

          // Process sparkline points
          const rawPoints: number[] = coin.sparkline_in_7d?.price || [];
          // Downsample sparkline to ~12-20 points for smooth SVG rendering
          const points =
            rawPoints.length > 20
              ? rawPoints.filter((_, idx) => idx % Math.ceil(rawPoints.length / 16) === 0)
              : rawPoints.length > 0
              ? rawPoints
              : [40, 42, 38, 45, 48];

          const priceFormatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: coin.current_price < 1 ? 4 : 2,
          }).format(coin.current_price);

          return {
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name.toUpperCase(),
            rawPrice: coin.current_price,
            price: priceFormatted,
            change: `${isPositive ? '+' : ''}${changeVal.toFixed(2)}%`,
            isPositive,
            color: DEFAULT_COIN_COLORS[sym] || (isPositive ? '#73FDAA' : '#FF5C5C'),
            category: cat,
            points,
            image: coin.image,
          };
        });

        setCoins(formattedCoins);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('CoinGecko API fetch warning, using fallback data:', err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  useEffect(() => {
    fetchLiveCryptoData(selectedCategory);
    // Auto-refresh every 45 seconds
    const interval = setInterval(() => fetchLiveCryptoData(selectedCategory), 45000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins;

  const handleOpenTrade = (coin: CryptoCoin) => {
    setSelectedCoin(coin);
    setTradeAmount('100');
    setTradeSuccessMsg('');
    setTradeError('');
    setTradeModalOpen(true);
  };

  const handleExecuteTrade = async () => {
    if (!selectedCoin) return;
    const amountNum = Number(tradeAmount);
    if (!amountNum || amountNum <= 0) {
      setTradeError('Please enter a valid USD amount greater than 0.');
      return;
    }

    setIsSwapping(true);
    setTradeError('');
    setTradeSuccessMsg('');

    const estimatedRec = amountNum / (selectedCoin.rawPrice || 1);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/swaps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?._id || user?.id,
          userEmail: user?.email || 'guest@circlechain.web3',
          coinSymbol: selectedCoin.symbol,
          coinName: selectedCoin.name,
          usdAmount: amountNum,
          estimatedAmount: Number(estimatedRec.toFixed(6)),
          priceAtSwap: selectedCoin.rawPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTradeSuccessMsg(
          `Swap confirmed! $${amountNum} converted to ${estimatedRec.toFixed(4)} ${
            selectedCoin.symbol
          } and stored in MongoDB database.`,
        );
        setTimeout(() => {
          setTradeModalOpen(false);
          setTradeSuccessMsg('');
        }, 2200);
      } else {
        setTradeError(data.message || 'Failed to process swap in database.');
      }
    } catch (err: any) {
      setTradeError(err?.message || 'Network error executing swap.');
    } finally {
      setIsSwapping(false);
    }
  };

  // Helper to render mini SVG Sparkline chart
  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points) || 1;
    const height = 40;
    const width = 120;
    const pathD = points
      .map((pt, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((pt - min) / (max - min || 1)) * (height - 8) - 4;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#73FDAA' : '#FF5C5C';

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const currentEstimatedReceive = selectedCoin
    ? (Number(tradeAmount || 0) / (selectedCoin.rawPrice || 1)).toFixed(4)
    : '0.0000';

  return (
    <Box
      component="section"
      id="market-trend"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Title and Category Filters matching Figma */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
            mb: 6,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.8rem' },
                  fontWeight: 800,
                  fontFamily: '"Montserrat", sans-serif',
                  color: '#FFFFFF',
                }}
              >
                Market Trend
              </Typography>
              {lastUpdated && (
                <Typography variant="caption" sx={{ color: '#73FDAA', fontWeight: 600 }}>
                  ● Live CoinGecko API Data (Updated {lastUpdated})
                </Typography>
              )}
            </Box>
            <Tooltip title="Refresh Live Market Data">
              <IconButton onClick={() => fetchLiveCryptoData(selectedCategory)} size="small" sx={{ color: '#73FDAA' }}>
                <RefreshIcon className={isLoadingApi ? 'spin-icon' : ''} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Filter Tabs */}
          <Tabs
            value={selectedCategory}
            onChange={(_, val) => {
              setSelectedCategory(val);
              fetchLiveCryptoData(val);
            }}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '24px',
              p: 0.5,
              border: '1px solid rgba(115, 253, 170, 0.2)',
              '& .MuiTabs-indicator': {
                bgcolor: '#73FDAA',
                height: '100%',
                borderRadius: '20px',
                zIndex: 0,
              },
            }}
          >
            {[
              { label: 'All Assets', value: 'all' },
              { label: 'Top Gainers', value: 'gainers' },
              { label: 'DeFi', value: 'defi' },
              { label: 'Layer 1', value: 'layer1' },
            ].map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                sx={{
                  color: '#A0AEC0',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  zIndex: 1,
                  minHeight: 40,
                  px: 2.5,
                  '&.Mui-selected': {
                    color: '#010010',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Crypto Coins Grid */}
        {isLoadingApi && coins.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#73FDAA' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredCoins.map((coin) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={coin.symbol}>
                <Card
                  sx={{
                    bgcolor: 'rgba(10, 8, 25, 0.75)',
                    border: '1px solid rgba(115, 253, 170, 0.2)',
                    borderRadius: '20px',
                    p: 3,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      borderColor: '#73FDAA',
                      transform: 'translateY(-6px)',
                      boxShadow: '0 10px 25px rgba(115, 253, 170, 0.2)',
                    },
                  }}
                >
                  {/* Coin Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${coin.color}66`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          boxShadow: `0 0 15px ${coin.color}44`,
                        }}
                      >
                        {coin.image ? (
                          <img
                            src={coin.image}
                            alt={coin.name}
                            style={{ width: 28, height: 28, objectFit: 'contain' }}
                          />
                        ) : (
                          <Typography variant="h6" sx={{ fontWeight: 800, color: coin.color }}>
                            {coin.symbol.substring(0, 1)}
                          </Typography>
                        )}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}
                        >
                          {coin.symbol}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: '#A0AEC0', fontWeight: 600, letterSpacing: '0.5px' }}
                        >
                          {coin.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Percentage Change Pill */}
                    <Chip
                      icon={
                        coin.isPositive ? (
                          <TrendingUpIcon sx={{ fontSize: 16, color: '#010010 !important' }} />
                        ) : (
                          <TrendingDownIcon sx={{ fontSize: 16, color: '#FFFFFF !important' }} />
                        )
                      }
                      label={coin.change}
                      size="small"
                      sx={{
                        bgcolor: coin.isPositive ? '#73FDAA' : 'rgba(255, 92, 92, 0.8)',
                        color: coin.isPositive ? '#010010' : '#FFFFFF',
                        fontWeight: 800,
                        borderRadius: '12px',
                      }}
                    />
                  </Box>

                  {/* Price and Chart */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ color: '#A0AEC0', display: 'block' }}>
                        Price
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: '#FFFFFF',
                          fontFamily: '"Montserrat", sans-serif',
                          fontSize: coin.price.length > 9 ? '1.15rem' : '1.35rem',
                        }}
                      >
                        {coin.price}
                      </Typography>
                    </Box>
                    <Box>{renderSparkline(coin.points, coin.isPositive)}</Box>
                  </Box>

                  {/* Trade Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleOpenTrade(coin)}
                    startIcon={<SwapHorizIcon />}
                    sx={{
                      borderRadius: '16px',
                      borderColor: 'rgba(115, 253, 170, 0.3)',
                      color: '#73FDAA',
                      py: 0.8,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      '&:hover': {
                        bgcolor: '#73FDAA',
                        color: '#010010',
                        borderColor: '#73FDAA',
                      },
                    }}
                  >
                    Trade {coin.symbol}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Quick Trade / Swap Modal */}
      <Dialog
        open={tradeModalOpen}
        onClose={() => !isSwapping && setTradeModalOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#0B0A1C',
            border: '1px solid rgba(115, 253, 170, 0.3)',
            borderRadius: '20px',
            p: 2,
            maxWidth: 420,
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {selectedCoin?.image && (
            <img src={selectedCoin.image} alt={selectedCoin.name} style={{ width: 28, height: 28 }} />
          )}
          Swap & Trade {selectedCoin?.symbol}
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          {tradeSuccessMsg && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: '12px' }}>
              {tradeSuccessMsg}
            </Alert>
          )}

          {tradeError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
              {tradeError}
            </Alert>
          )}

          {!tradeSuccessMsg && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <Box
                sx={{
                  bgcolor: 'rgba(115, 253, 170, 0.08)',
                  border: '1px solid rgba(115, 253, 170, 0.2)',
                  borderRadius: '14px',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Current Market Price:
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#73FDAA', fontWeight: 800 }}>
                  {selectedCoin?.price}
                </Typography>
              </Box>

              <TextField
                label="Amount in USD ($)"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                type="number"
                fullWidth
                variant="outlined"
                disabled={isSwapping}
                autoFocus
              />

              <Box
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  p: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: '#A0AEC0', display: 'block', mb: 0.5 }}>
                  Estimated receive:
                </Typography>
                <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 800 }}>
                  {currentEstimatedReceive} {selectedCoin?.symbol}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setTradeModalOpen(false)} disabled={isSwapping} sx={{ color: '#A0AEC0' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleExecuteTrade}
            disabled={isSwapping || !!tradeSuccessMsg}
            startIcon={isSwapping ? <CircularProgress size={18} color="inherit" /> : <SwapHorizIcon />}
            sx={{
              bgcolor: '#73FDAA',
              color: '#010010',
              fontWeight: 800,
              borderRadius: '14px',
              px: 3,
              py: 1,
              '&:hover': { bgcolor: '#8CFFB8' },
            }}
          >
            {isSwapping ? 'Swapping...' : 'Confirm Swap'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
