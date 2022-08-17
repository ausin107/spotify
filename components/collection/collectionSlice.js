import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  authKey: null,
  collectionKey: null,
  isLoading: false,
  currentId: null,
  currentPlaylist: null,
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
      state.items = action.payload.data
    },
    endLoading: (state) => {
      state.isLoading = false
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload.index
    },
    increaseCurrentId: (state) => {
      if (state.currentId < state.items.length - 1) {
        state.currentId += 1
      }
    },
    decreaseCurrentId: (state) => {
      if (state.currentId >= 0) {
        state.currentId -= 1
      }
    },
    setCurrentPlayList: (state, action) => {
      state.currentPlaylist = action.payload
    },
  },
})
export const {
  startLoading,
  loadItemsSuccess,
  endLoading,
  setCurrentId,
  increaseCurrentId,
  decreaseCurrentId,
  setCurrentPlayList,
} = collectionSlice.actions

export default collectionSlice.reducer
