import * as React from "react";
import { observer } from "mobx-react";

import { BoxGameContext, useStore } from "./store";
import { BlockProps, PositionType } from "./types";
import {
  RotationCircleWrapper,
  BlockImg,
  generatePositionStyle
} from "./styles";
import { rotations, ROTATION_CIRCLE_SHIFT, blocksPositions } from "./config";

const RotationCircle: React.FC<BlockProps> = ({
  position,
  type,
  index
}: BlockProps) => {
  const store = useStore(BoxGameContext);

  const getPosition = (inCirclePosition: PositionType): PositionType => {
    return [
      inCirclePosition[0] - position[0] + ROTATION_CIRCLE_SHIFT,
      inCirclePosition[1] - position[1] + ROTATION_CIRCLE_SHIFT
    ];
  };

  return (
    // Рисуем оверлей для вращающихся блоков
    <RotationCircleWrapper
      $rotate={store.isAnimation && store.rotationIndex === index}
      isCorrect={store.isCorrect}
    >
      {Object.keys(rotations[index]).map((rotationBlockIndex, i) => {
        const block = rotations[index][rotationBlockIndex];
        const blockPosition = getPosition(blocksPositions[block]);
        // Проходимся по индексам вращений - рисуем блоки, которые будут вращаться
        return (
          <BlockImg
            type={store.blocks[block]}
            key={i}
            $rotate={store.isAnimation && store.rotationIndex === index}
            style={generatePositionStyle(blockPosition)}
          />
        );
      })}
      {/* Рисуем центральный блок */}
      <BlockImg
        type={type}
        isRotation
        $rotate={store?.isAnimation && store?.rotationIndex === index}
        style={generatePositionStyle(getPosition(position))}
      />
    </RotationCircleWrapper>
  );
};

export default observer(RotationCircle);
