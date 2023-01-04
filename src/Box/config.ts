import { PositionType } from "./types";

export enum BlocksEnum {
  regular = "regular",
  red = "red",
  blue = "blue",
  green = "green"
}

export const blocksImages: Record<BlocksEnum, string> = {
  [BlocksEnum.regular]: require("./img/block-regular.png"),
  [BlocksEnum.red]: require("./img/block-red.png"),
  [BlocksEnum.blue]: require("./img/block-blue.png"),
  [BlocksEnum.green]: require("./img/block-green.png")
};

export enum CorrectEnum {
  red = "1",
  blue = "9",
  green = "7"
}

export const correctIndexes: Record<CorrectEnum, BlocksEnum> = {
  [CorrectEnum.red]: BlocksEnum.red,
  [CorrectEnum.blue]: BlocksEnum.blue,
  [CorrectEnum.green]: BlocksEnum.green
};

export const blocksPositions: PositionType[] = [
  [11.88, 22.93],
  [11.88, 31.27],
  [11.88, 39.61],
  [18.97, 18.66],
  [18.97, 27],
  [18.97, 35.34],
  [18.97, 43.68],
  [26.27, 22.93],
  [26.27, 31.17],
  [26.27, 39.61],
  [33.36, 27],
  [33.36, 35.34]
];

export enum RotationsEnum {
  topLeft = "4",
  topRight = "5",
  bottom = "8"
}

export const rotations: Record<RotationsEnum, number[]> = {
  [RotationsEnum.topLeft]: [0, 1, 5, 8, 7, 3],
  [RotationsEnum.topRight]: [1, 2, 6, 9, 8, 4],
  [RotationsEnum.bottom]: [4, 5, 9, 11, 10, 7]
};

export const BLOCK_RADIUS = 3.6;
export const ROTATION_ANGLE = 360 / 6; // 6 блоков в круге
export const ROTATION_CIRCLE_RADIUS = 13;
export const ROTATION_CIRCLE_SHIFT = ROTATION_CIRCLE_RADIUS - BLOCK_RADIUS;
export const ANIMATION_TIME = 500;
