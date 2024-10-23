import { useEffect, useRef } from 'react';

interface ISnowflake {
  x: number;
  y: number;
  r: number;
}

const Snowfield = () => {
  const canvasRef = useRef(null);

  const fillSnowflakes = (
    limit = 40,
    size: { width: number; height: number }
  ) => {
    const snowflakes: ISnowflake[] = [];
    const { width, height } = size;

    for (let i = 0; i < limit; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 7 + 1,
      });
    }
    return snowflakes;
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      const height = document.documentElement.clientHeight;
      const width = document.documentElement.clientWidth;

      canvas.height = height;
      canvas.width = width;

      if (ctx) {
        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

          ctx.beginPath();

          const snowflakes = fillSnowflakes(40, { width, height });

          for (let i = 0; i < snowflakes.length; i++) {
            const snowflake = snowflakes[i];
            ctx.moveTo(snowflake.x, snowflake.y);
            ctx.arc(
              snowflake.x,
              snowflake.y,
              snowflake.r,
              0,
              Math.PI * 2,
              true
            );
            ctx.fill();
          }
        };
        draw();
        setInterval(draw, 120);
      }
    }
  }, [canvasRef]);
  return <canvas ref={canvasRef}></canvas>;
};

export default Snowfield;
