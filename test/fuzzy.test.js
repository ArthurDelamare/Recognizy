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

test("Should throw an error when using object without specifying keys in options", () => {
  const items = [
    {
      movie: "Tenet",
      synopsis: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
      author: "Christopher Nolan"
    },
    {
      movie: "Inception",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      author: "Christopher Nolan"
    },
    {
      movie: "The perks of being a wallflower",
      synopsis: "An introvert freshman is taken under the wings of two seniors who welcome him to the real world.",
      author: "Stephen Chbosky"
    }
  ];
  const fuzzy = new Fuzzy(items);

  expect(() => { fuzzy.search("wallflower") }).toThrowError(new Error("Used object without specifying keys in options."));
});