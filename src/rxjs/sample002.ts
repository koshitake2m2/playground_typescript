import { Observable, from, mergeMap } from "rxjs";

const requestA: () => Observable<number> = () => {
  console.log("requestA");
  const p = new Promise((r) => setTimeout(r, 1000)).then(() => 1);
  return from(p);
};
const requestB: (a: number) => Observable<number> = (a: number) => {
  console.log("requestB");
  const p = new Promise((r) => setTimeout(r, 1000)).then(() => a * 2);
  return from(p);
};
const requestC: (b: number) => Observable<number> = (b: number) => {
  console.log("requestC");
  const p = new Promise((r) => setTimeout(r, 1000)).then(() => b + 10);
  return from(p);
};

requestA()
  .pipe(
    mergeMap((a) => requestB(a)),
    mergeMap((b) => requestC(b))
  )
  .subscribe({
    next: (value) => {
      console.log("next", value);
    },
    error: (error) => {
      console.log("error", error);
    },
    complete: () => {
      console.log("complete");
    },
  });
