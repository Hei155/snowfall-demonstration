import { MAX_SNOWFLAKE_Y_SPEED, SNOWFLAKE_MAX_SIZE } from '../consts';
import { ISnowflake } from '../interfaces/ISnowflake';

const changeDirectionForGroup = (
  snowflakes: ISnowflake[],
  target: ISnowflake,
  sway: number
) => {
  const { x: targetX, y: targetY } = target;
  snowflakes.forEach(({ x: currentX, y: currentY, sway: currentSway }) => {
    if (
      Math.abs(targetX - currentX) < 50 &&
      Math.abs(targetY - currentY) < 50
    ) {
      currentSway = sway;
      currentX += sway;
    }
  });
};

export const createSnowflake = (): ISnowflake => {
  const r = Math.random() * SNOWFLAKE_MAX_SIZE + 1;

  const ySpeed = (r / SNOWFLAKE_MAX_SIZE) * MAX_SNOWFLAKE_Y_SPEED;
  const sway = (r / SNOWFLAKE_MAX_SIZE) * (Math.random() - 0.5);

  return {
    x: Math.random() * document.documentElement.clientWidth,
    y: 0,
    r: r,
    ySpeed: ySpeed,
    sway: sway,
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

const updateSnowflake = (
  snowflake: ISnowflake,
  canvas: HTMLCanvasElement,
  snowflakes: ISnowflake[]
) => {
  const isChangeDirection = Math.random() < 0.0001;
  let currentSway = snowflake.sway;

  if (snowflake.endX) {
    if (snowflake.sway === snowflake.endX) {
      console.log('1');
      snowflake.endX = null;
    } else {
      //   console.log(Math.abs(snowflake.sway - snowflake.endX));
      if (snowflake.endX !== undefined && snowflake.endX !== null) {
        if (snowflake.sway < snowflake.endX) {
          snowflake.sway += 0.01;
        } else if (snowflake.sway > snowflake.endX) {
          snowflake.sway -= 0.01;
        }
      }
    }
  }

  if (isChangeDirection) {
    currentSway = snowflake.sway * -1;
    // changeDirectionForGroup(snowflakes, snowflake, currentSway);
    snowflake.endX = currentSway;
  }

  snowflake.y += snowflake.ySpeed;
  snowflake.x += snowflake.sway;
  //   snowflake.sway = currentSway;
  if (snowflake.y > canvas.height) {
    Object.assign(snowflake, createSnowflake());
  }
};

export const animate = (
  ctx: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement,
  snowflakes: ISnowflake[]
) => {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach((snowflake) => {
      updateSnowflake(snowflake, canvas, snowflakes);
      drawSnowflake(ctx, snowflake);
    });

    return requestAnimationFrame(() => {
      animate(ctx, canvas, snowflakes);
    });
  }
};
