import {
  INITIAL_X_DIRECTION_CHANCE,
  MAX_SNOWFLAKE_SIZE,
  MAX_SNOWFLAKE_X_SPEED,
  MAX_SNOWFLAKE_Y_SPEED,
} from '../consts';
import { ISnowflake } from '../interfaces/ISnowflake';
import { updateSnowflake } from './updateSnowflake';

export const createSnowflake = (): ISnowflake => {
  const r = Math.random() * MAX_SNOWFLAKE_SIZE + 1;

  // Calm weather :)
  const xSpeedDirection = Math.random() < INITIAL_X_DIRECTION_CHANCE ? -1 : 1;

  const ySpeed = (r / MAX_SNOWFLAKE_SIZE) * MAX_SNOWFLAKE_Y_SPEED;
  const xSpeed =
    (r / MAX_SNOWFLAKE_SIZE) * MAX_SNOWFLAKE_X_SPEED * xSpeedDirection;

  return {
    x: Math.random() * document.documentElement.clientWidth,
    y: 0,
    r: r,
    ySpeed,
    xSpeed,
    endX: null,
  };
};

const drawSnowflake = (
  ctx: CanvasRenderingContext2D,
  snowflake: ISnowflake
) => {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
};

export const animate = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement,
  snowflakes: ISnowflake[]
) => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
      updateSnowflake(snowflake, canvas);
      drawSnowflake(ctx, snowflake);
    });

    return requestAnimationFrame(() => {
      animate(ctx, canvas, snowflakes);
    });
  }
  return null;
};
