const getPositionAndDirection = (s) => {
  const [x, y, dir] = s.split(" ");

  return { pos: [Number(x), Number(y)], dir };
};

export const parseInputData = (input) =>
  input.split("\n\n").reduce((acc, cur, idx) => {
    const splitData = cur.split("\n");

    if (idx === 0) {
      const [bounds, pos, instructions] = splitData;

      return {
        mapBounds: bounds.split(" ").map((s) => Number(s)),
        robotData: [{ ...getPositionAndDirection(pos), instructions }],
      };
    }

    const [pos, instructions] = splitData;
    return {
      ...acc,
      robotData: [
        ...acc.robotData,
        { ...getPositionAndDirection(pos), instructions },
      ],
    };
  }, {});
