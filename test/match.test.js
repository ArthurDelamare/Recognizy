const recognizy = require("../dist/recognizy");

test("find a match into list", () => {
  const array = ["I like apples", "tomatoes are great", "pizzas are the best"];
  const searched = "apples";
  expect(recognizy.match(searched, array)).toBe("I like apples");
});
