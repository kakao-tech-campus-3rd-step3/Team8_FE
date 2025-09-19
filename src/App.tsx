import Router from '@components/Router';
import styled from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <DesktopBrowserFill>
        <Router />
      </DesktopBrowserFill>
    </BrowserRouter>
  );
}

const DesktopBrowserFill = styled.div`
  background-color: rgb(240, 240, 240);
  width: 100%;
  min-height: 100vh;
`;

export default App;
