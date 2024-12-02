import { readInput } from '../../lib';

const pareseInput = (input: string) => {
  return input.split('\n').map((row) => row.split(' ').map((a) => +a));
};

const solve = (reports: number[][]) => {
  let safeReports = 0;
  reports.forEach((report) => {
    let isIncreasing = report[report.length - 1] < report[report.length - 2];
    let isSafe = true;
    for (let i = report.length; i >= 0; i--) {
      const [curr, next] = [report[i], report[i - 1]];
      const diff = Math.abs(curr - next);
      if (diff > 3 || curr === next) {
        isSafe = false;
        break;
      }

      if (curr > next && isIncreasing) {
        isSafe = false;
        break;
      }
      if (curr < next && !isIncreasing) {
        isSafe = false;
        break;
      }
    }
    if (isSafe) {
      safeReports++;
    }
  });
  return safeReports;
};

console.log(solve(pareseInput(await readInput(import.meta.dir))));
