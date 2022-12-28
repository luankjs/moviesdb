import axios from 'axios'

const tstapi = axios.create({
  baseURL: 'https://tstapi.ffcloud.com.br',
})

const omdbApi = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {apiKey: process.env.OMBD_API_KEY}
})

export {tstapi, omdbApi}