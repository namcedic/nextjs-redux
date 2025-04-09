const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";


import axios from 'axios';

const api = axios.create({
  baseURL: `${API_BASE}`, // your external BE endpoint
  withCredentials: true, // send cookies if auth uses them
});

export default api;
