import { httpGet, httpPatch } from "../ApiService";

const url = "users";

export async function getUserEntity(id) {
    return httpGet(`${url}/${id}`);
}

export async function getUserFriends(id) {
    return httpGet(`${url}/${id}/friends`);
}

export async function addRemoveFriend(id, friendId) {
    return httpPatch(`${url}/friends/${id}/${friendId}`);
}
