function DifferenceSymmetrical (arrA = [], arrB = []) {
  return arrA.filter((x) => !arrB.includes(x)).concat(arrB.filter((x) => !arrA.includes(x)))
}

function Intersection (arrA = [], arrB = []) {
  return arrA.filter((x) => arrB.includes(x))
}

function Difference (arrA = [], arrB = []) {
  const difference = arrA.filter((x) => !arrB.includes(x))
  return difference
}

function ShowPropertiesFromArrayOfObjects (arr = [], properties = []) {
  return arr.map((i) => {
    const newItem = {}
    // eslint-disable-next-line array-callback-return
    Object.keys(i).map((key) => {
      if (properties.includes(key)) {
        return (newItem[key] = i[key])
      }
    })
    return newItem
  })
}

function excludePropertiesFromArrayOfObjects (arr = [], properties = []) {
  return arr.map((i) => {
    const newItem = {}
    // eslint-disable-next-line array-callback-return
    Object.keys(i).map((key) => {
      if (!properties.includes(key)) {
        newItem[key] = i[key]
      }
    })
    return newItem
  })
}

export {
  Difference,
  DifferenceSymmetrical,
  Intersection,
  ShowPropertiesFromArrayOfObjects,
  excludePropertiesFromArrayOfObjects
}
