import { colorSystem } from '@styles/colorSystem';
import styled from 'styled-components';
import ColorBox from './ColorBox';

function ColorPanel() {
  const colorBoxes = (colorType: keyof typeof colorSystem) => {
    const colorScheme = colorSystem[colorType];

    return (
      <ColorBoxWrapper>
        <div>{colorType}</div>
        {Object.keys(colorScheme).map((key) => {
          return <ColorBox key={key} keyName={key} colorType={colorType} />;
        })}
      </ColorBoxWrapper>
    );
  };

  return (
    <ColorPanelWrapper>
      <h2>색상 패널</h2>
      {colorBoxes('primary_yellow')}
      {colorBoxes('secondary_green')}
      {colorBoxes('tertiary_white')}
    </ColorPanelWrapper>
  );
}

const ColorBoxWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorPanelWrapper = styled.div`
  background-color: white;
  top: 400px;
  right: 0;
  transform: translateX(calc(100% - 50px));
  transition: transform 0.5s ease-out;
  position: fixed;
  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &:hover {
    transform: translateX(calc(100% - 50px - 700px));
  }
`;

export default ColorPanel;
