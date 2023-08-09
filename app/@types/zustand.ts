type HeadOf<T> = T extends any[] ? T[0] : never;
type TailOf<T> = T extends [any, ...infer U] ? U : [];

type IsEmpty<T extends any[]> = T extends [] ? true : false;

export type PathSplit<S extends string> = S extends `${infer T}.${infer U}`
  ? [T, ...PathSplit<U>]
  : [S];

export type NestedValueOf<Type, Paths extends any[]> = IsEmpty<
  TailOf<Paths>
> extends true
  ? Type[HeadOf<Paths>]
  : NestedValueOf<Type[HeadOf<Paths>], TailOf<Paths>>;

type Primitive = string | number | bigint | boolean | undefined | symbol;

export type PropertyStringPath<T, Prefix = ""> = {
  [K in keyof T]: T[K] extends Primitive | Array<any>
    ? `${string & Prefix}${string & K}`
    :
        | `${string & Prefix}${string & K}`
        | PropertyStringPath<T[K], `${string & Prefix}${string & K}.`>;
}[keyof T];

export type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: NonNullable<Type[Key]>;
};
