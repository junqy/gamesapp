import { httpGet, httpPatch } from "../ApiService";

const url = "users";

export async function getUserEntity(id) {
    return httpGet(`${url}/${id}`);
}

export async function getUserFriends(id) {
    return httpGet(`${url}/${id}/friends`);
}

export async function getUserGames(id) {
    return httpGet(`${url}/${id}/games`)
}

export async function addRemoveFriend(id, friendId) {
    return httpPatch(`${url}/friends/${id}/${friendId}`);
}

export async function addRemoveGame(id, gameId) {
    return httpPatch(`${url}/games/${id}/${gameId}`);
}

export async function uploadPhoto(id, body) {
    return httpPatch(`${url}/picture/${id}`, body)
}

