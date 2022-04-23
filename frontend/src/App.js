import './App.css';
import Canvas from './components/Canvas';
import { CanvasProvider } from "./context/CanvasContext";
import RightBar from './components/RightBar';
import EditObj from './components/EditObj'
import styled from "styled-components";
import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'true';
axios.defaults.baseURL = 'http://localhost:80/api/v1/';

function App() {
  return (
    <CanvasProvider>
      <Wrapper>
        <div className="App">
          <header>
            <h1>Super Photoshop</h1>
          </header>
        </div>
        <MainSection>
          <Canvas/>
          <Menu>
            <RightBar/>
            <EditObj/>
          </Menu>
        </MainSection>
      </Wrapper>
    </CanvasProvider>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 50px;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: row;
`
const Menu = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
