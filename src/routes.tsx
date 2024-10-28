import { Navigate, Route, Routes } from 'react-router-dom';

import SnowfieldCanvas from './components/SnowfieldCanvas';
import SnowfieldPixi from './components/SnowfieldPixi';

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/canvas" />} />
      <Route path="/canvas" element={<SnowfieldCanvas />} />
      <Route path="/pixi" element={<SnowfieldPixi />} />
      <Route path="*" element={<Navigate to="/canvas" />} />
    </Routes>
  );
};

export default Paths;
