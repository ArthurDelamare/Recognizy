const recognizy = require("../dist/recognizy");
const Fuzzy = recognizy.Fuzzy;

test("When creating a Fuzzy instance, items list should be accessible", () => {
  const items = [
    "Dessert jelly pastry sweet jelly beans pie cheesecake croissant",
    "Cheesecake pudding sesame snaps cupcake pastry gummies macaroon",
    "Macaroon cheesecake jelly beans tart",
    "Donut jelly cake I love",
  ];
  const fuzzy = new Fuzzy(items);
  expect(fuzzy.items).not.toBe(undefined);
  expect(fuzzy.items).not.toBe(null);
  expect(fuzzy.items).toBe(items);
});
