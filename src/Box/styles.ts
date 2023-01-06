import styled, { css } from "styled-components";

import {
  blocksImages,
  BLOCK_RADIUS,
  ROTATION_CIRCLE_RADIUS,
  ROTATION_CIRCLE_SHIFT,
  ANIMATION_TIME,
  ROTATION_ANGLE
} from "./config";
import { PositionType } from "./types";
import { BlocksEnum } from "./config";

export const generatePositionStyle = (position: PositionType) => ({
  top: position[0] + "rem",
  left: position[1] + "rem"
});

export const generateCicleStyle = (radius: number) => ({
  "border-radius": "50%",
  width: radius * 2 + "rem",
  height: radius * 2 + "rem"
});

export const BoxWrapper = styled.div`
  background: url(${require("./img/box.jpg").default}) no-repeat center / contain;
  width: 69.7rem;
  height: 49rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

const rotationCircleMixin = css`
  transition: transform ${ANIMATION_TIME}ms linear;
  transform: rotate(${ROTATION_ANGLE}deg);
  opacity: 1;
`;

export const RotationCircleWrapper = styled.div<{
  $rotate: boolean,
  isCorrect: boolean
}>`
  position: absolute;
  opacity: 0;
  transform: rotate(0);
  will-change: transform, opacity;
  background: url(${
    require("./img/rotation-circle.svg").default
  }) no-repeat center / contain;
  ${generateCicleStyle(ROTATION_CIRCLE_RADIUS)}
  left: -${ROTATION_CIRCLE_SHIFT}rem;
  top: -${ROTATION_CIRCLE_SHIFT}rem;

  /* Отключаем события для оверлея, фактически мы будем кликать на основной блок */
  pointer-events: none;

  /* Переход для ховера */
  transition: opacity 0.2s linear;

  /* Активируем mixin в момент вращения */
  ${(props) => props.$rotate && rotationCircleMixin}

  /* Скрываем оверлей, когда головоломка решена */
  display: ${(props) => (props.isCorrect ? "none" : "block")};
`;

const rotateIconMixin = css`
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 50%;
    height: 50%;
    background: url(${require("./img/rotation-icon.svg").default}) no-repeat
      center / contain;
  }
`;

const rotationBlockMixin = css`
  transition: ${ANIMATION_TIME}ms linear;
  transform: rotate(-${ROTATION_ANGLE}deg);
`;

interface IBlockImg {
  type: BlocksEnum;
  isRotation?: boolean;
  $rotate?: boolean;
  isHide?: boolean;
  isCorrect?: boolean;
  withRotationCircle?: boolean;
}

export const BlockImg = styled.div<IBlockImg>`
  background: url(${(props) => blocksImages[props.type]}) no-repeat center /
    contain;
  position: absolute;
  ${generateCicleStyle(BLOCK_RADIUS)}
  will-change: transform;
  z-index: ${(props) => (props.withRotationCircle ? 1 : 0)};
  display: ${(props) => (props.isHide ? "none" : "block")};
  user-select: ${(props) => (props.isCorrect ? "none" : "auto")};

  ${(props) => props.isRotation && rotateIconMixin};
  ${(props) => props.$rotate && rotationBlockMixin};

  &:hover {
    ${RotationCircleWrapper} {
      opacity: 1;
    }
  }
`;

export const Success = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  //top: 1rem;
  font-size: 2rem;
  background: black;
  color: olivedrab;
  font-family: monospace;
  text-align: center;
  z-index: 1000;
`;

export const Shuffle = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1rem;
  user-select: none;
  cursor: pointer;
`;