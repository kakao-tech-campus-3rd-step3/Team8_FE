import styled, { keyframes } from 'styled-components';

type SpinnerProps = {
  size?: number; // px
  color?: string;
  thickness?: number; // px
  className?: string;
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Ring = styled.div<Required<Pick<SpinnerProps, 'size' | 'color' | 'thickness'>>>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: ${({ thickness }) => thickness}px solid rgba(0, 0, 0, 0.08);
  border-top-color: ${({ color }) => color};
  animation: ${spin} 0.8s linear infinite;
  box-sizing: border-box;
`;

export function Spinner({ size = 16, color = '#999', thickness = 2, className }: SpinnerProps) {
  return <Ring size={size} color={color} thickness={thickness} className={className} />;
}

// 섹션(블록) 로딩용: 가운데 정렬된 큰 스피너
export function SectionSpinner({
  size = 32,
  color = '#999',
  thickness = 3,
  className,
}: SpinnerProps) {
  return (
    <SectionWrapper className={className}>
      <Spinner size={size} color={color} thickness={thickness} />
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  width: 100%;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spinner;

