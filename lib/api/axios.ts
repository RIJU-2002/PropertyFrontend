import axios, { AxiosError, AxiosInstance } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

// Request interceptor for JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem('token'))
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Only bounce expired sessions to auth. Missing-token 401s
      // (e.g. CMS create-agent while logged out) should stay on the page.
      if (hadToken && !window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
