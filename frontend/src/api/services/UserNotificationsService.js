import { httpDelete, httpGet, httpPost } from "../ApiService";

const url = "notifications";

export async function getEntities(id) {
    return httpGet(`${url}/${id}`);
}

export async function remove(id) {
    return httpDelete(url, id);
}

export async function removeAll() {
    return httpDelete(url, null);
}

export async function create(data) {
    return httpPost(url, data)
}
