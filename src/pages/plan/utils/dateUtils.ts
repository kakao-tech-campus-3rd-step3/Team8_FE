export const getSafeDate = (date: Date | null) =>
  date ? date.toISOString().split('.')[0] : new Date().toISOString().split('.')[0];

export const getDateDisplay = ({ startTime, endTime }: { startTime: string; endTime: string }) => {
  const startDate = new Date(startTime).getDate();
  const endDate = new Date(endTime).getDate();
  return startDate === endDate ? `${startDate}` : `${startDate}~${endDate}`;
};
