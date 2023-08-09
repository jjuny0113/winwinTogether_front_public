export const writeClipboardText = async (text: string) =>
  await navigator.clipboard.writeText(text);
