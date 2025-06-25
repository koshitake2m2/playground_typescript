import { filter, from, tap } from "rxjs";

from([1, 2, 3, 4, 5])
  .pipe(
    tap((x) => console.log(`source ${x}`)),
    filter((x) => x % 2 === 0),
    tap((x) => console.log(`filtered ${x}`))
  )
  .subscribe((x) => console.log(`result ${x}`));
