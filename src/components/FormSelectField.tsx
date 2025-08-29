import styled from 'styled-components';
import type { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { fontSystem } from '@/styles/fontSystem';
import { colorSystem } from '@/styles/colorSystem';

interface FormSelectFieldProps<TFormValues extends Record<string, unknown>> {
  id: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  options: readonly string[];
  placeholder?: string;
}

export function FormSelectField<TFormValues extends Record<string, unknown>>({
  id,
  label,
  register,
  error,
  options,
  placeholder,
}: FormSelectFieldProps<TFormValues>) {
  return (
    <FormGroup>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledSelect id={id} {...register(id)}>
        <option value="">{placeholder || '선택해주세요...'}</option>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorMsg role="alert">{error.message}</ErrorMsg>}
    </FormGroup>
  );
}

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const StyledLabel = styled.label`
  ${fontSystem.body.medium}
  color: ${colorSystem.tertiary_white._300};
`;

const StyledSelect = styled.select`
  padding: 12px 14px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 6px;
  ${fontSystem.body.medium}
  background: white;
  transition: border-color 0.2s;
  color: ${colorSystem.tertiary_white._600};

  &:focus {
    outline: none;
    border-color: #222;
  }
`;

const ErrorMsg = styled.span`
  margin-left: 4px;
  color: red;
  ${fontSystem.body.small}
`;
