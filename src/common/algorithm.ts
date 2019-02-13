/**
 * 二分查找
 * @param arr 数字类型的从小到大的有序数组
 * @param target 目标数字
 * @return 返回目标所对应的下标，查询失败返回 -1
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
/**
 * 01背包算法 基本思路：遍历出一个二维数组，V[i][j]表示容量为j时，在i个物品中放入的最高价值
 * @param v 物品价值 [3, 4, 5, 6]
 * @param w 物品重量 [2, 3, 4, 5]
 * @param capacity 背包容量 8
 */
function bagsProblem(v:number[], w:number[], capacity:number) :number {
  v = [0, ...v]
  w = [0, ...w]
	let number = v.length
	let V = new Array(number)
	for (let ii = 0; ii < number; ii++) {
		V[ii] = new Array(capacity + 1)
	}
	for (let i = 0; i < number;i++) {
		for(let j = 0; j <= capacity;j++) {
			if (i === 0 || j === 0) {
				V[i][j] = 0
				continue
			}
			if (j < w[i]) {
				// 容量为j时装不下第i个物品了
				V[i][j] = V[i-1][j]
			} else {
				// 能装的情况，比较容量为j时，不装第i个的最优价值，和装了第i个的最优价值
				V[i][j] = Math.max(V[i-1][j], V[i-1][j-w[i]]+v[i])
			}
		}
	}
	return V[number - 1][capacity]
}
/**
 * 快速排序，以一个数为基准，大于它的归入right数组，小于它的归于left数组；right、left分别再继续递归调用quickSort，最后结果concat为一个数组
 * @param arr 带排列数组
 */
function quickSort (arr: number[]): number[] {
  const l = arr.length
  if(l < 2) return arr
  const basic = arr[0], left = [], right = []
  for(let i = 1; i < l; i++) {
    const iv = arr[i]
    iv >= basic && right.push(iv) // to avoid repeatly element.
    iv < basic && left.push(iv)
  }
  return quickSort(left).concat(basic, quickSort(right))
}