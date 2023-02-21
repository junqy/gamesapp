import { httpDelete, httpGet, httpPatch, httpPost } from "../ApiService";

const url = "/comments"

export async function getGameComments(id) {
    return httpGet(url + `/${id}`)
}

export async function likeDislikeComment(id, body) {
    return httpPatch(url + `/${id}/like`, body)
}

export async function addComment(body) {
    return httpPost(url, body)
}

export async function removeComment(id) {
    return httpDelete(url, id)
}