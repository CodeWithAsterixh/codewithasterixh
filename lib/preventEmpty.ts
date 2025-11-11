export type FalsyValue = false | "" | 0 | 0n | null | undefined;
export type TruthyValue<T> = Exclude<T, FalsyValue>;

export namespace Booleanish {
  export type Falsy = FalsyValue;
  export type Truthy<T> = TruthyValue<T>;
}

export type TrueObject<T> = {
  [K in keyof T]: Booleanish.Truthy<T[K]>;
};
// validateActions?: (value: T) => {
//     valid: boolean;
//     message?: string;
//   }

interface EmptyParams<T> {
  value: T;
  validateActions?: (value: T) => {
    valid: boolean;
    message?: string;
  };
  defaultMessage?: string;
}

export const isEmpty = <T = unknown>({
  value,
  validateActions,
  defaultMessage = "Invalid value",
}: EmptyParams<T>) => {
  const { valid, message } = validateActions
    ? validateActions(value)
    : { valid: !!value, message: defaultMessage };
  return { invalid:!valid, message, value: value as Booleanish.Truthy<T> };
};

function preventEmpty<T = unknown>({
  value,
  validateActions,
  defaultMessage = "Invalid value",
}: EmptyParams<T>): Booleanish.Truthy<T> {
  const {
    invalid,
    message,
    value: extractedValue,
  } = isEmpty<T>({
    value,
    defaultMessage,
    validateActions,
  });
  if (invalid) {
    throw new Error(message);
  }
  return extractedValue;
}

export default preventEmpty;
