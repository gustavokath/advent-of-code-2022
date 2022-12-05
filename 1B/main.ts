import { lineUtil } from "../util.js";

const checkTopElf = (calories: number, topElfs: number[]) => {
  if (topElfs.length < 3) {
    topElfs.push(calories);
  } else {
    for (let i = 0; i < topElfs.length; i++) {
      if (calories > topElfs[i]) {
        topElfs[i] = calories;
        break;
      }
    }
  }

  topElfs.sort((a, b) => a - b);
};

const topElfs: number[] = [];
let curCalories = 0;
for await (const line of lineUtil) {
  if (line === "") {
    checkTopElf(curCalories, topElfs);
    curCalories = 0;
  }

  curCalories += Number(line);
}

checkTopElf(curCalories, topElfs);

console.log(topElfs.reduce((prev, cur) => prev + cur, 0));
