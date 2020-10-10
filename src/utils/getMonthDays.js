export default (month = new Date().getMonth() + 1, year = new Date().getFullYear()) => {
  return new Date(year, month, 0).getDate();
};
