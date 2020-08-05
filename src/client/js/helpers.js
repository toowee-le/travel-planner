// Countdown to date of departure
export const getDaysLeft = (currentDate, departDate) => {
    return Math.ceil(Math.abs(new Date(departDate) - new Date(currentDate)) / (1000 * 60 * 60 * 24));
}