import moment from "moment"
import { movieGenreList, tvGenreList } from "./genre"
import { VideosType } from "@/types/tmdb"

export const original_url = 'https://image.tmdb.org/t/p/original/'
export const movie_cropped_bg_url = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/'
export const poster_url = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_THE_MOVIE_DB_KEY

export type ApiRouteKeys = 'popular' | 'top_rated' | 'upcoming' | 'now_playing' | 'people';

export const ApiRoutes = {
    popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    top_rated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
    now_playing: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
    people: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    discover: {
        movie: `${BASE_URL}/discover/movie?api_key=${API_KEY}`,
        tv: `${BASE_URL}/discover/tv?api_key=${API_KEY}`,
    },
    search: {
        movie: `${BASE_URL}/search/movie?api_key=${API_KEY}`,
        tv: `${BASE_URL}/search/tv?api_key=${API_KEY}`,
        person: `${BASE_URL}/search/person?api_key=${API_KEY}`,
    },
}

export function findMovieById(movieId: string) {
    return `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images,credits,similar,release_dates`
}



export function findMovieRecommendationById(movieId: string) {
    return `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`
}

export function createImageUrl(filename: string, size = "w300") {

    if (!filename) {
        return "/no-avatar.png";
    }

    return `https://media.themoviedb.org/t/p/${size}/${filename}`
}

export function formatDuration(minutes: number) {
    const duration = moment.duration(minutes, 'minutes');

    const hours = Math.floor(duration.asHours());
    const mins = duration.minutes();

    return `${hours} ${hours > 1 ? 'Hours' : 'Hour'} ${mins > 0 ? `, ${mins} ${mins > 1 ? 'Minutes' : 'Minute'}` : ''}`;
}

export const formatDate = (date: string, format = "L") => moment(date).format(format)




export const getTrailer = (videoList: VideosType, trailerType = "Trailer") => {



    const filteredTrailers = videoList.results.filter((x) => x.type === trailerType);


    filteredTrailers.sort((a, b) => {

        if(a.published_at > b.published_at) return 1;
        
        if(a.published_at < b.published_at) return -1;

        return 0;
    });

    
    if(!filteredTrailers.length) return "";

    const trailer = filteredTrailers.length ? filteredTrailers.pop() : null;

    return trailer ? trailer.key : "";
}

export function getInitials(inputName: string) {
    const names = inputName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
}

export function getGenreFromId(genreId: number, type = "movie") {

    let found = null;

    if (type === "tv") {
        found = tvGenreList.find((x) => x.id === genreId)
    } else if (type === "movie") {
        found = movieGenreList.find((x) => x.id === genreId)
    }

    return found ? found.name : null;
}