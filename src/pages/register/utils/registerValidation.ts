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

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일을 입력해주세요' })
      .email({ message: '유효한 이메일 형식이 아닙니다' }),
    name: z.string().min(1, { message: '이름을 입력해주세요' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다' })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, {
        message: '비밀번호는 영문, 숫자를 모두 포함해야 합니다',
      }),
    // --- 보다 강력한 비밀번호 (대/소문자, 숫자, 특수문자) ---
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    //   message: '비밀번호는 8자 이상이며, 대/소문자, 숫자, 특수문자를 모두 포함해야 합니다',
    // }),
    confirmPassword: z.string().min(1, { message: '비밀번호를 다시 입력해주세요' }),
    phone: z
      .string()
      .min(1, { message: '연락처를 입력해주세요' })
      .regex(/^010-\d{4}-\d{4}$/, {
        message: '010-1234-5678 형식으로 입력해주세요',
      }),

    mbti: z.enum(mbtiTypes).optional().or(z.literal('')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;
