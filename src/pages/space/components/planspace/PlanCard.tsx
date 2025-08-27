import styled from 'styled-components';

function PlanCard() {
  return <PlanCardWrapper>플랜카드</PlanCardWrapper>;
}

const PlanCardWrapper = styled.div`
  height: 100px;

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 0 2px 12px rgba(49, 180, 67, 0.3);
`;

export default PlanCard;
