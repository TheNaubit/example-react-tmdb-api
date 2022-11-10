export interface IRoute {
    path: string
    element: any
}

export enum ContentType {
    Movie = "movie",
    TV = "tv"
}

export enum LoaderState {
    Loading = "block",
    Loaded = "none"
}

export enum Direction {
    Forward,
    Backward
}

export interface IContentGenre {
    id: number,
    name: string
}

export interface IMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string, // TODO: Create a type with the languages
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string, // It is in format YYYY-MM-DD
    title: string,
    video: boolean,
    vote_average: number, // It is a number between 0 and 10 with 1 decimal place
    vote_count: number
}

export interface ITVProgram {
    backdrop_path: string,
    first_air_date: string, // It is in format YYYY-MM-DD
    genre_ids: Array<number>,
    id: number,
    name: string,
    origin_country: Array<string>, // TODO: Create a type with the countries
    original_language: string, // TODO: Create a type with the languages
    overview: string,
    popularity: number,
    poster_path: string,
    vote_average: number, // It is a number between 0 and 10 with 1 decimal place
    vote_count: number
}

export interface IEpisode {
    air_date: string, // It is in format YYYY-MM-DD
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
    vote_average: number, // It is a number between 0 and 10 with 1 decimal place
    vote_count: number
}

export interface INetwork {
    id: number,
    name: string,
    logo_path: string,
    origin_country: string // TODO: Create a type with the countries
}

export interface IProductionCompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string // TODO: Create a type with the countries
}

export interface IProductionCountry {
    iso_3166_1: string, // TODO: Create a type with the countries
    name: string
}

export interface ISeason {
    air_date?: string, // It is in format YYYY-MM-DD
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number
}

export interface ISpokenLanguage {
    english_name: string,
    iso_639_1: string, // TODO: Create a type with the languages
    name: string
}

export interface ITVProgramDetailed { // Note: We can not extend ITVProgram since this returned object is not exactly an extended object of the ITVProgram object
    adult: boolean,
    backdrop_path: string,
    created_by: Array<string>,
    episode_run_time: Array<number>,
    first_air_date: string, // It is in format YYYY-MM-DD
    genres: Array<IContentGenre>,
    homepage: string,
    id: number,
    in_production: boolean,
    languages: Array<string>, // TODO: Create a type with the languages
    last_air_date: string, // It is in format YYYY-MM-DD
    last_episode_to_air: IEpisode,
    name: string,
    next_episode_to_air?: IEpisode,
    networks: Array<INetwork>,
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: Array<string>, // TODO: Create a type with the countries
    original_language: string, // TODO: Create a type with the languages
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Array<IProductionCompany>,
    production_countries: Array<IProductionCountry>,
    seasons: Array<ISeason>,
    spoken_languages: Array<ISpokenLanguage>,
    status: string,
    tagline: string,
    type: string,
    vote_avergae: number, // It is a number between 0 and 10 with 1 decimal place
    vote_count: number
}

export interface IMovieDetailed { // Note: We can not extend IMovie since this returned object is not exactly an extended object of the IMovie object
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: null, // TODO: This type must be checked!
    budget: number,
    genres: Array<IContentGenre>,
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string, // TODO: Create a type with the languages
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Array<IProductionCompany>,
    production_countries: Array<IProductionCountry>,
    release_date: string, // It is in format YYYY-MM-DD
    revenue: number,
    runtime: number,
    spoken_languages: Array<ISpokenLanguage>,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number, // It is a number between 0 and 10 with 1 decimal place
    vote_count: number
}

export interface ITabItem {
    title: string,
    id: string,
    icon: any,
    color: string,
}

export interface RGBA {
    red: number,
    green: number,
    blue: number,
    alpha: number
}