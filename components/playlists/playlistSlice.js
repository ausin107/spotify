import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allPlaylist: null,
  isLoading: false,
}
const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    loadAllPlaylist: (state, action) => {
      state.allPlaylist = action.payload
    },
    startLoading: (state) => {
      state.isLoading = true
    },
    endLoading: (state) => {
      state.isLoading = false
    },
  },
})
export const { loadAllPlaylist, startLoading, endLoading } = playlistSlice.actions

export default playlistSlice.reducer
