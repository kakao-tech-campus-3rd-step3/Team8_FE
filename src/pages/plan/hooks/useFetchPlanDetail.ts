import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { PlanDetailType } from '@/api/types/planDetail';
import { useQuery } from '@tanstack/react-query';

export const useFetchPlanDetail = (id: string) => {
  return useQuery({
    queryKey: ['plan', id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PlanDetailType>(ENDPOINTS.plans.byId(id));
      return data;
    },
    enabled: !!id && id !== '-1',
  });
};
