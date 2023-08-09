export type ForwardRefSubComponent<T, U> = Combine<
  React.ForwardRefExoticComponent<
    Combine<T, React.RefAttributes<HTMLDivElement>>
  >,
  U
>;


type Combine<T, K> = T & Omit<K, keyof T>;