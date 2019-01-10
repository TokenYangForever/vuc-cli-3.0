/**
 * 
 * @param arr 数字类型的从小到大的有序数组
 * @param target 目标数字
 * @return 返回目标所对应的下标，查询失败返回0
 */
const binarySearch = (arr: [number], target: number) : number => {
  let left: number = 0
  let right: number = arr.length - 1
  while(left <= right) {
    let tempIndex: number = Math.floor((right - left)/2)
    let temp: number = arr[tempIndex]
    if (temp === target) {
      return tempIndex
    } else if (temp > target) {
      right = tempIndex - 1
    } else {
      left = tempIndex + 1
    }
  }
  return -1
}