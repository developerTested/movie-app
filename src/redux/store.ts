import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import themeSlice from './slices/themeSlice'
import appSlice from './slices/appSlice'
import movieSlice from './slices/movieSlice'

export const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    theme: themeSlice,
    movie: movieSlice,
  },
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch