// ref: [RxJS - EMPTY](https://rxjs.dev/api/index/const/EMPTY)
import { interval, mergeMap, of, EMPTY, take } from "rxjs";

/**
 * 5回まで1秒ごとに処理をするサンプル
 */

const interval$ = interval(1000);
const result = interval$.pipe(
  take(5),
  mergeMap((x) => {
    console.log(`interval ${x}`);
    return x % 2 === 1 ? of("a", "b", "c") : EMPTY;
  })
);
result.subscribe((x) => console.log(x));
