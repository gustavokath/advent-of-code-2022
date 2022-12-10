import { lineUtil } from "../util.js";

const crates = new Map<number, string[]>;

const makeMove = (qtBlocks: number, from: number, to: number): void => {
  const fromStack = crates.get(from)!;
  const moved = fromStack?.splice(fromStack.length-qtBlocks, qtBlocks);
  if(moved.length > 0) {
    crates.set(to, crates.get(to)?.concat(moved)!);
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
