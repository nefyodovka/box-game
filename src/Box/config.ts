import { PositionType } from "./types";

export enum BlocksEnum {
  Regular = "regular",
  Red = "red",
  Blue = "blue",
  Green = "green"
}

export const blocksImages: Record<BlocksEnum, string> = {
  [BlocksEnum.Regular]: require("./img/block-regular.png").default,
  [BlocksEnum.Red]: require("./img/block-red.png").default,
  [BlocksEnum.Blue]: require("./img/block-blue.png").default,
  [BlocksEnum.Green]: require("./img/block-green.png").default
};

export enum CorrectEnum {
  Red = "1",
  Blue = "9",
  Green = "7"
}

export const correctIndexes: Record<CorrectEnum, BlocksEnum> = {
  [CorrectEnum.Red]: BlocksEnum.Red,
  [CorrectEnum.Blue]: BlocksEnum.Blue,
  [CorrectEnum.Green]: BlocksEnum.Green
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
  TopLeft = "4",
  TopRight = "5",
  Bottom = "8"
}

export const rotations: Record<RotationsEnum, number[]> = {
  [RotationsEnum.TopLeft]: [0, 1, 5, 8, 7, 3],
  [RotationsEnum.TopRight]: [1, 2, 6, 9, 8, 4],
  [RotationsEnum.Bottom]: [4, 5, 9, 11, 10, 7]
};

export const BLOCK_RADIUS = 3.6;
export const ROTATION_ANGLE = 360 / 6; // 6 блоков в круге
export const ROTATION_CIRCLE_RADIUS = 13;
export const ROTATION_CIRCLE_SHIFT = ROTATION_CIRCLE_RADIUS - BLOCK_RADIUS;
export const ANIMATION_TIME = 500;
