import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planSchema, type NewPlanFormInputs } from '../utils/planValidation';

type UseNewPlanFormProps = {
  defaultValues?: NewPlanFormInputs;
  onSubmit: (data: NewPlanFormInputs) => void;
};

export const useNewPlanForm = ({ defaultValues, onSubmit }: UseNewPlanFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NewPlanFormInputs>({
    resolver: zodResolver(planSchema),
    mode: 'onChange',
    defaultValues,
  });

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};
