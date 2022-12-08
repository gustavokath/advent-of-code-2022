import { lineUtil } from "../util.js";

const fullyContains = ([pair1, pair2]: string[]): number => {
  const [pair1Start, pair1End] = pair1.split("-").map((v) => Number(v));
  const [pair2Start, pair2End] = pair2.split("-").map((v) => Number(v));

  if (pair1Start <= pair2Start && pair1End >= pair2End) return 1;

  if (pair2Start <= pair1Start && pair2End >= pair1End) return 1;

  return 0;
};

let sum = 0;
for await (const line of lineUtil) {
  sum += fullyContains(line.split(","));
}

console.log(sum);
