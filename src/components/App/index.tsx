import { BrowserRouter } from 'react-router-dom';

import Paths from '../../routes';
import LinkContainer from '../LinkContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LinkContainer />
        <main>
          <Paths />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
