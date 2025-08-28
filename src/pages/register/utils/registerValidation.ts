import { z } from 'zod';

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
    // 유효성 검사 강화 필요시 아래 주석 해제
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
    mbti: z
      .string()
      .min(4, { message: 'MBTI를 입력해주세요' })
      .max(4, { message: 'MBTI는 4글자여야 합니다' })
      .regex(/^[EI][NS][TF][JP]$/i, {
        message: '유효한 MBTI 형식이 아닙니다',
      })
      .optional() // MBTI는 선택 사항으로 처리
      .or(z.literal('')), // 빈 문자열도 허용
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;
