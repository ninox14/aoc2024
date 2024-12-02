import { readInput } from '../../lib';

const parseInput = (input: string) => {
  return input.split('\n').map((row) => row.split(' ').map((a) => +a));
};

const checkReport = (report: number[]) => {
  const isIncreasing = report[0] < report[report.length - 1];
  for (let i = 0; i < report.length - 1; i++) {
    const [curr, next] = [report[i], report[i + 1]];

    const diff = Math.abs(curr - next);
    if (diff > 3 || curr === next) {
      return i;
    }
    if (curr > next && isIncreasing) {
      return i;
    }
    if (curr < next && !isIncreasing) {
      return i;
    }
  }
  return -1;
};

const solve1 = (reports: number[][]) => {
  let safeReports = 0;
  reports.forEach((report) => {
    if (checkReport(report) === -1) {
      safeReports++;
    }
  });
  return safeReports;
};

const solve2 = (reports: number[][]) => {
  let safeReports = 0;
  const corr: number[][] = [];
  reports.forEach((report) => {
    let index = checkReport(report);
    if (index >= 0) {
      for (let k = 0; k < report.length; k++) {
        const copy = [...report];
        copy.splice(k, 1);
        index = checkReport(copy);
        if (index == -1) {
          // console.log('dampener',k,  l1, safe)
          break;
        }
      }
    }
    if (index < 0) {
      safeReports++;
      corr.push(report);
    }
  });
  return [safeReports, corr] as const;
};

console.log(solve2(parseInput(await readInput(import.meta.dir))));
