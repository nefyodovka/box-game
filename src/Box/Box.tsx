import * as React from "react";
import { observer } from "mobx-react";

import Block from "./Block";
import { BoxWrapper, Success, Shuffle } from "./styles";
import { blocksPositions } from "./config";
import { BoxStore, BoxGameContext } from "./store";
import { AudioEnum } from "../audio";

type Props = {
  onSuccess?(): void;
};

const Box: React.FC<Props> = ({ onSuccess }: Props) => {
  const [store] = React.useState(() => new BoxStore());

  React.useEffect(() => {
    store.audioController.preload([AudioEnum.boxOpened, AudioEnum.boxRotate]);
  }, []);

  React.useEffect(() => {
    if (store.isCorrect) {
      store.audioController.play(AudioEnum.boxOpened);
    }
  }, [store.isCorrect]);

  return (
    <BoxGameContext.Provider value={store}>
      <BoxWrapper>
        {blocksPositions.map((position, i) => (
          <Block position={position} index={i} type={store.blocks[i]} key={i} />
        ))}
        {store.isCorrect ? (
          <Success>Try not. Do, or do not. There is no try.</Success>
        ) : (
          <Shuffle onClick={store.shuffle}>Shuffle</Shuffle>
        )}
      </BoxWrapper>
    </BoxGameContext.Provider>
  );
};

export default observer(Box);
