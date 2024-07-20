interface MyIterator extends AsyncIterator<number> {
  current: number;
  end: number;
  next(): Promise<IteratorResult<number>>;
}
interface MyIteratable extends AsyncIterable<number> {
  start: number;
  end: number;
  [Symbol.asyncIterator](): MyIterator;
}

const generateAsyncNumbers = (start: number, end: number): MyIteratable => {
  return {
    start,
    end,
    [Symbol.asyncIterator]() {
      const myIterator: MyIterator = {
        current: this.start,
        end: this.end,
        async next(): Promise<IteratorResult<number>> {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (this.current < this.end) {
            this.current++;
            return { value: this.current, done: false };
          }
          return { value: NaN, done: true };
        },
      };
      return myIterator;
    },
  };
};
(async () => {
  console.log("start");
  for await (const num of generateAsyncNumbers(0, 3)) {
    console.log(num);
  }

  console.log("start");
  const iterator: MyIterator = generateAsyncNumbers(0, 3)[
    Symbol.asyncIterator
  ]();
  while (true) {
    const { value, done } = await iterator.next();

    if (done) {
      break;
    }
    console.log(value);
  }
})();
