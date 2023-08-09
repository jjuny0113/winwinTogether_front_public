export const useGetTextaresStyle = (
  isFocus: boolean,
  isError: boolean,
  watchValue: string,
  width:string
) => {
  const getWrapperTw = () => {
    const baseTw =
      "flex flex-col gap-[9px] border rounded-2xl z-10 px-4 relative h-[126px]";
    const focusBgTw = "bg-purpleLight";
    const normalBgTw = "bg-white";

    const errorBorderTw = "border-errorPink";
    const focusBorderTw = "border-purpleMain ";
    const normalBorderTw = "border-monoGray3";
    if (isFocus) {
      return isError
        ? ` ${baseTw} ${focusBgTw} ${errorBorderTw} `
        : `${baseTw} ${focusBgTw} ${focusBorderTw}   `;
    }
    if (watchValue) {
      return `${baseTw} ${normalBgTw} ${focusBorderTw} `;
    }
    return isError
      ? ` ${baseTw} ${normalBgTw} ${errorBorderTw}`
      : ` ${baseTw} ${normalBgTw} ${normalBorderTw}`;
  };

  const getPlaceholderStyle = () => {
    const baseTw = "opacity-80 leading-[14px]";
    const focusOutTw = "text-[14px] translate-y-2 transition-all";
    const focusInTw = "text-[12px] translate-y-2 transition-all";
    const focusTextColorTw = "text-purpleMain";
    const baseTextColorTw = "text-monoGray3";
    const errorTextTw = "text-errorPink";

    if (isError) {
      return isFocus
        ? `${baseTw} ${focusInTw} ${errorTextTw}`
        : `${baseTw} ${focusOutTw} ${errorTextTw}`;
    }

    if (watchValue) {
      return isFocus
        ? `${baseTw} ${focusInTw} ${focusTextColorTw}`
        : `${baseTw} ${focusInTw} ${baseTextColorTw}`;
    }
    return isFocus
      ? `${baseTw} ${focusInTw} ${focusTextColorTw}`
      : `${baseTw} ${focusOutTw} ${baseTextColorTw}`;
  };

  const getTextareaStyle = () => {
    const baseTw = width === "chat"?"text-xs text-black outline-none":"text-black text-[16px] leading-[19px] outline-none";

    const focusBgTw = " bg-purpleLight h-[70%]";
    const normalBgTw = "bg-white";
    const errorTextColorTw = "text-errorPink";

    if (watchValue) {
      if (isFocus) {
        return `${baseTw}  ${focusBgTw}`;
      }
      if (isError) {
        return `${baseTw}  ${errorTextColorTw} ${normalBgTw}`;
      }

      return `${baseTw}  ${normalBgTw}`;
    }

    return isFocus ? `${baseTw}  ${focusBgTw}` : `${baseTw}  ${normalBgTw}`;
  };

  return {
    getWrapperTw,
    getPlaceholderStyle,
    getTextareaStyle,
  };
};
