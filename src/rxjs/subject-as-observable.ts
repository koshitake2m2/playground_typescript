import { Subject } from "rxjs";

const subject = new Subject<number>();
const observable = subject.asObservable();

// Subject is also an Observable.
// asObservable() method is used to hide the subject methods and expose only the observable methods.
subject.subscribe({
  next: (x: number) => console.log("subject: ", x),
  error: (err: Error) => console.error("subject: ", err),
  complete: () => console.log("subject: complete"),
});

observable.subscribe({
  next: (x: number) => console.log("observable: ", x),
  error: (err: Error) => console.error("observable: ", err),
  complete: () => console.log("observable: complete"),
});

subject.next(1);
subject.next(2);
subject.complete();
