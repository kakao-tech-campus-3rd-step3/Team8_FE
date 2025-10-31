export const getSafeDate = (date: Date | null) =>
  date ? date.toISOString().split('.')[0] : new Date().toISOString().split('.')[0];

export const getDateDisplay = ({ startTime, endTime }: { startTime: string; endTime: string }) => {
  const startDate = new Date(getSafeDate(new Date(startTime))).getDate().toString();
  const endDate = new Date(getSafeDate(new Date(endTime))).getDate().toString();

  return startDate === endDate ? startDate : `${startDate}~${endDate}`;
};

export const toLocalISOString = (date: Date | null) => {
  if (!date) date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('.')[0];
};
