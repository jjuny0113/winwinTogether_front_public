export const convert24To12 = (time: string) => {
  const [hour, min] = time.split(":");
  return `${Number(hour) % 12}:${min}`;
};
