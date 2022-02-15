 export default function formatDate(date) {
    const targetDate = new Date(date);
    const currentDate = new Date();
  
    return convertDate(targetDate, currentDate, result);
  }
  
  function result(obj) {
    const {currentMonthAndYear, postDateAndMonth, currentDays, currentHours, currentMintus, currentSeconds} = obj;
    if (currentMonthAndYear - postDateAndMonth) {
        return (
          "last post " + (currentMonthAndYear - postDateAndMonth) + " month ago"
        );
      } else if (currentDays) {
        return "last post " + currentDays + " days ago";
      } else if (currentHours) {
        return "last post " + currentHours + " Hours ago";
      } else if (currentMintus) {
        return "last post " + currentMintus + " Minuts ago";
      } else if (currentSeconds || currentSeconds === 0) {
        return "Posted just Now";
      }
  }
  
  function convertDate(targetDate, currentDate, callback) {
  
      /** step one */
      const currentMonthAndYear = calculateMonthAndYear(currentDate.getMonth() + 1, currentDate.getFullYear());
      const postDateAndMonth = calculateMonthAndYear(targetDate.getMonth() + 1, targetDate.getFullYear());
  
      /**Step Two */
      return callback({currentMonthAndYear, postDateAndMonth, ...calculateDaysHoursMinutsSecond(currentDate, targetDate)});
  }
  
  function calculateMonthAndYear(month, year) {
    return month + year;
  }
  
  function calculateDaysHoursMinutsSecond(currentDate, targetDate) {
    const currentDays =
        currentDate.getDate() > targetDate.getDate()
          ? currentDate.getDate() - targetDate.getDate()
          : targetDate.getDate() - currentDate.getDate();
  
      const currentHours =
        currentDate.getHours() > targetDate.getHours()
          ? currentDate.getHours() - targetDate.getHours()
          : targetDate.getHours() > currentDate.getHours();
  
      const currentMintus =
        currentDate.getMinutes() > targetDate.getMinutes()
          ? currentDate.getMinutes() - targetDate.getMinutes()
          : targetDate.getMinutes() > currentDate.getMinutes();
  
      const currentSeconds =
        currentDate.getSeconds() > targetDate.getSeconds()
          ? currentDate.getSeconds() - targetDate.getSeconds()
          : targetDate.getSeconds() > currentDate.getSeconds();
  
  
          return {currentDays, currentHours, currentMintus, currentSeconds};
  }
  
