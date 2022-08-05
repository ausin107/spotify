import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  musicData: null,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchData: (state, action) => {
      state.musicData = action.payload.musicData
    },
  },
})

export const { updateSearchData } = searchSlice.actions
export default searchSlice.reducer
