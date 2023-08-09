export const putColonPrice = (price: number): string =>
  price.toString().length < 4
    ? price.toString()
    : price
        .toString()
        .split("")
        .reverse()
        .reduce((acc, cur, index, self) => {
          if (Number(index) % 3 === 2 && index !== self.length - 1) {
            acc += `${cur},`;
          } else {
            acc += cur;
          }

          return acc;
        }, "")
        .split("")
        .reverse()
        .join("");
