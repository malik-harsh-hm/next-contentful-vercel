/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// Copied from https://github.com/kbrabrand/camelize-ts, because we can't use the ES Module in ts-node

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
    : S;

export type Camelize<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends
    | Array<infer U>
    | undefined
    ? U extends {} | undefined | null
      ? Array<Camelize<U>>
      : T[K]
    : T[K] extends {} | undefined | null
    ? Camelize<T[K]>
    : T[K];
};

function camelCase(str: string) {
  return str.replace(/[_.-](\w|$)/g, (_, x: string) => {
    return x.toUpperCase();
  });
}

function walk(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  if (obj instanceof Date || obj instanceof RegExp) return obj;
  if (Array.isArray(obj)) return obj.map(walk);

  return Object.keys(obj).reduce((res: Record<string, any>, key) => {
    const camel = camelCase(key);
    res[camel] = walk(obj[key]);
    return res;
  }, {});
}

export default function camelize<T>(
  obj: T
): T extends string ? string : Camelize<T> {
  return typeof obj === "string" ? camelCase(obj) : walk(obj);
}
