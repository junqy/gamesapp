import { httpGetAPI } from "../../ApiService";

const url = '/games'
const apiKey = process.env.REACT_APP_API_KEY

export async function getGames(page) {
    return httpGetAPI(url + `?key=${apiKey}&page=${page}`)
}