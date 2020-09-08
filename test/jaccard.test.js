const recognizy = require("../dist/recognizy");

test("jaccard distance should be 1 - 2/6", () => {
  const sentence = "Jest is a nice testing library";
  const array = sentence.split(" ");
  const searched = ["testing", "library"];
  expect(recognizy.jaccard(new Set(array), new Set(searched))).toBe(1 - 2 / 6);
});
