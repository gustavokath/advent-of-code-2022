import { lineUtil } from "../util.js";

const SIZE_OF_MARKER = 4;

const findInitialPackage = (buffer: string): number => {
  const letters = new Map<string, number>
  for(let i=0; i < buffer.length; i++){
    const outOfWindowIndex = i - SIZE_OF_MARKER;
    const current = buffer[i];

    if(outOfWindowIndex >= 0){
      const outOfWindow = buffer[outOfWindowIndex];

      if(letters.get(outOfWindow)! > 1) {
        letters.set(outOfWindow, letters.get(outOfWindow)! - 1);
      } else {
        letters.delete(outOfWindow)
      }
    }

    if(letters.has(current)) {
      letters.set(current, letters.get(current)! + 1);
    } else {
      letters.set(current, 1);
    }

    if(letters.size === SIZE_OF_MARKER) {
      return i+1;
    }
  }
  return -1;
}

for await (const line of lineUtil) {
  console.log(findInitialPackage(line));
}
