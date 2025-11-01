export type PlanDetailType = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  travelers: {
    id: number;
    memberId: number;
    name: string;
    contact: string;
    mbtiType: string;
    role: string;
    status: string;
  }[];
};
