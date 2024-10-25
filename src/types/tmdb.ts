export interface CrewType {
  id: number,
  credit_id: number,
  name: string,
  adult?: false,
  gender: number,
  original_name: string,
  popularity: number,
  profile_path?: string,
  department: string,
  known_for_department: string,
  job: string
}

export type MiniCrewType = {
  id: number,
  credit_id: number,
  name: string,
  original_name: string,
  job: string,
  department: string,
  jobs?: string[]
}

export interface MovieListType {
  id: number,
  title: string,
  original_title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  adult: boolean,
  genre_ids: number[],
  original_language: string,
  popularity: number,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

export interface ElementType {
  type:
  | 'Bloopers'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Clip'
  | 'Trailer'
  | 'Teaser'
}

export interface BaseMovieType {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollectionType
  certificate?: {
    iso_3166_1: string
    release_dates: ReleaseDateType[],
  },
  budget: number
  
  genres: GenreType[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompanyType[]
  production_countries: ProductionCountryType[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguageType[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: VideosType
  images: ImagesType
  credits: CreditsType
  similar: SimilarType
  release_dates: {
    results: [{
      iso_3166_1: string
      release_dates: ReleaseDateType[],
    }],
  }
}

export interface MovieType extends BaseMovieType {
  genres: GenreType[]
}

export interface BelongsToCollectionType {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface GenreType {
  id: number
  name: string
}

export interface ProductionCompanyType {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

export interface ProductionCountryType {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguageType {
  english_name: string
  iso_639_1: string
  name: string
}

export interface VideosType {
  results: ClipType[]
}

export interface ClipType {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface ImagesType {
  backdrops: BackdropType[]
  logos: LogoType[]
  posters: PosterType[]
}

export interface BackdropType {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface LogoType {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface PosterType {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface CreditsType {
  cast: CastType[]
  crew: CrewType[]
}

export interface CastType {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface SimilarType {
  page: number
  results: MovieType[]
  total_pages: number
  total_results: number
}

export interface ReleaseDateType {
  certification: string
  descriptors: string[]
  iso_639_1: string
  note: string
  release_date: string
  type: number
}


export type SearchResultsType = {
  page: number
  total_pages: number
  total_results: number
  results: SearchResultItemType[]
}


export type PaginateType = {
  page: number
  total_pages: number
  total_results: number
}

export type SearchResultItemType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}