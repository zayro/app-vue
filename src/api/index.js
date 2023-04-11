import { http } from '../services/http-axios'

// Request

/**
 *
 * @returns {Json}
 */
export const getData = async (url) => {
  const { data } = await http.get(url)
  return data
}

export const getDataFilter = async ({ url, From, Fields, Where }) => {
  const payload = {
    from: From,
    fields: Fields,
    where: Where
  }
  console.log('🚧 - getDataFilter - payload:', payload)
  const { data } = await http.post(url, payload)
  return data
}

export const postUsers = async (data) => {
  const sentInfo = {
    insert: 'pagos',
    values: data
  }

  return await http.post('/general/insertIncrement', sentInfo)
}

export const putUsers = async (data) => {
  const sentInfo = {
    update: 'prueba',
    set: data,
    where: { id: data.id }
  }

  return await http.put('/general/update', sentInfo)
}

/**
 *
 * @param {*} deleteCondition
 * @returns
 * @example { data: { delete: "prueba", condition: { id: "12" } } }
 */
export const deleteData = async ({ table, condition }) => {
  const payload = {
    db: 'enterprise',
    delete: table,
    condition
  }
  console.log('🚧 - deleteData - sentInfo:', payload)

  return await http.delete('/general/delete', { data: payload })
}
