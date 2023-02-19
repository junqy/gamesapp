import { httpGet, httpGetAPI } from "../../ApiService";

const url = '/games'
const apiKey = process.env.REACT_APP_API_KEY

export async function getGames(page) {
    return httpGetAPI(url + `?key=${apiKey}&page=${page}`)
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

//https://api.rawg.io/api/games/3498/movies?key=8da0937aad7a4eeb94b880a71a9ca9c0&