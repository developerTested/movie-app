import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SearchResultItemType, SearchResultsType } from '../types/tmdb';
import { ApiRoutes, createImageUrl, formatDate } from '../utilities/helper';
import ReactPaginate from 'react-paginate';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function SearchPage() {

    const wrapperRef = useRef<HTMLDivElement>(null)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [paginate, setPaginate] = useState<SearchResultsType | null>(null)
    const [results, setResults] = useState<SearchResultItemType[]>([])

    // Get Query from url
    const query = searchParams.get('q');

    function handlePageClick(event: { selected: number }) {
        const selectedPage = event.selected + 1;

        fetchData(selectedPage);
    }

    async function fetchData(page = 1) {

        setLoading(true);

        try {
            const { data: response } = await axios.get(`${ApiRoutes.search.movie}&query=${query}&page=${page}`)

            const { results, ...paginate } = response;

            setResults(results);

            setPaginate(paginate);

            setLoading(false);
            if (wrapperRef.current) {
                wrapperRef.current.scrollIntoView();
            }

        } catch (error) {
            setLoading(true);
        }
    }

    useEffect(() => {

        if (query) {
            fetchData();
        }

        return () => {
            setResults([]);
        }
    }, [query])

    return (
        <div ref={wrapperRef} className='container max-w-screen-lg pt-16'>

            {loading && !results.length ? <div className="block w-full space-y-2 mb-4">
                {Array.from(new Array(20)).map((i) => <div key={i} className='flex items-start gap-4 animate-pulse'>
                    <div className="cover shrink-0 w-24 h-40 bg-white/10 rounded-lg flex items-center justify-center">
                        <svg className="w-14 h-14 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                    <div className="w-full block details space-y-2">
                        <div className="w-full h-8 rounded bg-white/10"></div>

                        <div className="w-full md:w-60 h-8 rounded bg-white/10"></div>

                        <div className="summary line-clamp-2 h-20 bg-white/10"></div>
                    </div>
                </div>)}
            </div> :

                <div className="block space-y-2">
                    {results.length ? results.map((movie) =>
                        <div key={movie.id} className='flex items-start gap-4 text-slate-300'>
                            <Link to={`/movie/${movie.id}`} className="cover shrink-0 w-28 h-40">
                                <LazyLoadImage src={createImageUrl(movie.poster_path, "w92")} alt={movie.title} className='w-full h-full object-cover rounded-lg' />
                            </Link>
                            <div className="details space-y-2">
                                <Link to={`/movie/${movie.id}`} className='text-xl font-bold flex items-center gap-2'>
                                    {movie.title}
                                </Link>

                                {movie.release_date ?
                                    <div className="flex items-center gap-4">
                                        <div className="released">
                                            {formatDate(movie.release_date, "MMM DD, YYYY")}
                                        </div>
                                    </div> : ""}
                                <div className="summary line-clamp-2">
                                    {movie.overview}
                                </div>
                            </div>

                        </div>
                    ) : <div className="flex items-center justify-center size-full">
                        <div className="text-3xl">
                            No Results found!
                        </div>
                    </div>}


                    {results.length && paginate?.page ?
                        <div className="pagination mx-auto mt-4">
                            <ReactPaginate
                                containerClassName="flex items-center gap-2"
                                pageClassName="rounded-full shrink-0 w-10 h-18"
                                pageLinkClassName="rounded-full block size-full p-2 text-center bg-input hover:bg-black"
                                nextLinkClassName="px-4 py-2 text-center bg-input rounded"
                                previousLinkClassName="px-4 py-2 text-center bg-input rounded"
                                activeLinkClassName="bg-blue-500"
                                disabledLinkClassName="opacity-50 cursor-not-allowed"
                                breakLabel="..."
                                nextLabel="Next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={paginate.total_pages}
                                previousLabel="< Previous"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                        : ""}
                </div>}
        </div>
    )
}
