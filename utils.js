const getPositionAndDirection = (s) => {
  const [x, y, direction] = s.split(" ");

  return { position: [Number(x), Number(y)], direction };
};

export const parseInputData = (input) =>
  input.split("\n\n").reduce((acc, cur, idx) => {
    const splitData = cur.split("\n");

    if (idx === 0) {
      const [bounds, pos, instructions] = splitData;

      return {
        bounds: bounds.split(" ").map((s) => Number(s)),
        data: [{ ...getPositionAndDirection(pos), instructions }],
      };
    }

    const [pos, instructions] = splitData;
    return {
      ...acc,
      data: [...acc.data, { ...getPositionAndDirection(pos), instructions }],
    };
  }, {});

export const isPositionValid = ([bX, bY], [x, y]) =>
  !([-1, bX + 1].includes(x) || [-1, bY + 1].includes(y));
