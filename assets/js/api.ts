import axios from 'axios'
const api = axios.create({
  baseURL: 'https://t.api.unipass.id/admin',
  timeout: 25000,
  headers: {
    // Authorization: 'Bearer xxxxxx',
  },
})

declare module 'axios' {
  interface AxiosResponse<T = any> {
    code: number
    message: string
    data: T
  }
}

// https://axios-http.com/zh/docs/interceptors
api.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return error
  },
)

// https://axios-http.com/zh/docs/interceptors
api.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    const code = error?.response?.status
    if (code === 401) {
      // token Expired
      const { authorization: accessToken, refreshtoken: refreshToken } = error.response.headers
      api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
      api.defaults.headers.common['refreshToken'] = refreshToken
      error.response.config.headers['Authorization'] = 'Bearer ' + accessToken
      error.response.config.headers['refreshToken'] = refreshToken
      try {
        const accountJSON = window.localStorage.getItem('UP-BOT') || ''
        const account = JSON.parse(accountJSON)
        account.refreshToken = refreshToken
        account.accessToken = accessToken
        window.localStorage.setItem('UP-BOT', JSON.stringify(account))
      } catch (error) {}
      return api.request(error.response.config)
    } else if (code === 403) {
      window.localStorage.removeItem('UP-BOT')
      window.location.href = '/login'
    }
    return error
  },
)

export default api
