import { useEffect, useRef } from 'react';

const Snowfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current as HTMLCanvasElement;

      const height = window.innerHeight;
      const width = window.innerWidth;

      canvas.height = width;
      canvas.width = width;
    }
  }, [canvasRef]);
  return <canvas ref={canvasRef}></canvas>;
};

export default Snowfield;
