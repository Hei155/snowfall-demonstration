import { ISnowflake } from '@interfaces/Snowflake';
import { Stage } from '@pixi/react';
import { SNOWFLAKES_LIMIT } from 'consts';
import { useEffect, useState } from 'react';
import { createSnowflake } from 'utils/canvas';

import Snowflake from './Snowflake';

const SnowfieldPixi = () => {
  const [snowflakes, setSnowflakes] = useState<ISnowflake[]>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(document.body.clientWidth);
    setHeight(window.innerHeight);

    for (let i = 0; i < SNOWFLAKES_LIMIT; i++) {
      setSnowflakes((snowflakes) => [...snowflakes, createSnowflake()]);
    }

    const handleResize = () => {
      setWidth(document.body.clientWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stage
      width={width}
      height={height}
      style={{ display: 'block' }}
      options={{
        background: 'rgb(23, 23, 37)',
      }}
    >
      {snowflakes.map((snowflake, i) => (
        <Snowflake key={i} snowflake={snowflake} />
      ))}
    </Stage>
  );
};

export default SnowfieldPixi;
