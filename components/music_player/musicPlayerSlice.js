import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  musicData: null,
  musicId: null,
  isShow: false,
  isPlay: false,
  isPlayList: false,
}
export const musicPlayerSlice = createSlice({
  name: 'musicPlayer',
  initialState,
  reducers: {
    showMusicPlayer: (state, action) => {
      state.isShow = true
      state.isPlay = true
      state.isEnded = false
      state.musicData = action.payload.musicData
      state.musicId = action.payload.musicId
    },
    setPlayPauseMusic: (state) => {
      state.isPlay = state.isPlay ? false : true
    },
    setPlayList: (state) => {
      state.isPlayList = true
    },
    setNotPlayList: (state) => {
      state.isPlayList = false
    },
  },
})
export const { showMusicPlayer, setPlayPauseMusic, setPlayList, setNotPlayList } = musicPlayerSlice.actions

export default musicPlayerSlice.reducer
