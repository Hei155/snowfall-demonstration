import { CHANGE_X_DIRECTION_CHANCE, CHANGE_X_STEP } from 'consts';
import { ISnowflake, IWindowSize } from 'interfaces/ISnowflake';

import { createSnowflake } from './canvas';

export const updateSnowflake = (
  snowflake: ISnowflake,
  windowSize: IWindowSize
) => {
  const { height, width } = windowSize;
  const isChangeDirection = Math.random() < CHANGE_X_DIRECTION_CHANCE;
  let currentSway = snowflake.xSpeed;

  // If there's a endX coordinate, smoothly change xSpeed to this value
  if (snowflake.endX) {
    if (snowflake.xSpeed === snowflake.endX) {
      snowflake.endX = null;
    } else {
      if (snowflake.xSpeed < snowflake.endX) {
        snowflake.xSpeed += CHANGE_X_STEP;
      } else {
        snowflake.xSpeed -= CHANGE_X_STEP;
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
