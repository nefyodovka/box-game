import * as React from "react";
import { observer } from "mobx-react";

import { BlockImg, generatePositionStyle } from "./styles";
import { rotations, ANIMATION_TIME, BlocksEnum } from "./config";
import { PositionType } from "./types";
import { BoxGameContext, useStore } from "./store";
import RotationCircle from "./RotationCircle";

import { AudioEnum } from "../audio";

interface Props {
  position: PositionType;
  type: BlocksEnum;
  index: number;
}

const Block: React.FC<Props> = ({ position, type, index }: Props) => {
  const store = useStore(BoxGameContext);
  const isRotation = rotations[index];

  const withRotationCircle =
    isRotation && (!store.rotationIndex || store.rotationIndex === index);

  const rotateIndex = () => {
    store.rotate(index);
    store.setAnimation(false);
  };

  const handleRotation = () => {
    if (store.isAnimation) {
      return;
    }
    store.setAnimation(true, index);
    store.audioController.play(AudioEnum.BoxRotate);
    setTimeout(rotateIndex, ANIMATION_TIME);
  };

  const isHide = () => {
    if (!store.rotationIndex) {
      return false;
    }
    const rotationIndexes = rotations[store.rotationIndex];
    return Object.keys(rotationIndexes).some(
      (key) => rotationIndexes[key] === index
    );
  };

  return (
    <BlockImg
      type={type}
      onClick={isRotation && !store.isCorrect ? handleRotation : undefined}
      isHide={isHide()}
      isCorrect={store.isCorrect}
      withRotationCircle={withRotationCircle}
      style={generatePositionStyle(position)}
    >
      {withRotationCircle && (
        <RotationCircle position={position} type={type} index={index} />
      )}
    </BlockImg>
  );
};

export default observer(Block);
