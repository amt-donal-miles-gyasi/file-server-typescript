import { createSlice} from '@reduxjs/toolkit';

 export interface AuthState {
  isAuth: boolean;
}

const userAuthFromLocalStorage = (): boolean => {
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const initialState: AuthState = {
  isAuth: userAuthFromLocalStorage(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state: AuthState) => {
      state.isAuth = true;
    },
    unauthenticateUser: (state: AuthState) => {
      state.isAuth = false;
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;

export default authSlice.reducer;
