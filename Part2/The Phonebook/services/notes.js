import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseURL)
}

const createUser = newObject => {
    return axios.post(baseURL, newObject)
}

const deleteUser = deleteId => {
    return axios.delete(`${baseURL}/${deleteId}`)
}

const updateUser = (id, newObject) => {   
    return axios.put(`${baseURL}/${id}`, newObject)
}

export default {
    getAll: getAll, 
    createUser: createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}
