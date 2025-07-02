import { all } from 'redux-saga/effects'
import { authSaga } from '@/lib/redux/features/auth/saga'
import { productSaga } from '@/lib/redux/features/product/saga'

export function* rootSaga() {
	yield all([authSaga(), productSaga()])
}
