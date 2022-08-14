import { configureStore } from '@reduxjs/toolkit'
import authReducer from './components/auth/authSlice'
import musicPlayerSlice from './components/music_player/musicPlayerSlice'
import searchSlice from './components/search/searchSlice'
import collectionSlice from './components/collection/collectionSlice'
import toastSlice from './components/toast/toastSlice'
export const store = configureStore({
  reducer: {
    //gán cho auth bằng initialState thuộc authReducer
    //-> truy cập bằng useSelector()
    //-> state.auth.isAuth or state.auth.authKey
    auth: authReducer,
    player: musicPlayerSlice,
    search: searchSlice,
    collection: collectionSlice,
    toast: toastSlice,
  },
})
