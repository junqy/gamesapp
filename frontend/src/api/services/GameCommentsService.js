import { httpGet } from "../ApiService";

const url = "/comments"

export async function getGameComments(id) {
    return httpGet(url + `/${id}`)
}