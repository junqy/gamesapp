import { httpPost } from '../ApiService'
import { api } from '../ApiUtils'

const url = "auth"

export async function authenticate(credentials) {
    return httpPost(url + '/login', credentials)
        .then((response) => {
            if (!response.error) {
                localStorage.setItem("jwtToken", JSON.stringify(response.token))
                api.defaults.headers.common['Authorization'] = 'Bearer ' + response.token
            }

            return response
        })
}

export async function register(user) {
    return httpPost(url + "/register", user)
}

export function logout() {
    localStorage.removeItem("jwtToken")
    delete (api.defaults.headers.common['Authorization'])
}
