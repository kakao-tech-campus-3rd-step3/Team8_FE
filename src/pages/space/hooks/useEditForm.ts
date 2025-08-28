import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editSchema, type EditFormInputs } from '../utils/editValidation';

export const useEditForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: object;
  onSubmit: (data: EditFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditFormInputs>({
    resolver: zodResolver(editSchema),
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
