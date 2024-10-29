import { Stage } from '@pixi/react';
import { SNOWFLAKES_LIMIT } from 'consts';
import { ISnowflake } from 'interfaces/ISnowflake';
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
