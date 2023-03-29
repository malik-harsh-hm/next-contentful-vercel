export function parseJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source)) as T;
}