import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { loginRequest, loginSuccess, loginFailure, logoutRequest, logoutSuccess } from './slice';
import { DecodeUser, User } from '@/types/user'
import { jwtDecode } from 'jwt-decode'

// --- API Calls ---
const loginApi = (email: string, password: string) =>
	axios.post('http://localhost:3001/auth/login', { email, password });

const logoutApi = () => axios.post('http://localhost:3001/auth/logout');


// --- Worker Sagas ---
function* handleLogin(action: ReturnType<typeof loginRequest>) {
	try {
		const response: AxiosResponse<{ user: User; accessToken: string, refreshToken: string }> = yield call(
			loginApi,
			action.payload.email,
			action.payload.password
		);

		const { accessToken, refreshToken } = response.data;

		Cookies.set('accessToken', accessToken, { expires: 7 });
		Cookies.set('refreshToken', refreshToken, { expires: 30 });

		// Lưu token vào cookie
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		Cookies.set('authToken', accessToken);
		const decodedUser: DecodeUser = jwtDecode(accessToken);
		const user = {
			id: decodedUser.sub,
			email: decodedUser.email,
		};
		yield put(loginSuccess({ user, accessToken, refreshToken }));

		if (action.payload.cb) {
			action.payload.cb({ success: true });
		}

	} catch (error: any) {
		const errorMessage = error.response?.data?.message || 'An unknown error occurred';
		yield put(loginFailure(errorMessage));
		if (action.payload.cb) {
			action.payload.cb({ success: false, error: errorMessage });
		}
	}
}

function* handleLogout() {
	try {
		yield call(logoutApi);
	} catch (error) {
		console.error("Logout API failed, proceeding with client-side logout.", error);
	} finally {
		// Xóa cookie dù API có lỗi hay không
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
		Cookies.remove('authToken');
		yield put(logoutSuccess());
	}
}

export function* authSaga() {
	yield takeLatest(loginRequest.type, handleLogin);
	yield takeLatest(logoutRequest.type, handleLogout);
}