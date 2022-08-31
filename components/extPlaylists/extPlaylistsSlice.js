import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allExtPlaylist: null,
  currentPlInfo: null,
}
export const extPlaylistsSlice = createSlice({
  name: 'ytPlaylist',
  initialState,
  reducers: {
    loadAllExtPlaylists: (state, action) => {
      state.allExtPlaylist = action.payload
    },
    updateCurrentPlInfo: (state, action) => {
      state.currentPlInfo = action.payload
    },
  },
})

export const { loadAllExtPlaylists, updateCurrentPlInfo } = extPlaylistsSlice.actions
export default extPlaylistsSlice.reducer
