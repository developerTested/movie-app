import { useEffect, useRef, useState } from "react"
import { MovieListType } from "../types/tmdb"
import axios from "axios"
import { ApiRouteKeys, ApiRoutes, createImageUrl, formatDate, getGenreFromId } from "../utilities/helper"
import { Link } from "react-router-dom"
import CircularProgressBar from "./CircularProgressBar"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { LazyLoadImage } from "react-lazy-load-image-component"

type MovieRowProps = {
    title: string,
    url: ApiRouteKeys
}

export default function MovieRow({ title, url = "popular" }: MovieRowProps) {

    const [loading, setLoading] = useState(true)
    const [movieList, setMovieList] = useState<MovieListType[]>([])
    const [curr, setCurr] = useState(1);

    const carouselRef = useRef<HTMLDivElement>(null);

    const paginate = (items: MovieListType[] = [], page = 1, perPage = 5) => {

        // const offset = perPage * (page - 1);
        const totalPages = Math.ceil(items.length / perPage);

        return {
            previousPage: page - 1 ? page - 1 : null,
            nextPage: (totalPages > page) ? page + 1 : null,
            total: items.length,
            totalPages: totalPages,
        };
    };

    const navigation = (dir: string) => {
        const container = carouselRef.current;

        if (!container) return false;

        const scrolled = dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20);


        dir === "left" ? setCurr(previousPage ? previousPage : 1) : setCurr(nextPage ? nextPage : 1);

        container.scrollTo({
            left: scrolled,
            behavior: "smooth",
        });

    };

    const { nextPage, previousPage } = paginate(movieList, curr);

    const fetchRandomBanner = async () => {
        setLoading(true);

        try {

            const fullUrl = ApiRoutes[url];

            const { data: response } = await axios.get(fullUrl)

            const movieList = response.results;

            setMovieList(movieList)

            setLoading(false)

        } catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {

        fetchRandomBanner()

        return () => {
            setLoading(true);
            setCurr(1)
        }
    }, [url])

    return (
        <div className="block w-full space-y-4 overflow-x-auto my-4">
            <div className="font-semibold text-2xl px-4 py-2">
                {title}
            </div>

            {loading ? <div className="animate-pulse flex items-start gap-4">
                {Array.from(new Array(10)).map((_, movie) => <div key={movie} className="relative shrink-0 block">
                    <div className="flex items-center justify-center min-w-60 min-h-80 relative text-center">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                    <div className="details pt-2 flex items-center justify-between gap-4">
                        <div className="flex-1 info flex flex-col gap-y-1.5">
                            <h3 className="title">
                                <div className="w-full h-8 rounded bg-white/10"></div>
                            </h3>
                            <div className="w-full h-6 rounded bg-white/10"></div>
                        </div>
                        <div className="rating shrink-0">
                            <div className="w-9 h-9 rounded-full bg-white/10"></div>
                        </div>
                    </div>
                </div>)}
            </div> :

                <div className="container relative">

                    <button
                        onClick={() => navigation('left')}
                        className={`${previousPage ? 'block' : 'hidden'} z-10 absolute top-1/2 left-0 p-1 rounded-full shadow-lg bg-input hover:bg-midnight`}
                    >
                        <MdChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={() => navigation('right')}
                        className={`${nextPage ? 'block' : 'hidden'} z-10 absolute top-1/2 right-0 p-1 rounded-full shadow-lg bg-input hover:bg-midnight`}
                    >
                        <MdChevronRight className="w-8 h-8" />
                    </button>

                    <div ref={carouselRef} className="flex overflow-hidden gap-4 snap-x snap-mandatory transition-all duration-500">

                        {movieList.length ? movieList.map((movie) => <div key={movie.id} className="relative space-y-2 shrink-0 block w-60 h-auto duration-500 hover:scale-105 hover:shadow-xl">

                            <div className="relative">

                                <Link to={`/movie/${movie.id}`} className='flex items-center justify-center w-60 h-350 relative text-center'>
                                    <LazyLoadImage src={createImageUrl(movie.poster_path, "w300")} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
                                </Link>

                                <div className="flex items-center flex-wrap gap-2 absolute left-2 right-2 bottom-2">
                                    {movie.genre_ids.map((x) => <div key={x} className="block text-sm px-2 rounded-lg bg-input">
                                        {getGenreFromId(x)}
                                    </div>)}
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-4 py-2">
                                <div className="block w-full">
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
                </div>}
        </div>
    )
}
