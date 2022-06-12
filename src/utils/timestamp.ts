import dayjs, { UnitType } from 'dayjs';

export const getCurrent = (key: UnitType) => {
  return dayjs().get(key);
};

export const getDaysInMonth = () => {
  return dayjs().daysInMonth();
};

export const getFirstDayOfMonth = () => {
  return dayjs().date(1).day();
};

export const getCurrentDate = () => {
  return dayjs().date();
};
