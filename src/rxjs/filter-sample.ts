// [RxJS - filter](https://rxjs.dev/api/operators/filter)
import { filter, interval, take, tap } from "rxjs";

interval(500)
  .pipe(
    take(5),
    tap((x) => console.log(`interval ${x}`)), // 0, 1, 2, 3, 4
    filter((x) => x % 2 === 1),
    tap((x) => console.log(`filter ${x}`)) // 1, 3
  )
  .subscribe((x) => console.log(x));
