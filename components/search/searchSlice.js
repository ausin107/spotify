import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  musicData: null,
  playlistData: null,
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
  },
})

export const { updateSearchData, updatePLSearchData } = searchSlice.actions
export default searchSlice.reducer
