import axios from 'axios'
import { RefreshTokenPayload, RegisterPayload } from '@/lib/redux/features/auth/slice'

export const loginApi = (email: string, password: string) =>
	axios.post('http://localhost:3001/auth/login', { email, password });

export const logoutApi = () => axios.post('http://localhost:3001/auth/logout');

export const registerApi = (payload: RegisterPayload) => axios.post('http://localhost:3001/auth/register', payload)

export const refreshTokenApi = (payload: RefreshTokenPayload) => axios.post('http://localhost:3001/auth/refresh-token', payload)
