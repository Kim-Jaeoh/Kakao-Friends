export const useTimeStamp = () => {
  const timeToString = (item) => {
    const orderDay = new Date(item?.created_at);

    const year = orderDay.getFullYear();
    const month = ("0" + (orderDay.getMonth() + 1)).slice(-2);
    const day = ("0" + orderDay.getDate()).slice(-2);
    const hours = ("0" + orderDay.getHours()).slice(-2);
    const minutes = ("0" + orderDay.getMinutes()).slice(-2);
    const seconds = ("0" + orderDay.getSeconds()).slice(-2);
    const ampm = hours < 12 ? "am" : "pm";

    const dateString =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      ampm;

    return dateString;
  };
  return { timeToString };
};
