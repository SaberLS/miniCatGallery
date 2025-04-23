export default function splitIntoParts(arr, parts) {
  const result = [];

  const len = arr.length;
  const baseSize = Math.floor(len / parts);
  let extra = len % parts;
  let start = 0;

  for (let i = 0; i < parts; i++) {
    const size = baseSize + (extra > 0 ? 1 : 0);
    result.push([]);

    const end = start + size;
    // console.log({i, size, result, end})

    for(let j = start; j < end; ++j) {
      result[i].push(j);
    }

    start = end;
    if (extra > 0) extra--;
  }

  // console.log(result);
  return result;
}
