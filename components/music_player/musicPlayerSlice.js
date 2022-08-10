import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isShow: false,
  musicData: null,
  musicId: null,
  isPlay: false,
  isPlayList: false,
}
export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    showMusicPlayer: (state, action) => {
      state.isShow = true
      state.musicData = action.payload.musicData
      state.musicId = action.payload.musicId
      state.isPlay = true
    },
    playMusic: (state) => {
      state.isPlay = true
    },
    pauseMusic: (state) => {
      state.isPlay = false
    },
    setPlayList: (state) => {
      state.isPlayList = true
    },
    setNotPlayList: (state) => {
      state.isPlayList = false
    },
  },
})
export const { showMusicPlayer, playMusic, pauseMusic, setPlayList, setNotPlayList } =
  musicPlayerSlice.actions

export default musicPlayerSlice.reducer
