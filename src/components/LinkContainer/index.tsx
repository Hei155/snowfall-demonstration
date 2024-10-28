import './styles.css';

import { Link, useLocation } from 'react-router-dom';

const linkClassName = 'link-container__link';

const LinkContainer = () => {
  const location = useLocation();

  return (
    <div className="link-container">
      <Link
        className={`${linkClassName} ${location.pathname === '/pixi' && `${linkClassName}_active`}`}
        to="/pixi"
      >
        PixiJS
      </Link>
      <Link
        className={`${linkClassName} ${location.pathname === '/canvas' && `${linkClassName}_active`}`}
        to="/canvas"
      >
        Canvas
      </Link>
    </div>
  );
};

export default LinkContainer;
