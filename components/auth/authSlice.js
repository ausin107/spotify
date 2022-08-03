import { createSlice } from '@reduxjs/toolkit'
import dynamic from 'next/dynamic'
const authKey = dynamic(
  () => {
    import('../getWindow')
  },
  {
    srr: false,
  }
)
const initialState = {
  isAuth: !!authKey ? true : false,
  authKey: !!authKey ? authKey : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuth = true
      state.authKey = action.payload.uid
    },
    loginFailed: (state) => {
      state.isAuth = false
      state.authKey = null
    },
    logoutSuccess: (state) => {
      state.isAuth = false
      state.authKey = null
      window.localStorage.removeItem('authKey')
    },
  },
})

export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions

export default authSlice.reducer
