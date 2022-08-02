import { configureStore } from '@reduxjs/toolkit'
import authReducer from './components/auth/authSlice'
import musicPlayerSlice from './components/musicPlayerSlice'
export const store = configureStore({
  reducer: {
    //gán cho auth bằng initialState thuộc authReducer
    //-> truy cập bằng useSelector()
    //-> state.auth.isAuth or state.auth.authKey
    auth: authReducer,
    player: musicPlayerSlice,
  },
})
