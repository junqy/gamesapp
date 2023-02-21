import { httpGetAPI } from "../../ApiService";

const apiKey = process.env.REACT_APP_API_KEY

export async function getFilters(page, url) {
    return httpGetAPI(url + `?key=${apiKey}&page=${page}`)
}
