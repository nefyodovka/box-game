import { Howl, HowlOptions } from "howler";

export enum AudioEnum {
  BoxRotate,
  BoxOpened
}

export const AUDIOS: Record<AudioEnum, HowlOptions> = {
  [AudioEnum.BoxRotate]: {
    src: require("./sounds/box-rotate.mp3")
  },
  [AudioEnum.BoxOpened]: {
    src: require("./sounds/box-opened.mp3")
  }
};

export class AudioController {
  audios: Partial<Record<AudioEnum, Howl>> = {};

  addAudio(key: AudioEnum, audio?: HowlOptions): void {
    if (!(key in this.audios)) {
      this.audios[key] = new Howl(audio || AUDIOS[key]);
    }
  }

  play = (key: AudioEnum): Howl | null => {
    if (!(key in this.audios)) {
      this.addAudio(key);
    }
    const audio = this.audios[key];

    if (audio) {
      audio.play();
      return audio;
    }

    return null;
  };

  async preload(audios: AudioEnum[]): Promise<unknown> {
    const loadAudio = (key: AudioEnum) =>
      new Promise<void>((res) => {
        this.addAudio(key);
        const onLoad = () => res();

        this.audios[key]?.on("load", onLoad);
        this.audios[key]?.on("loaderror", onLoad);
        this.audios[key]?.load();
      });

    return Promise.all(audios.map(loadAudio));
  }
}
