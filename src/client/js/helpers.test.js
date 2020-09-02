import { getDaysLeft, reformatDate } from "./helpers";

test("Return the length of days between current date and departure", () => {
  expect(getDaysLeft("2020-09-04", "2020-09-02")).toBe(2);
});

test("Format the date to dd/mm/yyyy", () => {
  expect(reformatDate("2020-08-31")).toBe("31/08/2020");
});
