import axios from "axios";
import axiosRetry from "axios-retry";
import { axiosErrorHandlers } from "./services/ErrorHandler";

export const JSON_FORMAT = "application/json";
export const MULTIPART_FORM_DATA_FORMAT = "multipart/form-data";
export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 10000,
});

function isAbortedOrSafeRequestError(error) {
    return (
        axiosRetry.isSafeRequestError(error) || error.code === "ECONNABORTED"
    );
}

axiosRetry(api, {
    retries: 2,
    retryCondition: isAbortedOrSafeRequestError,
    shouldResetTimeout: true,
    retryDelay: axiosRetry.exponentialDelay,
});

export const setToken = (isLoggedIn) => {
    if (!isLoggedIn) {
        delete api.defaults.headers.common["Authorization"];
        return;
    }
    if (localStorage.getItem("jwtToken") !== "undefined") {
        api.defaults.headers.common["Authorization"] = "Bearer ".concat(
            JSON.parse(localStorage.getItem("jwtToken"))
        );
    }
};

export async function httpRequest(
    method,
    url,
    body,
    contentType,
    params,
    config
) {
    return api
        .request({
            url,
            method,
            params,
            paramsSerializer: formatParams(),
            data: processBody(body, contentType),
            headers: {
                "Content-Type": contentType,
            },
            ...config,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return handleRequestError(error);
        });
}

export async function httpRequestPostForm(url, body) {
    return api
        .postForm(url, body)
        .then((response) => response.data)
        .catch((error) => axiosErrorHandlers.responseErrorHandler(error));
}

export function handleRequestError(error) {
    return axiosErrorHandlers.responseErrorHandler(error);
}

function formatParams(urlParams) {
    if (!urlParams) {
        return {};
    }

    return Object.entries(urlParams)
        .map((entry) => {
            if (entry[1] === undefined) {
                return {};
            }

            if (entry[1] === null) {
                return encodeURIComponent(entry[0]);
            }

            return `${encodeURIComponent(entry[0])}=${encodeURIComponent(
                entry[1]
            )}`;
        })
        .join("&");
}

function processBody(body, contentType) {
    if (contentType === JSON_FORMAT) {
        return body ? JSON.stringify(body) : {};
    } else if (contentType === MULTIPART_FORM_DATA_FORMAT) {
        const formData = new FormData();

        for (const field in body) {
            if (body.hasOwnProperty(field)) {
                formData.append(field, body[field]);
            }
        }

        return formData;
    }
}
