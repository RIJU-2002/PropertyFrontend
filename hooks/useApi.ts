import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import axiosInstance from '@/lib/api/axios'
import { Property, ApiResponse,GeocodeResponse,ProjectsResponse  } from '@/lib/api/types'

// Properties
export const useProperties = (params?: Record<string, any>): UseQueryResult<Property[], Error> =>
  useQuery({
    queryKey: ['properties', params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Property[]>>('/properties', {
        params,
      })
      return data.data || []
    },
  })

export const useProperty = (id: string): UseQueryResult<Property, Error> =>
  useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<Property>>(`/properties/${id}`)
      return data.data!
    },
    enabled: !!id,
  })

export const useCreateProperty = (): UseMutationResult<Property, Error, Partial<Property>> =>
  useMutation({
    mutationFn: async (newProperty) => {
      const { data } = await axiosInstance.post<ApiResponse<Property>>('/properties', newProperty)
      return data.data!
    },
  })

export const useUpdateProperty = (
  id: string
): UseMutationResult<Property, Error, Partial<Property>> =>
  useMutation({
    mutationFn: async (updatedProperty) => {
      const { data } = await axiosInstance.put<ApiResponse<Property>>(
        `/properties/${id}`,
        updatedProperty
      )
      return data.data!
    },
  })

export const useDeleteProperty = (): UseMutationResult<void, Error, string> =>
  useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/properties/${id}`)
    },
  })




export const useCreateProject = () =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post(
        '/projects',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return data
    },
  })





  export interface Amenity {
  id: number;
  name: string;
  category: string;
}

export const useAmenities = () =>
  useQuery({
    queryKey: ['amenities'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/amenities');
      return data.data as Amenity[];
    },
  });

export const useGeocodeLocation = () =>
  useMutation({
    mutationFn: async (address: string) => {
      const { data } = await axiosInstance.post<
        ApiResponse<GeocodeResponse>
      >('/geo/geocode', {
        address,
      });

      return data.data!;
    },
  });


 
export const useProjects = () =>
  useQuery<ProjectsResponse>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProjectsResponse>('/projects');
      return data;
    },
  });