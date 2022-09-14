import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  authKey: null,
  collectionData: null,
  isLoading: false,
  currentId: null,
  currentPlaylist: null,
  allMusics: [],
}
export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    loadItemsSuccess: (state, action) => {
      state.allMusics = action.payload.data
      state.currentId = action.payload.index
    },
    endLoading: (state) => {
      state.isLoading = false
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload.index
    },
    increaseCurrentId: (state) => {
      if (state.currentId < state.allMusics.length - 1) {
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
    updateCollectionInfo: (state, action) => {
      state.collectionData = action.payload
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
  updateCollectionInfo,
} = collectionSlice.actions

export default collectionSlice.reducer
