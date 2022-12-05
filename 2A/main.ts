import { lineUtil } from "../util.js";

/**
 * A = Rock
 * B = Paper
 * C = Scissors
 */
type OpponentPlays = "A" | "B" | "C";

/**
 * X = Rock
 * Y = Paper
 * Z = Scissors
 */
type MyPlays = "X" | "Y" | "Z";

let playPoints = { X: 1, Y: 2, Z: 3 };
let matchPoints = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

let sum = 0;

for await (const line of lineUtil) {
  const [opponentPlay, myPlay] = line.split(" ") as [OpponentPlays, MyPlays];

  const round = (sum += playPoints[myPlay] + matchPoints[opponentPlay][myPlay]);
}

console.log(sum);
