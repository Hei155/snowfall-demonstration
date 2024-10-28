import { useEffect, useRef } from 'react';

import { SNOWFLAKES_LIMIT } from '../../consts';
import { animate, createSnowflake } from '../../utils/canvas';

const SnowfieldCanvas = () => {
  const canvasRef = useRef(null);
  const animateRef = useRef<number | null>(null);

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

      animateRef.current = animate(ctx, canvas, snowflakes);

      const handleResize = () => {
        canvas.height = document.documentElement.clientHeight;
        canvas.width = document.documentElement.clientWidth;
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animateRef.current as number);
      };
    }
  }, [canvasRef]);
  return <canvas ref={canvasRef} />;
};

export default SnowfieldCanvas;
