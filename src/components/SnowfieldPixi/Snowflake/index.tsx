import { ISnowflake } from '@interfaces/Snowflake';
import { Sprite, useTick } from '@pixi/react';
import snowflakeImg from 'assets/images/snowflake.png';
import { useState } from 'react';
import { updateSnowflake } from 'utils/updateSnowflake';

const Snowflake = ({ snowflake }: { snowflake: ISnowflake }) => {
  const [currentY, setCurrentY] = useState(snowflake.y);
  const [currentX, setCurrentX] = useState(snowflake.x);
  const [currentSize, setCurrentSize] = useState(snowflake.r);
  const [rotation, setRotation] = useState(0);
  const [initialDirection] = useState(Math.random() < 0.5 ? -1 : 1);

  useTick((delta) => {
    const currentSnowflake = updateSnowflake(snowflake, {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });

    setCurrentX(currentSnowflake.x);
    setCurrentY(currentSnowflake.y);
    setCurrentSize(currentSnowflake.r * 3);
    setRotation(rotation + 0.01 * delta * initialDirection);
  });

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

export default Snowflake;
