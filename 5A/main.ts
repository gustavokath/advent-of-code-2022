import { lineUtil } from "../util.js";

const crates = new Map<number, string[]>;

const makeMove = (qtBlocks: number, from: number, to: number): void => {
  for(let i = 0; i < qtBlocks; i++) {
    const moved = crates.get(from)?.pop();
    if(moved) {
      crates.get(to)?.push(moved);
    }
  }
}

for await (const line of lineUtil) {
  //Line is stack
  if (line.startsWith("[") || line.startsWith("   ")) {
    const itemsLine = line
      .match(/.{3}(.|\n|$)/g)
      ?.map((v) => v.replace(/\[|\]/g, "").trim())

      for(let i = 0; i < (itemsLine?.length ?? 0); i++) {
        const value = itemsLine?.[i]!

        if(value === "") continue;

        if(!crates.has(i+1)) {
          crates.set(i+1, []);
        }
        crates.get(i+1)?.unshift(value);
      }
  } else if(line.startsWith("move")) {
    const [qtBlocks, from, to] = line.match(/\d+/g)?.map((v) => Number(v)) as [number, number, number];
    makeMove(qtBlocks, from, to);
  }
}

let topItems = [];

for(let i=0; i<crates.size; i++){
  const stack = crates.get(i+1)!;
  topItems.push(stack[stack?.length - 1]);
}

console.log(topItems.join(""))
