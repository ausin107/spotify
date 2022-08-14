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
      //   state.isShow = true
      state.isShow = ''
      state.toastMess = action.payload
    },
    setNotShow: (state) => {
      state.isShow = ' hiddenToast'
      //   state.isShow = false
    },
  },
})
export const { setShow, setNotShow } = toastSlice.actions

export default toastSlice.reducer
