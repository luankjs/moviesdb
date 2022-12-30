import axios from 'axios'

const tstapi = axios.create({
  baseURL: 'https://tstapi.ffcloud.com.br',
})

tstapi.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const storagedCurrentUser = localStorage.getItem('currentUser')
      if (storagedCurrentUser)
        config.headers.Authorization = `Bearer ${
          JSON.parse(storagedCurrentUser).token
        }`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com',
})

export { tstapi, omdbApi }
