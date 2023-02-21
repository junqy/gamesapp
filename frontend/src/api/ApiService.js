import { httpRequest, httpRequestPostForm, httpRequestRawgApi, JSON_FORMAT, MULTIPART_FORM_DATA_FORMAT } from "./ApiUtils"

export function httpGet(url, params, config = {}) {
    return httpRequest('GET', url, null, null, params, config)
}

export function httpGetAPI(url, params, config = {}) {
    return httpRequestRawgApi('GET', url, null, null, params, config)
}

export function httpPost(url, body) {
    return httpRequest('POST', url, body, JSON_FORMAT)
}

export function httpPostMultipart(url, body) {
    return httpRequest('POST', url, body, MULTIPART_FORM_DATA_FORMAT)
}

export function httpPostForm(url, body) {
    return httpRequestPostForm(url, body)
}

export function httpPut(url, body) {
    return httpRequest('PUT', url, body, JSON_FORMAT)
}

export function httpPatch(url, body) {
    return httpRequest('PATCH', url, body, JSON_FORMAT)
}

export function httpDelete(url, id) {
    return httpRequest('DELETE', url + `/${id ? id : ""}`, null, JSON_FORMAT)
}
