import styled from 'styled-components';
import type { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';

interface FormInputFieldProps<TFormValues extends Record<string, unknown>> {
  id: Path<TFormValues>;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
}

export function FormInputField<TFormValues extends Record<string, unknown>>({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
}: FormInputFieldProps<TFormValues>) {
  return (
    <InputGroup>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id)}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <ErrorMsg role="alert">{error.message}</ErrorMsg>}
    </InputGroup>
  );
}

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const StyledLabel = styled.label`
  ${fontSystem.body.medium}
  color: ${colorSystem.tertiary_white._300};
`;

const StyledInput = styled.input`
  padding: 12px 14px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 6px;
  ${fontSystem.body.medium}
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${colorSystem.tertiary_white._600};
  }
`;

const ErrorMsg = styled.span`
  margin-left: 4px;
  color: red;
  ${fontSystem.body.small}
`;
