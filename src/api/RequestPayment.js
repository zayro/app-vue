import { http } from '../services/http-axios'

/**
 *
 * @returns {Json}
 */
export const getData = async () => {
  const { data } = await http.get('/general/select/adminApt.pagos')
  return data
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
