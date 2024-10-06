// [RxJS - takeUntil](https://rxjs.dev/api/operators/takeUntil)
import { interval, Subject, takeUntil, tap, timer } from "rxjs";

/**
 * 3秒後に処理を終了するサンプル
 */

const destroy$ = new Subject<void>();
interval(1000)
  .pipe(
    takeUntil(destroy$),
    // 以下のようにしてもいい.
    // takeUntil(destroy$.asObservable()),
    tap((x) => console.log(`interval ${x}`))
  )
  .subscribe({
    next: (x) => console.log("next: ", x),
    complete: () => console.log("complete"),
  });

timer(3000).subscribe(() => destroy$.next());
