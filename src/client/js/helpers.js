/**
 * @description Countdown to date of departure
 * @param {String} currentDate
 * @param {String} departDate
 * @returns A value until date of departure from current date
 */

export const getDaysLeft = (currentDate, departDate) => {
  return Math.ceil(
    Math.abs(new Date(departDate) - new Date(currentDate)) /
      (1000 * 60 * 60 * 24)
  );
};

/**
 * @description Reformat date
 * @param {String} date
 * @returns {String} Date reformatted to dd/mm/yyyy
 */

export const reformatDate = (date) => {
  return date.split("-").reverse().join("-").replace(/-/g, "/");
};

/**
 * @description Form validation
 * @param {String} from - Departing from
 * @param {String} to - Destination
 * @param {String} departDate
 * @param {String} returnDate
 */

export const formValidation = (to, from, departDate, returnDate) => {
  if ((from, to, departDate, returnDate !== "")) return true;
};
