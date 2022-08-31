import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  musicData: null,
  playlistData: null,
  articsData: null,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchData: (state, action) => {
      state.musicData = action.payload.musicData
    },
    updatePLSearchData: (state, action) => {
      state.playlistData = action.payload.playlistData
    },
    updateArtiscData: (state, action) => {
      state.articsData = action.payload.actistsData
    },
  },
})

export const { updateSearchData, updatePLSearchData, updateArtiscData } = searchSlice.actions
export default searchSlice.reducer
