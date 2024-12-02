import { readInput } from '../../lib';

export const parseInput = (input: string) => {
  return input.split('\n').reduce(
    (acc, row) => {
      const [num1, num2] = row.split('   ');
      acc[0].push(+num1);
      acc[1].push(+num2);
      return acc;
    },
    [[], []] as [number[], number[]]
  );
};

const solve1 = (idLists: [number[], number[]]) => {
  const [list1, list2] = idLists.map((list) => list.sort((a, b) => a - b));

  let cummulativeDistance = 0;

  list1.forEach((num, i) => {
    cummulativeDistance += Math.abs(num - list2[i]);
  });

  return cummulativeDistance;
};

const solve2 = ([list1, list2]: [number[], number[]]) => {
  const appearanceDictionary = list2.reduce((acc: number[], num) => {
    if (typeof acc[num] !== 'number') {
      acc[num] = 1;
      return acc;
    }

    acc[num] += 1;
    return acc;
  }, []);
  let similarityScore = 0;

  list1.forEach((num) => {
    similarityScore += (appearanceDictionary[num] ?? 0) * num;
  });
  return similarityScore;
};

console.log(solve2(parseInput(await readInput(import.meta.dir))));
