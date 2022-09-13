import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isShow: ' hiddenToast',
  toastMess: null,
}
export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setShow: (state, action) => {
      state.isShow = ''
      state.toastMess = action.payload
    },
    setNotShow: (state) => {
      state.isShow = ' hiddenToast'
    },
  },
})
export const { setShow, setNotShow } = toastSlice.actions

export default toastSlice.reducer
