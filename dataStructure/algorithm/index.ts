function test(array: number[], target: number) {
  const map = {}
  const resultArray:number[] = []
  array.forEach((index, value) => map.set(value, index))
  const { length } = array
  for(let index = 0; index < length; index++) {
    const targetValue = target - array[index]
    if(map['targetValue'] !== undefined) {
      resultArray.push(index)
      resultArray.push(map.get(targetValue)!)
    }
  }
  return resultArray
}

test([2,4,6,9], 13)