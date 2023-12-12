import { ref } from 'vue'
import axios from 'axios'

export function useProductInfo () {
  const productInfo = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchProductInfo (productId) {
    isLoading.value = true
    try {
      const response = await axios.get(`/api/products/${productId}`)
      productInfo.value = response.data
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return {
    productInfo,
    isLoading,
    error,
    fetchProductInfo
  }
}
