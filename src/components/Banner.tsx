import * as React from 'react'
import { IoPlay } from 'react-icons/io5';
import Button from './form/Button';
import { SearchResultItemType } from '../types/tmdb';
import { ApiRoutes, createImageUrl, formatDate, getGenreFromId } from '../utilities/helper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CircularProgressBar from './CircularProgressBar';

export default function Banner() {

    const [loading, setLoading] = React.useState(true);
    const [movie, setMovie] = React.useState<SearchResultItemType | null>(null);


    const fetchRandomBanner = async () => {
        try {
            const { data: response } = await axios.get(ApiRoutes.now_playing)

            const movieList = response.results;

            setMovie(movieList[Math.floor(Math.random() * movieList.length)])

            setLoading(false)

        } catch (error) {
            setLoading(true);
        }
    }

    React.useEffect(() => {

        fetchRandomBanner()

        return () => {
            setLoading(true);
        }
    }, [])

    if (loading || !movie) {
        return (
            <div className="relative w-full h-80 lg:h-500 overflow-hidden">
                <div className="bg-slate-700 absolute inset-0 z-10"></div>

                <div className="container flex flex-col gap-4 absolute bottom-4 z-10 animate-pulse">
                    <div className="w-full md:w-1/2 h-14 bg-white/10 rounded-md" />
                    <div className="flex items-center gap-2">
                        <div className="w-60 h-14 bg-white/10 rounded-md" />
                        <div className="w-60 h-14 bg-white/10 rounded-md" />
                        <div className="w-60 h-14 bg-white/10 rounded-md" />
                    </div>
                    <div className="block h-20 bg-white/10 rounded-md" />
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-80 lg:h-500 overflow-hidden text-slate-200">
            <div className="block size-full"></div>
            <div className="bg-black/40 absolute inset-0 z-10"></div>
            <div className="bg-gradient-to-b from-transparent to-black absolute inset-0 z-20"></div>
            <LazyLoadImage
                alt={movie.title}
                src={createImageUrl(movie.backdrop_path, 'w1920_and_h800_multi_faces')}
                className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="container w-full lg:w-1/2 flex flex-col gap-4 absolute bottom-8 left-4 z-30">

                <div className="flex items-center gap-4">
                    <Link to={`/movie/${movie.id}`} className="block title text-4xl font-semibold">
                        {movie.title || movie.original_title}
                    </Link>
                    <div className="year text-lg text-slate-200">
                        ({new Date(movie.release_date).getFullYear()})
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <CircularProgressBar text={movie.vote_average.toFixed(1)} value={movie.vote_average} remain={movie.vote_average} color="text-green-600" />

                    <Link to={`/movie/${movie.id}/watch`}>
                        <Button startIcon={<IoPlay className='w-6 h-6' />} className="rounded-lg">
                            Play
                        </Button>
                    </Link>
                    <div className="flex items-center gap-4 divide-x">
                        <div className="block">
                            {formatDate(movie.release_date, "MMM DD, YYYY")}
                        </div>
                    </div>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                    {movie.genre_ids.map((x) => <div key={x} className="block text-sm px-2 rounded-lg bg-input">
                        {getGenreFromId(x)}
                    </div>)}
                </div>


                <div className="summary block text-sm line-clamp-3 lg:line-clamp-4">
                    {movie.overview}
                </div>
            </div>
        </div>
    )
}