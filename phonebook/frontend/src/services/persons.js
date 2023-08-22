import axios from 'axios'

import config from '../config'

const baseUrl = config.BACKEND_URL

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
