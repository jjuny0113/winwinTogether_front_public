export const handlingWordiness = (word: string, point: number) =>
  word.length > point ? `${word.substring(0, point)}...` : word;
