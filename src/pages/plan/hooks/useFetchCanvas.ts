import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { planCanvasType } from '@/api/types/planCanvasType';
import { useQuery } from '@tanstack/react-query';

export const useFetchCanvas = (id: string) => {
  return useQuery({
    queryKey: ['plan', id, 'canvas'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<planCanvasType>(ENDPOINTS.plans.canvas(id));
      return data;
    },
    enabled: !!id && id !== '-1',
  });
};
