import Router from '@components/Router';
import styled from 'styled-components';

function App() {
  return (
    <DesktopBrowserFill>
      <MobileRect>
        <Router />
      </MobileRect>
    </DesktopBrowserFill>
  );
}

const DesktopBrowserFill = styled.div`
  background-color: rgb(240, 240, 240);
  width: 100%;
`;

const MobileRect = styled.div`
  margin: auto;
  max-width: 768px;
  min-height: 100vh;
  background-color: white;
`;

export default App;
