import * as fs from "fs";

import { parseInputData, isPositionValid } from "./utils.js";

const DIRECTIONS = ["N", "E", "S", "W"];
const DIR_X_Y = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const run = () => {
  const { bounds, data } = parseInputData(
    fs.readFileSync("./input.txt", "utf-8")
  );

  const lostRobotsCoords = new Set();

  const robotFinalPositions = data.map(
    ({ position, direction, instructions }) => {
      let pos = [...position];
      let dir = DIRECTIONS.indexOf(direction);

      for (let idx = 0; idx < instructions.length; idx++) {
        const instruction = instructions[idx];

        if (instruction === "R") {
          dir = (dir + 1) % DIRECTIONS.length;
          continue;
        }

        if (instruction === "L") {
          dir = (dir + DIRECTIONS.length - 1) % 4;
          continue;
        }

        if (instruction !== "F") {
          console.error("Error!\nUnknown instruction:", instruction);
          return;
        }

        const nextPos = [pos[0] + DIR_X_Y[dir][0], pos[1] + DIR_X_Y[dir][1]];

        // If valid position then move to it
        if (isPositionValid(bounds, nextPos)) {
          pos = nextPos;
          continue;
        }

        // Otherwise check if a robot has already been lost at this point, do nothing if there has
        if (lostRobotsCoords.has(nextPos.join(","))) {
          continue;
        }

        // Robot has fallen off, add the position and stop evaluating the instruction list
        lostRobotsCoords.add(nextPos.join(","));

        return `${pos.join(" ")} ${DIRECTIONS[dir]} LOST`;
      }

      return `${pos.join(" ")} ${DIRECTIONS[dir]}`;
    }
  );

  console.log(robotFinalPositions.join("\n"));
};

run();
