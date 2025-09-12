import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { planSchema, type NewPlanFormInputs } from '../utils/planValidation';

export const useNewPlanForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: object;
  onSubmit: (data: NewPlanFormInputs) => void;
}) => {
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
