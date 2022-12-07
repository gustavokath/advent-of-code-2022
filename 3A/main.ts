import { lineUtil } from "../util.js";

const ASC_LOWER_A = 97;
const ASC_UPPER_A = 65;
const START_UPPER = 27;

const wrongItemInPack = (line: string): Set<string> => {
  const duplicates = new Set<string>();
  const half = line.length / 2;
  const part1 = line.slice(0, half);
  const part2 = line.slice(half * -1);
  const lettersSet = new Set<string>();

  for (const char of part1) {
    lettersSet.add(char);
  }

  for (const char of part2) {
    if (lettersSet.has(char)) {
      duplicates.add(char);
    }
  }

  return duplicates;
};

const prioritiesSum = (duplicates: Set<string>): number => {
  let curSum = 0;
  for (const letter of duplicates) {
    const charCode = letter.charCodeAt(0);
    if (charCode >= ASC_LOWER_A) {
      curSum += charCode - (ASC_LOWER_A - 1);
    } else {
      curSum += charCode - ASC_UPPER_A + START_UPPER;
    }
  }
  return curSum;
};

let sum = 0;
for await (const line of lineUtil) {
  const duplicates = wrongItemInPack(line);
  sum += prioritiesSum(duplicates);
}

console.log(sum);
