import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import axiosInstance from '@/lib/api/axios'
import { Property, ApiResponse,GeocodeResponse,ProjectsResponse,FeaturedProjectsResponse ,ArticleDetail,ArticlesResponse } from '@/lib/api/types'
import { fetchDashboardAnalytics } from "@/lib/analyticsApi";


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


 
export const useProjects = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["projects", params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProjectsResponse>(
        "/projects",
        {
          params,
        }
      );

      return data;
    },
  });


  export const useFeaturedProjects = (citySlug?: string) =>
  useQuery({
    queryKey: ["featured-projects", citySlug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<FeaturedProjectsResponse>(
        "/projects/featured",
        {
          params: citySlug ? { city: citySlug } : {},
        }
      );

      return data.projects;
    },
  });


  export const useProjectbySlug = (slug: string) =>
  useQuery({
    queryKey: ["project", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/projects/${slug}`);
      return data;
    },
    enabled: !!slug,
  });


  export const fetchProjectbyId = (
  id: string,
  enabled = true
) =>
  useQuery({
    queryKey: ["project", id],
    enabled,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/projects/id/${id}`);
      return data.data; // return only the project object
    },
  });

  export const usePublishedArticles = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ['articles', params],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ArticlesResponse>('/articles/public', { params });
      return data;
    },
  });

export const useArticleBySlug = (slug: string) =>
  useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse<ArticleDetail>>(`/articles/public/${slug}`);
      return data.data!;
    },
    enabled: !!slug,
  });

export const useCreateArticle = () =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosInstance.post('/articles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
  });

export const usePublishArticle = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.post(`/articles/${id}/publish`);
      return data;
    },
  });

export const useArticleCategories = () =>
  useQuery({
    queryKey: ['article-categories'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/articles/categories');
      return data.data as { id: string; name: string; slug: string }[];
    },
  });

export const useArticleTags = () =>
  useQuery({
    queryKey: ['article-tags'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/articles/tags');
      return data.data as { id: string; name: string; slug: string }[];
    },
  });


export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: fetchDashboardAnalytics,
  });
}

// ─── Agents ───────────────────────────────────────────────────────────────
// Add these alongside your existing useCreateProject / fetchProjectbyId in
// hooks/useApi.ts — same useMutation/useQuery + axiosInstance pattern.

export const useCreateUser = () =>
  useMutation({
    mutationFn: async (payload: {
      phone: string
      name?: string
      email?: string
      role?: 'BUYER' | 'AGENT' | 'ADMIN'
      agencyName?: string
      reraNumber?: string
      licenseUrl?: string
    }) => {
      const { data } = await axiosInstance.post('/users', payload)
      return data
    },
  })

export const useCreateAgent = () =>
  useMutation({
    mutationFn: async (payload: {
      phone?: string
      userId?: number
      agencyName?: string
      reraNumber?: string
    }) => {
      const { data } = await axiosInstance.post('/agents', payload)
      return data
    },
  })

export const fetchAgentById = (
  id: string,
  enabled = true
) =>
  useQuery({
    queryKey: ["agent", id],
    enabled,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/agents/${id}`);
      return data.data; // return only the agent object
    },
  });