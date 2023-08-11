import * as fs from "fs";

import { parseInputData } from "./utils.js";

const run = () => {
  const { mapBounds, robotData } = parseInputData(
    fs.readFileSync("./input.txt", "utf-8")
  );

  console.log(mapBounds, robotData);
};

run();
