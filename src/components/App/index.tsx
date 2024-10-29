import LinkContainer from 'components/LinkContainer';
import { BrowserRouter } from 'react-router-dom';
import Paths from 'routes';

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
