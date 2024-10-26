import { Container, Sprite, Stage, useTick } from '@pixi/react';
import React, { useEffect, useState } from 'react';

import snowflakeImg from '../../assets/images/snowflake.png';
import { SNOWFLAKES_LIMIT } from '../../consts';
import { ISnowflake } from '../../interfaces/ISnowflake';
import { createSnowflake, updateSnowflake } from '../../utils/canvas';

const Wizard = ({ snowflake }: { snowflake: ISnowflake }) => {
  const [currentY, setCurrentY] = useState(snowflake.y);
  const [currentX, setCurrentX] = useState(snowflake.x);
  const [currentSize, setCurrentSize] = useState(snowflake.r);
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    console.log(delta);
    const currentSnowflake = updateSnowflake(snowflake, {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
    setCurrentX(currentSnowflake.x);
    setCurrentY(currentSnowflake.y);
    setCurrentSize(currentSnowflake.r * 3);
    setRotation(rotation + 0.01 * delta);
    // i += 0.05 * delta;
    // setCurrentX((x) => (x += snowflake.xSpeed));
    // setCurrentY((y) => (y += snowflake.ySpeed));
  });
  // console.log('y', y);
  return (
    <Sprite
      rotation={rotation}
      image={snowflakeImg}
      x={currentX}
      y={currentY}
      width={currentSize}
      height={currentSize}
    />
  );
};

const SnowfieldPixi = () => {
  const [snowflakes, setSnowflakes] = useState<ISnowflake[]>([]);

  useEffect(() => {
    for (let i = 0; i < SNOWFLAKES_LIMIT; i++) {
      setSnowflakes((snowflakes) => [...snowflakes, createSnowflake()]);
    }
  }, []);
  console.log(snowflakes);
  return (
    <Stage
      width={document.documentElement.clientWidth}
      height={document.documentElement.clientHeight}
      options={{
        backgroundColor: 'rgb(23, 23, 37)',
        antialias: true,
      }}
    >
      {snowflakes.map((snowflake, i) => (
        <Wizard key={i} snowflake={snowflake} />
      ))}
    </Stage>
  );
};

export default SnowfieldPixi;
