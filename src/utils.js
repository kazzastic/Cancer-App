export const normalizeSeries = series => {
  const min = Math.min.apply(Math, series);
  const max = Math.max.apply(Math, series);
  return series.map(x => Number(Number((x - min) / (max - min)).toFixed(2)));
};
