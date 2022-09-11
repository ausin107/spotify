import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allExtPlaylist: null,
  currentPlInfo: null,
  isLoading: false,
}
export const extPlaylistsSlice = createSlice({
  name: 'extPlaylist',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    endLoading: (state) => {
      state.isLoading = false
    },
    loadAllExtPlaylists: (state, action) => {
      state.allExtPlaylist = action.payload
    },
    updateCurrentPlInfo: (state, action) => {
      state.currentPlInfo = action.payload
    },
  },
})

export const { loadAllExtPlaylists, updateCurrentPlInfo, startLoading, endLoading } = extPlaylistsSlice.actions
export default extPlaylistsSlice.reducer
