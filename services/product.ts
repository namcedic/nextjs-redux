import axios from '../utils/axios'
import { getProductsPayload } from '@/lib/redux/features/product/slice'

export const getProductsApi = async (payload: getProductsPayload) => {
	return axios.get('/products', {
		params: {
			key: payload.key || '',
			page: payload.page || 1,
			limit: payload.limit || 10
		}
	})
}
