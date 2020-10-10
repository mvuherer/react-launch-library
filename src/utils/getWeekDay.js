export default (
  day = new Date().getDate(),
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
) => {
  return new Date(year, month - 1, day).getDay();
};
