import { createSlice } from '@reduxjs/toolkit'
import { getStorageValue } from '../../lib/getLocalStorage'

const authKey = getStorageValue('authKey', null)

const initialState = {
  isAuth: !!authKey ? true : false,
  authKey: authKey,
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
    },
  },
})

export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions

export default authSlice.reducer
