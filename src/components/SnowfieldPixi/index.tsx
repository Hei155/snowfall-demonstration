import { Container, Sprite, Stage, useTick } from '@pixi/react';
import { useEffect, useState } from 'react';

import snowflake from '../../assets/images/snowflake.png';
import { SNOWFLAKES_LIMIT } from '../../consts';
import { ISnowflake } from '../../interfaces/ISnowflake';
import { createSnowflake } from '../../utils/canvas';

let i = 0;

const Wizard = ({ x, y }: { x: number; y: number }) => {
  // useTick((delta) => {
  //   i += 0.05 * delta;
  //   setX(Math.sin(i) * 100);
  //   setY(Math.sin(i / 1.5) * 100);
  // });
  console.log(x, y);
  return <Sprite image={snowflake} x={x} y={y} width={20} height={20} />;
};

const SnowfieldPixi = () => {
  const [snowflakes, setSnowflakes] = useState<ISnowflake[]>([]);

  useEffect(() => {
    for (let i = 0; i < SNOWFLAKES_LIMIT; i++) {
      setSnowflakes((snowflakes) => [...snowflakes, createSnowflake()]);
    }
  }, []);
  return (
    <Stage
      width={document.documentElement.clientWidth}
      height={document.documentElement.clientHeight}
      options={{
        backgroundColor: 'rgb(23, 23, 37)',
        antialias: true,
      }}
    >
      {snowflakes.map((snowflake) => (
        <Wizard x={snowflake.x} y={snowflake.y} />
      ))}
    </Stage>
  );
};

export default SnowfieldPixi;
