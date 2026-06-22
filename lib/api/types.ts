export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: {
    latitude: number
    longitude: number
    address: string
  }
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface SendOtpRequest {
  mobileNumber: string
}

export interface VerifyOtpRequest {
  mobileNumber: string
  otp: string
}

export interface AuthResponse {
  token: string
   user: {
    id: number
    phone: string
    name: string | null
    email: string | null
    role: "ADMIN" | "BUYER"
    avatarUrl: string | null
    isActive: boolean
  }
}


export interface GeocodeResponse {
  address: string;
  latitude: number;
  longitude: number;
  localityName: string | null;
  cityName: string | null;
  cityId: number | null;
  stateName: string | null;
  stateId: number | null;
  country: string | null;
}