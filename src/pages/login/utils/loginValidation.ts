import { z } from 'zod';
//유효성 검사 로직은 백엔드와 상의 후 변경해야할 수 있음.
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' }) // 비어있지 않아야 함
    .email({ message: '유효한 이메일 형식이 아닙니다' }), // 이메일 형식이어야 함
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다' }), // 최소 8자 이상
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
