import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    // 로그인 처리 로직 (POST)
    console.log(data);
    navigate('/'); // 로그인 후 홈으로 이동
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    navigateToRegister,
  };
};
