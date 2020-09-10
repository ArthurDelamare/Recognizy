const recognizy = require("../dist/recognizy");

test("Rabinkarp should not return any match when pattern doesn't match", () => {
    const text = "Not doing test is nice";
    const pattern = "good";

    const matches = recognizy.rabinkarp(text, pattern);

    expect(matches.length).toBe(0);
});

test("Rabinkarp should return one match when pattern fully match", () => {
    const text = "Doing test is enjoyable";
    const pattern = "enjoyable";

    const matches = recognizy.rabinkarp(text, pattern);

    expect(matches.length).toStrictEqual(1);
    expect(matches).toStrictEqual([14]);
});

test("Rabinkarp should return one match when pattern partially match", () => {
    const text = "Doing test is enjoyable";
    const pattern = "enj";

    const matches = recognizy.rabinkarp(text, pattern);

    expect(matches.length).toStrictEqual(1);
    expect(matches).toStrictEqual([14]);
});

test("Rabinkarp should return multiple matches when pattern matches several times", () => {
    const text = "Doing test is enjoyable but I enjoy it even more when it's all green";
    const pattern = "enjoy";

    const matches = recognizy.rabinkarp(text, pattern);

    expect(matches.length).toStrictEqual(2);
    expect(matches).toStrictEqual([14, 30]);
});