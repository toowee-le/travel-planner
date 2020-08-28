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
