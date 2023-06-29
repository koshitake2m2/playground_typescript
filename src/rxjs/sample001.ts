import { Observer, Subject } from "rxjs";

const subjectA = new Subject<number>();
const observableA = subjectA.asObservable();
const observableB = subjectA.asObservable();

const observerA: Observer<number> = {
  next: (value: number) => {
    console.log("next", value);
  },
  error: (error: Error) => {
    console.log("error", error);
  },
  complete: () => {
    console.log("complete A");
  },
};
const observerB: Observer<number> = {
  next: (value: number) => {
    console.log("next", value * 10);
  },
  error: (error: Error) => {
    console.log("error", error);
  },
  complete: () => {
    console.log("complete B");
  },
};

// この時, subscriptionAとsubscriptionBはsubjectA.observersに格納される.
const subscriptionA = observableA.subscribe(observerA);
const subscriptionB = observableB.subscribe(observerB);
console.log("subjectA", subjectA);
console.log("subscriptionA", subscriptionA);
console.log("subscriptionB", subscriptionB);

subjectA.next(1);
subjectA.next(2);
// この時, subscriptionAとsubscriptionBはsubjectA.observersから削除される.
subjectA.complete();

console.log("subjectA", subjectA);
console.log("subscriptionA", subscriptionA);
console.log("subscriptionB", subscriptionB);
