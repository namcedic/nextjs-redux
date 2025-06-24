import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user'; // Chúng ta sẽ tạo file type này ngay sau đây

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	accessToken: null,
	refreshToken: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Action này sẽ được saga lắng nghe
		loginRequest: (
			state,
			action: PayloadAction<{
				email: string;
				password: string;
				cb?: (result: { success: boolean; error?: string }) => void;
			}>
		) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string; }>) => {
			state.isAuthenticated = true;
			state.loading = false;
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.isAuthenticated = false;
			state.loading = false;
			state.error = action.payload;
			state.user = null;
			state.accessToken = null;
			state.refreshToken = null;
		},
		// Action này cũng sẽ được saga lắng nghe
		logoutRequest: (state) => {
			state.loading = true;
		},
		logoutSuccess: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.refreshToken = null;
			state.accessToken = null;
			state.loading = false;
		},
		// Action để load state từ cookie khi tải lại trang
		loadAuthFromCookie: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string; }>) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		}
	},
});

export const {
	loginRequest,
	loginSuccess,
	loginFailure,
	logoutRequest,
	logoutSuccess,
	loadAuthFromCookie
} = authSlice.actions;

export default authSlice.reducer;