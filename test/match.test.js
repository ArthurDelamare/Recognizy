const recognizy = require ('../dist/recognizy');

test("find a match into list", () => {
  const array = ["I like apples", "tomatoes are great", "pizzas are the best"];
  const searched = "apples";
  expect(recognizy.match(searched, array)).toBe("I like apples");
});

test("jaccard", () => {
  const sentence = "Jest is a nice testing library";
  const array = sentence.split(" ");
  const searched = ["testing", "library"];
  expect(recognizy.jaccard(new Set(array), new Set(searched))).toBe(1 - (2/6));
});