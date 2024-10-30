import './styles.css';

import { NavLink } from 'react-router-dom';

const LinkContainer = () => {
  return (
    <div className="link-container">
      <NavLink className="link-container__link" to="/pixi">
        PixiJS
      </NavLink>
      <NavLink className="link-container__link" to="/canvas">
        Canvas
      </NavLink>
    </div>
  );
};

export default LinkContainer;
