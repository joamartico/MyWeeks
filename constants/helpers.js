// export function getDocName(DATE) {
//     if (time == 'weeks') return DATE.toString();
//     if (time == 'Months') return `${DATE.year}-${DATE.month}`;
//     if (time == 'Years') return DATE.year.toString();
//     if (time == 'Five Years') return `${DATE.year}-${DATE.year + 5}`;
//     if (time == 'Ten Years') return `${DATE.year}-${DATE.year + 10}`;
//   }

export function convertToUnix(month, day, year, time) {
  return (new Date(month + '/' + day + '/' + year + ' ' + time).getTime() / 1000).toFixed(0);
}
