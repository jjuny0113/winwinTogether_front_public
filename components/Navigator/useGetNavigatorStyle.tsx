import { INavigator } from "./Navigator";

export const useGetNavigatorStyle = (step: INavigator["step"]) => {
  const stepStyle = (() => {
    const activeStageTw =
      "border-[1px] border-purpleMain bg-purpleLight text-purpleMain";
    const finishStargeTw = "bg-purpleMain text-white";
    const readyStageTw = "bg-monoGray2 text-monoGray4";
    const mapper = new Map<INavigator["step"], string[]>([
      [
        1,
        [
          `${activeStageTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        2,
        [
          `${finishStargeTw}`,
          `${activeStageTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        3,
        [
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${activeStageTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        4,
        [
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${activeStageTw}`,
        ],
      ],
    ]);
    return mapper.get(step) ?? [];
  })();

  const stageValueStyle = (() => {
    const finishStargeTw = "text-purpleMain";
    const readyStageTw = "text-monoGray4";
    const mapper = new Map<INavigator["step"], string[]>([
      [
        1,
        [
          `${finishStargeTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        2,
        [
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${readyStageTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        3,
        [
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${readyStageTw}`,
        ],
      ],
      [
        4,
        [
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${finishStargeTw}`,
          `${finishStargeTw}`,
        ],
      ],
    ]);
    return mapper.get(step) ?? [];
  })();

  const lineStyle = (() => {
    const readyStageTw = "bg-monoGray2";
    const activeStageTw =
      "bg-gradient-to-r from-purpleMain to-monoGray2";
    const finishStageTw = "bg-purpleMain";
    const mapper = new Map<INavigator["step"], string[]>([
      [1, [`${activeStageTw}`, `${readyStageTw}`, `${readyStageTw}`]],
      [2, [`${finishStageTw}`, `${activeStageTw}`, `${readyStageTw}`]],
      [3, [`${finishStageTw}`, `${finishStageTw}`, `${activeStageTw}`]],
      [4, [`${finishStageTw}`, `${finishStageTw}`, `${finishStageTw}`]],
    ]);

    return mapper.get(step) ?? [];
  })();

  return {
    stepStyle,
    stageValueStyle,
    lineStyle,
  };
};
