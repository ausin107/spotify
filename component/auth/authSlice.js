import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isAuth: false,
  authKey: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuth = true
    },
  },
})

export const { loginSuccess } = authSlice.actions

export default authSlice.reducer
