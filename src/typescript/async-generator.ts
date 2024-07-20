export async function* asyncRange(
  start: number,
  end: number
): AsyncGenerator<number> {
  for (let i = start; i < end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  for await (const i of asyncRange(0, 5)) {
    console.log(`i: ${i}`);
  }
})();
