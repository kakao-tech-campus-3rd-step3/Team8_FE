import { colorSystem } from '@/styles/colorSystem';
import { toast } from 'react-toastify';
import styled from 'styled-components';

function ColorBox({
  keyName,
  colorType,
}: {
  keyName: string;
  colorType: keyof typeof colorSystem;
}) {
  const colorScheme = colorSystem[colorType];
  const toastify = (msg: string) =>
    toast(msg, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const colorLevel = keyName as keyof typeof colorScheme;
  const colorValue = colorScheme[colorLevel];
  const colorText = colorLevel.replace('_', '');
  const colorInt = parseInt(colorText);

  return (
    <ColorBoxWrapper
      color={colorInt >= 500 ? 'white' : 'black'}
      boxcolor={colorValue}
      onClick={() => {
        toastify(`colorSystem.${colorType}.${colorLevel}\n(${colorValue}) 복사됨`);

        navigator.clipboard.writeText(`colorSystem.${colorType}.${colorLevel}`);
      }}
    >
      {colorText}
    </ColorBoxWrapper>
  );
}

const ColorBoxWrapper = styled.button<{ boxcolor: string; color: string }>`
  cursor: pointer;
  background-color: ${({ boxcolor }) => boxcolor};
  color: ${({ color }) => color};
  padding: 8px;
  border: none;
  border-radius: 8px;
`;

export default ColorBox;
