import { z } from 'zod';

export const planSchema = z
  .object({
    title: z.string().min(1, { message: '제목을 입력해주세요' }),
    description: z.string().min(1, { message: '설명을 입력해주세요' }),
    startDate: z.string().min(1, { message: '시작 날짜를 선택해주세요' }),
    endDate: z.string().min(1, { message: '종료 날짜를 선택해주세요' }),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return !isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end;
    },
    {
      message: '종료일은 시작일보다 이후여야 합니다',
      path: ['endDate'],
    }
  );

export type NewPlanFormInputs = z.infer<typeof planSchema>;
