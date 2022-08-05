import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isShow: false,
  musicData: null,
  musicUrl: null,
}
export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    showMusicPlayer: (state, action) => {
      state.isShow = true
      state.musicData = action.payload.musicData
      state.musicUrl = action.payload.musicUrl
    },
  },
})
export const { showMusicPlayer } = musicPlayerSlice.actions

export default musicPlayerSlice.reducer
