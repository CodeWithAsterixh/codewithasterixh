export type FalsyValue = false | "" | 0 | 0n | null | undefined;
export type TruthyValue<T> = Exclude<T, FalsyValue>;

export namespace Booleanish {
  export type Falsy = FalsyValue;
  export type Truthy<T> = TruthyValue<T>;
}
export type TrueObject<T> = {
  [K in keyof T]: Booleanish.Truthy<T[K]>;
};