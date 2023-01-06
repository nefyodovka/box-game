import * as React from "react";
import { observer } from "mobx-react";

import Block from "./Block";
import { BoxWrapper, Success, Shuffle } from "./styles";
import { blocksPositions } from "./config";
import { BoxStore, BoxGameContext } from "./store";
import { AudioEnum } from "../audio";


type Props = {
  onSuccess?: void;
};

const Box: React.FC<Props> = ({ onSuccess }: Props) => {
  const [store] = React.useState(() => new BoxStore());



  React.useEffect(() => {
    store.audioController.preload([AudioEnum.BoxOpened, AudioEnum.BoxRotate]);
  }, []);

  React.useEffect(() => {
    if (store.isCorrect) {
      store.audioController.play(AudioEnum.BoxOpened);
    }
  }, [store.isCorrect]);

  return (
    <BoxGameContext.Provider value={store}>
      <BoxWrapper>
        {blocksPositions.map((position, i) => (
          <Block position={position} index={i} type={store.blocks[i]} key={i} />
        ))}
        {store.isCorrect ? (
          <Success>Слегкимпаром</Success>
        ) : (
          <Shuffle onClick={store.shuffle}>Сбросить</Shuffle>
        )}
      </BoxWrapper>
    </BoxGameContext.Provider>
  );
};

export default observer(Box);
