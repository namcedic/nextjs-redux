import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'

const api = axios.create({
	baseURL: `${API_BASE}`, // your external BE endpoint
	withCredentials: true // send cookies if auth uses them
})

export default api
