import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = ( id ) => {
    return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }
