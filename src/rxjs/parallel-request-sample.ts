import {
  Observable,
  bufferCount,
  concatMap,
  delay,
  forkJoin,
  from,
} from "rxjs";

/**
 * 並列リクエストのサンプル.
 * 2並列でリクエストを送信し、2つのリクエストが完了するたびに次の2つのリクエストを送信する.
 */

type SucessResponse = {
  type: "success";
  result: string;
};
type ErrorResponse = {
  type: "error";
  error: string;
};

const doRequest: (
  params: string
) => Observable<SucessResponse | ErrorResponse> = (params: string) => {
  console.log(`request ${params}`);
  const result: SucessResponse | ErrorResponse = params.startsWith("error")
    ? { type: "error", error: params }
    : { type: "success", result: params };
  const p = new Promise((r) => setTimeout(r, 1000)).then(() => result);
  return from(p);
};

const doParallelRequest: (
  params: string[]
) => Observable<(SucessResponse | ErrorResponse)[]> = (params: string[]) => {
  return forkJoin(params.map((param) => doRequest(param)));
};

const requestParams = ["success1", "error1", "success2", "error2", "success3"];
const parallelSize = 2;
const requestInterval = 1000;
from(requestParams)
  .pipe(
    bufferCount(parallelSize),
    concatMap((params) =>
      doParallelRequest(params).pipe(delay(requestInterval))
    )
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
