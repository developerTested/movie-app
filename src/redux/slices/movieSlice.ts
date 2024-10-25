import { MovieType } from '@/types/tmdb';
import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
    movie: MovieType | null,
}

const initialState: initialStateType = {
  movie: null,
};

const movieSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMovie: (state, action) => {
        state.movie = action.payload
    }
  },
});

export const { setMovie } = movieSlice.actions;

export default movieSlice.reducer;