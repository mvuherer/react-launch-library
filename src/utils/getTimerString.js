export default (ms) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysMs = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysMs / (60 * 60 * 1000));
  const hoursMs = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursMs / (60 * 1000));
  const minutesMs = ms % (60 * 1000);
  const seconds = Math.floor(minutesMs / 1000);

  return `${days}D ${hours.toString().padStart(2, '0')}H ${minutes
    .toString()
    .padStart(2, '0')}M ${seconds.toString().padStart(2, '0')}S`;
};
