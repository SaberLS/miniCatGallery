export default function splitIntoParts(arr, parts) {
  const result = [];

  const len = arr.length;
  const baseSize = Math.floor(len / parts);
  let extra = len % parts;
  let start = 0;

  for (let i = 0; i < parts; i++) {
    const size = baseSize + (extra > 0 ? 1 : 0);
    result.push(arr.slice(start, (start += size)));

    if (extra > 0) extra--;
  }

  // console.log(result);
  return result;
}
