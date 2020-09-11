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

test("Should return a match when given a list of strings and a matcher pattern", () => {
  const items = [
    "Dessert jelly pastry sweet jelly beans pie cheesecake croissant",
    "Cheesecake pudding sesame snaps cupcake pastry gummies macaroon",
    "Macaroon cheesecake jelly beans tart",
    "Donut jelly cake I love",
  ];
  const fuzzy = new Fuzzy(items);

  const matches = fuzzy.search("cupcake");

  expect(matches.length).not.toBe(0);
});

test("Should return several matches", () => {
  const items = [
    "Dessert jelly pastry sweet jelly beans pie cheesecake croissant",
    "Cheesecake pudding sesame snaps cupcake pastry gummies macaroon",
    "Macaroon cheesecake jelly beans tart",
    "Donut jelly cake I love",
  ];
  const fuzzy = new Fuzzy(items);

  const matches = fuzzy.search("cheesecake");

  expect(matches.length).toBeGreaterThan(1);
  expect(matches).toContainEqual({
    item: 'Dessert jelly pastry sweet jelly beans pie cheesecake croissant',
    index: 0,
    matchesAt: [ 43 ]
  });
});