const add = require("./index");

test("Return the sum of params", () => {
  expect(add(1, 2)).toBe(3);
});
