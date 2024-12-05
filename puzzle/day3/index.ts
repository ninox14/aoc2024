import { readInput } from "../../lib"

const testInput = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const testInput2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

const solve1 = (input: string) => {
  const regex = /mul\((\d+),(\d+)\)/gi
  const matches = input.matchAll(regex)
  let acc = 0
  for (const match of matches) {
    acc += +match[1] * +match[2]
  }
  return acc
}
const solve2 = (input: string) => {
  const [dos, dont] = ['do()', "don't()"] as const
  let str = input
  let acc = 0
  let isLastIncluded = true
  console.log(str)
  while (str.length > 0) {
    if (!isLastIncluded) {
      const idxDo = str.indexOf(dos)
      const slice = str.slice(0, idxDo > -1 ? idxDo + dos.length : str.length)
      str = str.replace(slice, '')
      isLastIncluded = true
      continue
    }
    const idxoDnt = str.indexOf(dont)
    const slice = str.slice(0, idxoDnt > -1 ? idxoDnt + dont.length : str.length)
    acc += solve1(slice)
    str = str.replace(slice, '')
    isLastIncluded = false
  }
  return acc
}

// console.log(solve1(await readInput(import.meta.dir)))
console.log(solve2(await readInput(import.meta.dir)))