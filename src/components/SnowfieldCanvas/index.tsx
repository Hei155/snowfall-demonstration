import { SNOWFLAKES_LIMIT } from 'consts';
import { useLayoutEffect, useRef } from 'react';
import { animate, createSnowflake } from 'utils/canvas';

const SnowfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animateRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const { clientHeight, clientWidth } = document.documentElement;

    canvas.height = clientHeight;
    canvas.width = clientWidth;

    const snowflakes = Array.from(
      { length: SNOWFLAKES_LIMIT },
      createSnowflake
    );

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
  }, [canvasRef]);
  return <canvas ref={canvasRef} />;
};

export default SnowfieldCanvas;
