import { BlocksEnum } from "./config";

export type PositionType = [number, number];

export type BlockProps = {
  position: PositionType;
  type: BlocksEnum;
  index: number;
};
