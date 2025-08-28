import { z } from 'zod';

export const mbtiTypes = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
] as const;

export const editSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' })
    .email({ message: '유효한 이메일 형식이 아닙니다' }),
  name: z.string().min(1, { message: '이름을 입력해주세요' }),
  phone: z
    .string()
    .min(1, { message: '연락처를 입력해주세요' })
    .regex(/^010-\d{4}-\d{4}$/, {
      message: '010-1234-5678 형식으로 입력해주세요',
    }),

  mbti: z.enum(mbtiTypes).optional().or(z.literal('')),
});

export type EditFormInputs = z.infer<typeof editSchema>;
