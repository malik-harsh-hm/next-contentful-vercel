export function isDefined<T>(value: T | undefined | null): value is T {
  return value != null;
}

export function isTruthy<T>(value: T | undefined | null): value is T {
  return !!value;
}
