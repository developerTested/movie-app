import { useAppDispatch, useAppSelector } from '@/hooks'
import { setMovie } from '@/redux/slices/movieSlice';
import { findMovieById } from '@/utilities/helper';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function WatchMoviePage() {

  const [loading, setLoading] = useState(true)
  const { movie } = useAppSelector(state => state.movie)

  const { movieId } = useParams();
  const dispatch = useAppDispatch();

  const fetchMovie = async () => {
    setLoading(true);

    if (!movieId) {
      return [];
    }

    const url = findMovieById(movieId);

    try {
      const { data: response } = await axios.get(url)

      dispatch(setMovie(response))

      setLoading(false)
    } catch (error: any) {
      setLoading(true);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [movieId])


  return (
    <div className="block space-y-4 min-h-screen px-4 pt-16">

      <ul className="flex items-center gap-4">
        <li>Home</li>
        <li>Movies</li>
      </ul>

      <Link to={`/movie/${movieId}`} className="text-3xl font-bold">
        {movie?.title}
      </Link>
      <div className="player block relative h-screen bg-slate-400">
        <iframe src={`https://vidsrc.to/embed/movie/${movieId}`} className="size-full object-cover outline-none border-transparent bg-black" />
      </div>
    </div>
  )
}
