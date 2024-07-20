import * as fs from "fs";
import * as readline from "readline";

// https://nodejs.org/api/readline.html#example-read-file-stream-line-by-line
async function processLineByLine() {
  const filePath = "./src/nodejs/input.txt";
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // CR LF ('\r\n') is used as a line break
  });

  let index = 0;
  for await (const line of rl) {
    index++;
    console.log(`line ${index}: ${line}`);
  }
}

async function processLineByLine2() {
  const filePath = "./src/nodejs/input.txt";
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // CR LF ('\r\n') is used as a line break
  });
  const iterator: AsyncIterableIterator<string> = rl[Symbol.asyncIterator]();

  let index = 0;
  while (true) {
    index++;
    const { value, done } = await iterator.next();

    if (done) {
      break;
    }
    console.log(`line ${index}: ${value}`);
  }
}

(async () => {
  console.log("processLineByLine");
  await processLineByLine();

  console.log("processLineByLine2");
  await processLineByLine2();
})();
