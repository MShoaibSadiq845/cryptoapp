import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  picture?: string;
  googleId?: string;
  provider?: string;
  role?: string;
  walletAddress?: string;
  createdAt?: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const getInitialToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('circlechain_token');
  }
  return null;
};

const getInitialUser = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('circlechain_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  user: getInitialUser(),
  isAuthenticated: !!getInitialToken(),
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: UserProfile }>,
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('circlechain_token', action.payload.token);
        if (action.payload.user) {
          localStorage.setItem(
            'circlechain_user',
            JSON.stringify(action.payload.user),
          );
        }
      }
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('circlechain_user', JSON.stringify(action.payload));
      }
    },
    updateUserWallet: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.walletAddress = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('circlechain_user', JSON.stringify(state.user));
        }
      }
    },
    updateUserPicture: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.picture = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('circlechain_user', JSON.stringify(state.user));
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('circlechain_token');
        localStorage.removeItem('circlechain_user');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCredentials,
  setUser,
  updateUserWallet,
  updateUserPicture,
  logout,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
