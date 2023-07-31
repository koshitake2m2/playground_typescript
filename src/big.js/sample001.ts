/**
 * ref: [Number型 - TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/recap/number#big.js)
 */
import { Big } from "big.js";

// ref: https://mikemcl.github.io/big.js/#DP
// 小数点以下の桁数の最大値
Big.DP = 20; // MAX_DP = 1e6
// Big.PE // toStringの際の指数表記を始める桁数

const foo = new Big("111.11111111111111111111");
const bar = foo.plus(new Big("0.00000000000000000001"));

// numberを得る方法
const x: number = Number(bar.toString()); // 小数点以下の精度を失う
console.log(bar.toString());
console.log(x);

{
  const a = new Big("12300000000000005");
  const b = new Big("10000000000000003");
  const c = a.mul(b);
  const d = c.add(new Big("10000000000000003"));
  const e = d.div(new Big("10000000000000004"));
  console.log(c.toString());
  console.log(Number(c.toString()));

  console.log(d.toString());
  console.log(e.toString());
}
{
  Big.PE = 20;
  const w = new Big("440000000000000000000");
  const ww = w.div(3);
  console.log(ww.toString());
}

{
  const a = new Big("10000000000000003.1234567890123456789012345");
  console.log(a.pow(33).toString());
}

{
  console.log(0.3 - 0.1);
  console.log(new Big(0.3).minus(new Big(0.1)).toString());

  console.log(0.3 + 0.15);
  console.log(new Big(0.3).plus(new Big(0.15)).toString());
}

{
  const a = new Big("123456789012345.67890");
  const b = new Big("123456789012345.67890");
  console.log(a.add(b).toString());
}
{
  console.log(Big.RM);
  console.log(Big.roundHalfUp);
}
