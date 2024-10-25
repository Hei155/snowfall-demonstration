import './styles.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SnowfieldCanvas from '../SnowfieldCanvas';
import SnowfieldPixi from '../SnowfieldPixi';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/canvas" />} />
        <Route path="/canvas" element={<SnowfieldCanvas />} />
        <Route path="/pixi" element={<SnowfieldPixi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
