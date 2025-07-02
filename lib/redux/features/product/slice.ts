import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
	id: number
	name: string
	description: string
}

export interface ProductState {
	products: Product[] | []
	total: number
	loading: boolean
	error: string | null
}

export interface getProductsPayload {
	key?: string
	page: number | 1
	limit: number | 20
}

const initialState: ProductState = {
	products: [],
	total: 0,
	loading: false,
	error: null
}

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productsRequest: (
			state,
			action: PayloadAction<{
				page: number
				limit: number
				key?: string
				cb?: (result: { products: Product[]; total: number; error?: string }) => void
			}>
		) => {
			state.loading = true
			state.error = null
		},
		getProductsSuccess: (state, action: PayloadAction<{ products: Product[]; total: number; error?: string }>) => {
			state.products = action.payload.products
			state.total = action.payload.total
			state.loading = false
		},
		getProductsFailure: (state, action: PayloadAction<string>) => {
			state.products = []
			state.loading = false
			state.error = action.payload
		}
	}
})

export const { productsRequest, getProductsSuccess, getProductsFailure } = productSlice.actions

export default productSlice.reducer
