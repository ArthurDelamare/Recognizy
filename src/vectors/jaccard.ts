export default function jaccard(setA: Set<string>, setB: Set<string>): number {
  let distance = 0;
  let intersect = 0;

  if (setA.size < setB.size) {
    setA.forEach((element) => {
      if (setB.has(element)) {
        intersect += 1;
      }
    });
  } else {
    setB.forEach((element) => {
      if (setA.has(element)) {
        intersect += 1;
      }
    });
  }

  distance =
    setA.size || setB.size
      ? 1 - intersect / (setA.size + setB.size - intersect)
      : 0;

  return distance;
}
