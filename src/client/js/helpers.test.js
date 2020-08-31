import { getDaysLeft, reformatDate } from "./helpers";

test("Return the length of days between current date and departure", () => {
  expect(getDaysLeft("2020-09-04", Date.now())).toBe(4);
});

test("Format the date to dd/mm/yyyy", () => {
  expect(reformatDate("2020-08-31")).toBe("31/08/2020");
});
