import { httpGet, httpGetAPI, httpPatch } from "../../ApiService";

const url = '/games'
const apiKey = process.env.REACT_APP_API_KEY

export async function getGames(page, param, id) {
    if (!param) {
        return httpGetAPI(url + `?key=${apiKey}&page=${page}`)
    } else {
        return httpGetAPI(url + `?key=${apiKey}&page=${page}&${param}=${id}`)
    }
    
}

export async function getGameDetails(id) {
    return httpGetAPI(url + `/${id}?key=${apiKey}`)
}

export async function getGameDatabase(id) {
    return httpGet(url + `/${id}`)
}

export async function getGameTrailers(id) {
    return httpGetAPI(url + `/${id}/movies?key=${apiKey}`)
}

export async function getGameScreenshots(id) {
    return httpGetAPI(url + `/${id}/screenshots?key=${apiKey}`)
}

export async function getGameReddits(id) {
    return httpGetAPI(url + `/${id}/reddit?key=${apiKey}`)
}

export async function rateGame(id, data) {
    return httpPatch(url + `/${id}/rate`, data)
}