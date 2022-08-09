import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authKey: null,
  collectionKey: null,
  isLoading: false,
  items: [],
}
export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    loadItemsSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    loadItemsFailed: (state) => {
      state.isLoading = false
    },
  },
})
export const { startLoading, loadItemsSuccess, loadItemsFailed } = collectionSlice.actions

export default collectionSlice.reducer
