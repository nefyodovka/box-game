import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";

import { correctIndexes, rotations, BlocksEnum, RotationsEnum } from "./config";

import { AudioController } from "../audio";

export class BoxStore {
  blocks: BlocksEnum[] = [];
  isAnimation = false;
  rotationIndex: number | null = null;

  audioController = new AudioController();

  constructor() {
    makeObservable(this, {
      blocks: observable,
      isAnimation: observable,
      rotationIndex: observable,
      rotate: action.bound,
      shuffle: action.bound,
      setAnimation: action.bound
    });

    this.shuffle();
    // this.blocks = new Array(12).fill(BlocksEnum.regular);
    // this.blocks[1] = BlocksEnum.red;
    // this.blocks[10] = BlocksEnum.green;
    // this.blocks[5] = BlocksEnum.blue;
  }

  shuffle(): void {
    this.blocks = [
      ...new Array(9).fill(BlocksEnum.Regular),
      BlocksEnum.Red,
      BlocksEnum.Blue,
      BlocksEnum.Green
    ].sort(() => Math.random() - 0.5);

    if (this.isReshuffle) {
      this.shuffle();
    }
  }

  get isReshuffle(): boolean {
    return this.isOneCorrect || this.isCorrectAtRotateBlock;
  }

  get isOneCorrect(): boolean {
    return Object.keys(correctIndexes).some((index) =>
      this.isCorrectIndex(index)
    );
  }

  isCorrectIndex(index: number | string): boolean {
    return correctIndexes[index] === this.blocks[index];
  }

  get isCorrectAtRotateBlock(): boolean {
    const rotationsIndexes = [
      RotationsEnum.TopLeft,
      RotationsEnum.TopRight,
      RotationsEnum.Bottom
    ];
    const correctTypes = [BlocksEnum.Red, BlocksEnum.Blue, BlocksEnum.Green];

    return rotationsIndexes.some((index) => {
      return correctTypes.some((type) => this.blocks[index] === type);
    });
  }

  get isCorrect(): boolean {
    return Object.keys(correctIndexes).every((block) =>
      this.isCorrectIndex(block)
    );
  }

  rotate(clickIndex: number): void {
    if (!rotations[clickIndex] || this.isCorrect) {
      return;
    }

    const blocks = [...this.blocks];
    const rotationsMap = rotations[clickIndex];

    rotationsMap.forEach((rotationIndex: number, index: number) => {
      if (rotationsMap.length - 1 === index) {
        this.blocks[rotationsMap[0]] =
          blocks[rotationsMap[rotationsMap.length - 1]];
      } else {
        this.blocks[rotationsMap[index + 1]] = blocks[rotationIndex];
      }
    });
  }

  setAnimation(value: boolean, index?: number): void {
    this.isAnimation = value;
    this.rotationIndex = index || null;
  }
}

export const BoxGameContext = createContext<BoxStore | null>(null);

export const useStore = <T>(context: React.Context<T | null>): T => {
  const data = useContext(context);

  if (!data) {
    throw new Error("Using store outside of context");
  }

  return data;
};
