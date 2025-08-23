import { colorSystem } from '@styles/colorSystem';
import styled from 'styled-components';

function ColorPanel() {
  const colorBoxes = (colorType: keyof typeof colorSystem) => {
    const colorScheme = colorSystem[colorType];

    return (
      <ColorBoxWrapper>
        <div>{colorType}</div>
        {Object.keys(colorScheme).map((key) => {
          const colorLevel = key as keyof typeof colorScheme;
          const colorValue = colorScheme[colorLevel];
          const colorText = colorLevel.replace('_', '');
          const colorInt = parseInt(colorText);
          return (
            <ColorBox
              key={colorLevel}
              color={colorInt >= 500 ? 'white' : 'black'}
              boxcolor={colorValue}
              onClick={() => {
                console.log(`${colorValue} copied to clipboard`);
                navigator.clipboard.writeText(`colorSystem.${colorType}.${colorLevel}`);
              }}
            >
              {colorText}
            </ColorBox>
          );
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

const ColorBox = styled.button<{ boxcolor: string; color: string }>`
  background-color: ${({ boxcolor }) => boxcolor};
  color: ${({ color }) => color};
  padding: 8px;
  border: none;
  border-radius: 8px;
`;

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
  bottom: 256px;
  right: 0;
  transform: translateX(calc(100% - 50px));
  transition: transform 0.5s ease-out;
  position: absolute;
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
