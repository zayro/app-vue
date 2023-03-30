import { http } from '../services/http-axios'

const url = '/general/select/adminApt.pagos'

// Request

export const getUsers = async () => {
  const { data } = await http.get(url)
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

export const deleteUsers = async (deleteCondition) => {
  // const sentInfo = { data: { delete: "prueba", condition: { id: "12" } } }

  const sentInfo = {
    data: { delete: deleteCondition.table, condition: deleteCondition.where }
  }

  return await http.delete('/general/delete', sentInfo)
}
