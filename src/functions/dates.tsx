import moment from "moment";

export const isWeekday = (date: Date): boolean => {
  const day = moment(date).day();
  return day >= 1 && day <= 5;
};
