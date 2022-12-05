import { lineUtil } from "../util.js";

let curCalories = 0;
let maxCalories = 0;

for await (const line of lineUtil) {
  if (line === "") {
    if (curCalories > maxCalories) {
      maxCalories = curCalories;
    }
    curCalories = 0;
  }

  curCalories += Number(line);
}

if (curCalories > maxCalories) {
  maxCalories = curCalories;
}

console.log(maxCalories);
