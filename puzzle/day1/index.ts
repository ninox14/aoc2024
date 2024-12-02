const readInput = async () => {
  const file = Bun.file(Bun.resolveSync('./input.txt', import.meta.dir));

  return await file.text();
};

const parseInput = (input: string) => {
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

const solve = (idLists: [number[], number[]]) => {
  const [list1, list2] = idLists.map((list) => list.sort((a, b) => a - b));

  let cummulativeDistance = 0;

  list1.forEach((num, i) => {
    cummulativeDistance += Math.abs(num - list2[i]);
  });

  return cummulativeDistance;
};

console.log(solve(parseInput(await readInput())));
