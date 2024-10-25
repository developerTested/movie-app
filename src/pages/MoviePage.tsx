import React, { useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { createImageUrl, findMovieById, findMovieRecommendationById, formatDate, formatDuration, getTrailer, movie_cropped_bg_url, } from '../utilities/helper';
import { MdPlayCircle } from 'react-icons/md';
import { MiniCrewType, SearchResultItemType } from '../types/tmdb';
import Button from '../components/form/Button';
import Dialog from '../components/dialog';
import { setShowDialog } from '@/redux/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Avatar from '@/components/Avatar';
import CircularProgressBar from '@/components/CircularProgressBar';
import { setMovie } from '@/redux/slices/movieSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function MoviePage() {

    const { movieId } = useParams();

    const [loading, setLoading] = useState(true);
    const { movie } = useAppSelector(state => state.movie)
    const { showDialog } = useAppSelector(state => state.app)
    const [recommends, setRecommends] = useState<SearchResultItemType[]>([])

    const dispatch = useAppDispatch();

    const handleDialogOpen = () => {
        dispatch(setShowDialog(true))
    }

    const handleDialogClose = () => {
        dispatch(setShowDialog(false))
    }

    async function fetchRecommendation() {
        if (!movieId) {
            return [];
        }

        const url = findMovieRecommendationById(movieId)

        try {
            const { data: response } = await axios.get(url)

            setRecommends(response.results)

        } catch (error: any) {
            console.log(error);
        }
    }

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

    React.useEffect(() => {
        fetchMovie();

        fetchRecommendation();
    }, [movieId])

    let crew: MiniCrewType[] = [];

    if (movie) {

        movie.credits.crew.filter((x) => {
            if (["Director", "Producer", "Writer"].includes(x.job)) {
                return x;
            }
        }).map((x) => {

            const found = crew.find((c) => c.name === x.name);

            if (found) {
                found.jobs?.push(x.job);

                return found;
            }

            crew.push({
                id: x.id,
                credit_id: x.credit_id,
                name: x.name,
                original_name: x.name,
                job: x.job,
                department: x.department,
                jobs: [x.job]
            });

            return crew;
        })
    }

    if (loading || !movie) {
        return <div className="relative block p-40 w-full h-screen">
            <div className="grid sm:flex gap-4 relative z-100 animate-pulse">
                <div className="cover flex items-center justify-center shrink-0 w-80 min-h-350 m-auto relative bg-white/10">
                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                </div>

                <div className="details flex-auto flex flex-col gap-2 text-white">
                    <h2 className='text-2xl font-bold w-full flex items-center gap-2'>
                        <div className="w-full max-w-lg h-12 rounded bg-white/10"></div>
                        <div className="w-20 h-8 rounded bg-white/10"></div>
                    </h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10"></div>

                        <div className="w-20 h-8 rounded bg-white/10"></div>
                        <div className="w-1/2 h-8 rounded bg-white/10"></div>
                        <div className="w-20 h-8 rounded bg-white/10"></div>
                    </div>
                    <div className="w-full h-10 rounded bg-white/10"></div>
                    <div className="w-full h-40 rounded bg-white/10"></div>

                    <div className="button-group my-2 flex items-center gap-4">
                        <div className="w-60 h-12 rounded bg-white/10"></div>
                        <div className="w-60 h-12 rounded bg-white/10"></div>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className="relative block p-4 w-full h-screen">
            <div className='mx-auto size-full'>
                <div className="flex items-center justify-center size-full">
                    <div className="bg-black bg-opacity-80 size-full absolute inset-0 z-10"></div>
                    <div className="size-full absolute inset-0 blur-sm">
                        <LazyLoadImage src={movie_cropped_bg_url + movie.backdrop_path} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                    </div>

                    <div className="grid sm:flex gap-4 relative z-100">
                        <div className="cover shrink-0 w-80 min-h-350 m-auto relative">
                            <LazyLoadImage src={createImageUrl(movie.poster_path, "w300")} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                        </div>

                        <div className="details flex-auto flex flex-col gap-2 text-white">
                            <h2 className='text-2xl font-bold flex items-center gap-2'>
                                {movie.title}

                                <div className="year text-slate-200">
                                    ({new Date(movie.release_date).getFullYear()})
                                </div>
                            </h2>
                            <div className="flex flex-wrap items-center gap-4">
                                <CircularProgressBar className="absolute left-0 bottom-4 right-0" text={movie.vote_average.toFixed(1)} value={movie.vote_average} remain={movie.vote_average} color="text-green-600" />

                                <div className="released">
                                    {formatDate(movie.release_date, "MMM DD, YYYY")}
                                </div>
                                <div className="genre space-x-2">
                                    {movie.genres.length ? movie.genres.map((g) => <span key={g.id}>{g.name}</span>) : ''}
                                </div>
                                <div className="duration">
                                    {formatDuration(movie.runtime)}
                                </div>
                            </div>
                            <div className="slogan text-lg italic my-2">
                                {movie.tagline}
                            </div>
                            <div className="summary">
                                {movie.overview}
                            </div>

                            <div className="button-group my-2 flex items-center gap-4">
                                <Button onClick={handleDialogOpen} className="flex items-center justify-center gap-4">
                                    <MdPlayCircle className='w-6 h-6' />
                                    <span className='font-semibold'>
                                        Play Trailer
                                    </span>
                                </Button>

                                <Link to={`/movie/${movie.id}/watch`} className="uppercase bg-input hover:bg-midnight disabled:bg-midnight dark:bg-white/20 text-white px-4 py-2 text-center">
                                    Watch Now
                                </Link>
                            </div>

                            <div className="cast grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-auto">
                                {crew.length ? crew.sort((a, b) => b.job.localeCompare(a.job)).map((x, i) => <div key={i} className="space-y-2 shrink-0 text-center">
                                    <div className="name text-base font-bold">
                                        {x.name}
                                    </div>
                                    <div className="block">
                                        {x.jobs?.join(', ')}
                                    </div>
                                </div>) : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="block my-4 space-y-4">
                <div className="font-semibold text-lg px-4 py-2">
                    Casts
                </div>
                <div className="cast grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                    {movie.credits.cast.map((cast) => <div key={cast.cast_id} className="block space-y-2 p-2">
                        <Avatar size="3xl" src={createImageUrl(cast.profile_path as string)} alt={cast.original_name} />
                        <div className="text-bold text-lg">
                            {cast.name}
                        </div>
                        <div className='text-sm'>
                            {cast.character}
                        </div>
                    </div>)}
                </div>
            </div>

            {recommends.length ?
                <div className="block size-full my-4">
                    <div className="font-semibold text-lg px-4 py-2">
                        Recommendations
                    </div>
                    <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-around gap-4">
                        {recommends.length ? recommends.map((movie) => <div key={movie.id} className="relative shrink-0 block w-full md:w-60 h-auto duration-500 hover:scale-105 hover:shadow-xl">
                            <Link to={`/movie/${movie.id}`} className='flex items-center justify-center w-full h-500 md:w-60 md:h-350 relative text-center'>
                                <LazyLoadImage src={createImageUrl(movie.poster_path, "w300")} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                            </Link>

                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="block">

                                    <Link to={`/movie/${movie.id}`} className='text-base font-bold line-clamp-2'>
                                        {movie.title}
                                    </Link>
                                    <div className="block">
                                        {formatDate(movie.release_date, "MMM DD, YYYY")}
                                    </div>
                                </div>

                                <CircularProgressBar text={movie.vote_average.toFixed(1)} value={movie.vote_average} remain={movie.vote_average} color="text-green-600" />
                            </div>
                        </div>) : ''}
                    </div>
                </div> : ""}

            {movie.similar.results.length ?
                <div className="block my-4">
                    <div className="font-semibold text-lg px-4 py-2">
                        Related
                    </div>

                    <div className="mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-around gap-4">
                        {movie.similar.results.length ? movie.similar.results.map((movie) => <div key={movie.id} className="relative shrink-0 block w-60 h-auto duration-500 hover:scale-105 hover:shadow-xl">
                            <Link to={`/movie/${movie.id}`} className='flex items-center justify-center w-60 h-350 relative text-center'>
                                <LazyLoadImage src={createImageUrl(movie.poster_path, "w300")} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                            </Link>

                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="block">

                                    <Link to={`/movie/${movie.id}`} className='text-base font-bold line-clamp-2'>
                                        {movie.title}
                                    </Link>
                                    <div className="block">
                                        {formatDate(movie.release_date, "MMM DD, YYYY")}
                                    </div>
                                </div>

                                <CircularProgressBar text={movie.vote_average.toFixed(1)} value={movie.vote_average} remain={movie.vote_average} color="text-green-600" />
                            </div>
                        </div>) : ''}
                    </div>
                </div> : ""}

            {showDialog ?
                <Dialog open={showDialog} onClose={handleDialogClose} title="Play Trailer">
                    <iframe className="object-contain" width={1064} height={550} src={`https://www.youtube.com/embed/${getTrailer(movie.videos)}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </Dialog> : ''}
        </div>
    )
}