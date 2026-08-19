import { createTheme } from '@mui/material/styles';

export const web3Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#73FDAA',
      light: '#A3FFC8',
      dark: '#3EC676',
      contrastText: '#010010',
    },
    secondary: {
      main: '#36FB82',
      light: '#72FDAB',
      dark: '#1CA353',
      contrastText: '#010010',
    },
    background: {
      default: '#010010',
      paper: '#0A0819',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A0AEC0',
    },
    divider: 'rgba(115, 253, 170, 0.15)',
  },
  typography: {
    fontFamily: '"Montserrat", "Raleway", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          fontWeight: 700,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.25s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#73FDAA',
            color: '#010010',
            '&:hover': {
              backgroundColor: '#8CFFB8',
              boxShadow: '0 6px 20px rgba(115, 253, 170, 0.4)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#73FDAA',
            color: '#73FDAA',
            '&:hover': {
              borderColor: '#8CFFB8',
              backgroundColor: 'rgba(115, 253, 170, 0.1)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 8, 25, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(115, 253, 170, 0.2)',
          borderRadius: 16,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          '& fieldset': {
            borderColor: 'rgba(115, 253, 170, 0.3)',
          },
          '&:hover fieldset': {
            borderColor: '#73FDAA',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#73FDAA',
            borderWidth: 2,
          },
        },
      },
    },
  },
});
