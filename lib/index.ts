export const readInput = async (folder: string, fileName = 'input.txt') => {
  const file = Bun.file(Bun.resolveSync(`./${fileName}`, folder));

  return await file.text();
};
