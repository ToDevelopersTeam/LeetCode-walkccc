type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

function deepFilter(obj: Obj, fn: Function): Obj | undefined {
  if (obj === null || typeof obj !== 'object') {
    return fn(obj) ? obj : undefined;
  }
  if (Array.isArray(obj)) {
    const results = (obj as Obj[])
      .map((item) => deepFilter(item, fn))
      .filter((item) => item !== undefined);
    return results.length > 0 ? results : undefined;
  }
  let ans = {};
  for (const [key, value] of Object.entries(obj)) {
    const result = deepFilter(value as Obj, fn);
    if (result !== undefined) {
      ans[key] = result;
    }
  }
  return Object.keys(ans).length > 0 ? ans : undefined;
}
