import { useEffect, useRef } from 'react';

import { SNOWFLAKES_LIMIT } from '../../consts';
import { animate, createSnowflake } from '../../utils/canvas';

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Snowfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      const height = document.documentElement.clientHeight;
      const width = document.documentElement.clientWidth;

      canvas.height = height;
      canvas.width = width;

      const snowflakes = [];

      for (let i = 0; i < SNOWFLAKES_LIMIT; i++) {
        snowflakes.push(createSnowflake());
      }

      animate(ctx, canvas, snowflakes);
    }
  }, [canvasRef]);
  return <canvas ref={canvasRef} />;
};

export default Snowfield;
