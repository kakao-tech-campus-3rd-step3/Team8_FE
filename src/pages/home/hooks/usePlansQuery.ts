import { useSuspenseQuery, type UseSuspenseQueryResult } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import type { Plan as HomePlan } from '@/pages/home/components/TripSection';

// 서버 응답 타입들
type Traveler = {
  id: number;
  memberId: number;
  name: string;
  contact: string;
  mbtiType: string; // e.g. 'INFJ'
  status: string; // e.g. 'INVITED'
  role: string; // e.g. 'DEFAULT'
};

type PlanItemResponse = {
  id: number;
  title: string;
  description: string;
  travelers: Traveler[];
  startDate: string; // 'YYYY-MM-DD'
  endDate: string; // 'YYYY-MM-DD'
};

type Page<T> = {
  content: T[];
  pageable: {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: { sorted: boolean; empty: boolean; unsorted: boolean };
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: { sorted: boolean; empty: boolean; unsorted: boolean };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type PlansQueryParams = {
  page?: number;
  size?: number;
  sort?: string[]; // e.g. ['createdAt,desc']
  memberId?: number; // optional: 서버가 요구하면 전달
};

const QUERY_KEY_HOME = ['plans', 'home'] as const;

async function fetchPlans(params: PlansQueryParams): Promise<Page<PlanItemResponse>> {
  const { page = 0, size = 10, sort = ['createdAt,desc'], memberId } = params ?? {};
  const query = {
    page,
    size,
    sort,
    ...(memberId !== undefined ? { memberId } : {}),
  };
  const res = await axiosInstance.get<Page<PlanItemResponse>>(ENDPOINTS.plans.base, { params: query });
  return res.data;
}

// 홈 화면 카드에 맞춘 간단한 목록 전용 훅만 노출
export function usePlansForHome(
  params: PlansQueryParams = {}
): UseSuspenseQueryResult<HomePlan[], unknown> {
  const merged = {
    page: params.page ?? 0,
    size: params.size ?? 10,
    sort: params.sort ?? ['createdAt,desc'],
    memberId: params.memberId,
  } satisfies PlansQueryParams;

  return useSuspenseQuery<Page<PlanItemResponse>, unknown, HomePlan[]>({
    queryKey: [...QUERY_KEY_HOME, merged.page, merged.size, (merged.sort ?? []).join(','), merged.memberId ?? null],
    queryFn: () => fetchPlans(merged),
    select: (page) =>
      page.content.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        startDate: p.startDate,
        endDate: p.endDate,
      })),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
}

export const PLANS_HOME_QUERY_KEY = QUERY_KEY_HOME;
