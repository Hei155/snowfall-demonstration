import snoflakeImg from '../assets/images/snowflake.png';
import {
  MAX_SNOWFLAKE_X_SPEED,
  MAX_SNOWFLAKE_Y_SPEED,
  SNOWFLAKE_MAX_SIZE,
} from '../consts';
import { ISnowflake, IWindowSize } from '../interfaces/ISnowflake';

export const createSnowflake = (): ISnowflake => {
  const r = Math.random() * SNOWFLAKE_MAX_SIZE + 1;

  // Calm weather :)
  const xSpeedDirection = Math.random() < 0.5 ? -1 : 1;

  const ySpeed = (r / SNOWFLAKE_MAX_SIZE) * MAX_SNOWFLAKE_Y_SPEED;
  const xSpeed =
    (r / SNOWFLAKE_MAX_SIZE) * MAX_SNOWFLAKE_X_SPEED * xSpeedDirection;

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

export const updateSnowflake = (
  snowflake: ISnowflake,
  windowSize: IWindowSize
) => {
  const { height, width } = windowSize;
  const isChangeDirection = Math.random() < 0.01;
  let currentSway = snowflake.xSpeed;

  // If there's a endX coordinate, smoothly change xSpeed to this value
  if (snowflake.endX) {
    if (snowflake.xSpeed === snowflake.endX) {
      snowflake.endX = null;
    } else {
      if (snowflake.xSpeed < snowflake.endX) {
        snowflake.xSpeed += 0.01;
      } else {
        snowflake.xSpeed -= 0.01;
      }
    }
  }

  // Specifying final coordinates
  if (isChangeDirection) {
    currentSway = snowflake.xSpeed * -1;
    snowflake.endX = currentSway;
  }

  // Update speed of snowflake
  snowflake.y += snowflake.ySpeed;
  snowflake.x += snowflake.xSpeed;
  if (snowflake.y > height || snowflake.x > width || snowflake.x < 0) {
    Object.assign(snowflake, createSnowflake());
  }
  return snowflake;
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
};
