import { lineUtil } from "../util.js";

const ASC_LOWER_A = 97;
const ASC_UPPER_A = 65;
const START_UPPER = 27;

const findBadge = (lines: string[]): Set<string> => {
  let prevSet = new Set<string>();

  for (const char of lines[0]) {
    prevSet.add(char);
  }

  for (const line of [lines[1], lines[2]]) {
    const nextSet = new Set<string>();
    for (const char of line) {
      if (prevSet.has(char)) {
        nextSet.add(char);
      }
    }
    prevSet = nextSet;
  }

  return prevSet;
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
let group: string[] = [];
for await (const line of lineUtil) {
  group.push(line);

  if (group.length === 3) {
    const duplicates = findBadge(group);
    sum += prioritiesSum(duplicates);
    group = [];
  }
}

console.log(sum);
