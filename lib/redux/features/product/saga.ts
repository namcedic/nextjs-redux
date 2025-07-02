import { call, put, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { getProductsFailure, getProductsSuccess, Product, productsRequest } from './slice'
import { getProductsApi } from '@/services/product'

function* handleGetProducts(action: ReturnType<typeof productsRequest>) {
	try {
		const response: AxiosResponse<{ data: { products: Product[]; total: number; error?: string } }> = yield call(
			getProductsApi,
			action.payload
		)

		const { products, total } = response.data.data

		yield put(getProductsSuccess({ products, total }))

		if (action.payload.cb) {
			action.payload.cb({ products, total })
		}
	} catch (error: any) {
		const errorMessage = error.response?.data?.message || 'An unknown error occurred'
		yield put(getProductsFailure(errorMessage))
		if (action.payload.cb) {
			action.payload.cb({ products: [], total: 0, error: errorMessage })
		}
	}
}

export function* productSaga() {
	yield takeLatest(productsRequest.type, handleGetProducts)
}
