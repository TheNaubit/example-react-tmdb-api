import { BASE_API_URL, BASE_TV_SECTION_URL } from "@constants";
import { ITVProgram, ITVProgramDetailed } from "@types";
import axios from "axios";
import urlcat from "urlcat";

export function getTopTVPrograms() {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_TV_SECTION_URL}/top_rated`, {api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US", page: 1})

    console.log(queryURL)

    return axios
        .get(queryURL)
        .then((res) => (res.data?.results || []) as Array<ITVProgram>)
}

export function getTVProgramDetails({id}:{id:number}) {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_TV_SECTION_URL}/:id`, {id, api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US"})

    console.log(queryURL)

    return axios
        .get(queryURL)
        .then((res) => res.data as ITVProgramDetailed)
}


export function getSimilarTVPrograms({id}:{id:number}) {
    const queryURL = urlcat(BASE_API_URL, `/${BASE_TV_SECTION_URL}/:id/similar`, {id, api_key: import.meta.env.VITE_TMDB_API_KEY || "", language: "en-US", page: 1})

    return axios
        .get(queryURL)
        .then((res) => (res.data?.results || []) as Array<ITVProgram>)
}