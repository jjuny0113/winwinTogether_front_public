export const insertHttp = (url: string) =>
  url ? (/(?<=)http(s?)/.test(url) ? url : `https://${url}`) : "";
