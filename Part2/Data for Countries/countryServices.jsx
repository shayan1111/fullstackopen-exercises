import axios from 'axios'

const getAll = (baseURL) => {
    return axios.get(baseURL)
}

export default {
    getAll
}