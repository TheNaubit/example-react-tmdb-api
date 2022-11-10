import { BASE_API_URL, BASE_MOVIES_SECTION_URL } from "@constants";
import { IMovie, IMovieDetailed } from "@types";
import axios from "axios";
import urlcat from "urlcat";

export function getTopMovies({pageParam  = 1}: {pageParam ?: number}) {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_MOVIES_SECTION_URL}/top_rated`, {api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US", page: pageParam })

    return axios
        .get(queryURL)
        .then((res) => (res.data) as {
            page: number,
            results: Array<IMovie>
        })
}

export function getMovieDetails({id}:{id:number}) {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_MOVIES_SECTION_URL}/:id`, {id, api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US"})

    return axios
        .get(queryURL)
        .then((res) => res.data as IMovieDetailed)
}

export function getSimilarMovies({id}:{id:number}) {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_MOVIES_SECTION_URL}/:id/similar`, {id, api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US", page: 1})

    return axios
        .get(queryURL)
        .then((res) => (res.data?.results || []) as Array<IMovie>)
}