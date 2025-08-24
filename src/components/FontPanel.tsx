import { fontSystem } from '@styles/fontSystem';
import { toast } from 'react-toastify';
import styled, { type RuleSet } from 'styled-components';

function FontPanel() {
  const testText = '다람쥐 헌 쳇바퀴에 타고파. 1234567890';

  const fsTitle = Object.keys(fontSystem.title);
  const fsBody = Object.keys(fontSystem.body);

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

  return (
    <ColorPanelWrapper>
      <h2>폰트 패널</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {Object.keys(fontSystem.title)
            .slice(0, 2)
            .map((key) => {
              return (
                <div key={key}>
                  <CustomFont
                    ruleset={fontSystem.title[key as keyof typeof fontSystem.title]}
                    onClick={() => {
                      `fontSystem.title.${key} 복사됨`;
                      navigator.clipboard.writeText(`fontSystem.title.${key}`);
                    }}
                  >
                    {testText}
                  </CustomFont>
                  <CustomFont
                    ruleset={fontSystem.body[key as keyof typeof fontSystem.body]}
                    onClick={() => {
                      toastify(`fontSystem.body.${key} 복사됨`);
                      navigator.clipboard.writeText(`fontSystem.body.${key}`);
                    }}
                  >
                    {testText}
                  </CustomFont>
                </div>
              );
            })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.keys(fontSystem.title)
            .slice(2, 4)
            .map((key) => {
              return (
                <div key={key}>
                  <CustomFont
                    ruleset={fontSystem.title[key as keyof typeof fontSystem.title]}
                    onClick={() => {
                      toastify(`fontSystem.title.${key} 복사됨`);
                      navigator.clipboard.writeText(`fontSystem.title.${key}`);
                    }}
                  >
                    {testText}
                  </CustomFont>
                  <CustomFont
                    ruleset={fontSystem.body[key as keyof typeof fontSystem.body]}
                    onClick={() => {
                      toastify(`fontSystem.body.${key} 복사됨`);
                      navigator.clipboard.writeText(`fontSystem.body.${key}`);
                    }}
                  >
                    {testText}
                  </CustomFont>
                </div>
              );
            })}
        </div>
      </div>
    </ColorPanelWrapper>
  );
}

const ColorPanelWrapper = styled.div`
  background-color: white;
  top: 700px;
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
    transform: translateX(calc(100% - 50px - 740px));
  }
`;

const CustomFont = styled.div<{ ruleset: RuleSet<object> }>`
  cursor: pointer;
  ${({ ruleset }) => ruleset}
`;

export default FontPanel;
