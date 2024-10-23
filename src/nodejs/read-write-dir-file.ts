import * as fs from "fs";

const readDir = () => {
  const path = "./src/nodejs";
  fs.readdirSync(path).forEach((file) => {
    console.log(file);
  });
};

const sleep = async (seconds: number) =>
  await new Promise((r) => setTimeout(r, seconds * 1000));

(async () => {
  // Read Dir
  readDir();
  const dirPath = "./src/nodejs/tmp";

  // Create Dir
  console.log("dir exists: ", fs.existsSync(dirPath));
  fs.mkdirSync(dirPath);
  console.log("dir exists: ", fs.existsSync(dirPath));
  await sleep(1);

  // Delete Dir
  fs.rmSync(dirPath, { recursive: true, force: true });
  readDir();
  await sleep(1);

  const path = "./src/nodejs/tmp.txt";
  console.log("file exists: ", fs.existsSync(path));
  await sleep(1);

  // Write file
  fs.writeFileSync(path, "Hello World");
  console.log("file exists: ", fs.existsSync(path));

  // Read file
  const f = fs.readFileSync(path);
  console.log(f.toString());
  await sleep(1);

  // Delete file
  fs.unlinkSync(path);
  console.log("file exists: ", fs.existsSync(path));
})();
