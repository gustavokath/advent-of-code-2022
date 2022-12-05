import { lineUtil } from "../util.js";

/**
 * A = Rock
 * B = Paper
 * C = Scissors
 */
type Plays = "A" | "B" | "C";

/**
 * X = Need to Loose
 * Y = Need to Draw
 * Z = Need to Win
 */
type MatchNeeds = "X" | "Y" | "Z";

const playPoints = { A: 1, B: 2, C: 3 };
const myPlayNeed = {
  A: { X: "C", Y: "A", Z: "B" },
  B: { X: "A", Y: "B", Z: "C" },
  C: { X: "B", Y: "C", Z: "A" },
};

const matchPoints = { X: 0, Y: 3, Z: 6 };

let sum = 0;

for await (const line of lineUtil) {
  const [opponentPlay, need] = line.split(" ") as [Plays, MatchNeeds];

  const myPlay = myPlayNeed[opponentPlay][need] as Plays;
  sum += playPoints[myPlay] + matchPoints[need];
}

console.log(sum);
