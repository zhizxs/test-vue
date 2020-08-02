// 排序算法

function checkArray(arr) {
    return Array.isArray(arr)
}

function swap(arr, left, right) {
    arr[left] = [arr[right], (arr[right] = arr[left])][1]
}

/**
 * 冒泡排序
 * 从第一个元素开始，把当前元素和下一个索引元素进行比较。
 * 如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时最后一个元素就是该数组中最大的数。
 * 计算次数是 n+(n-1)+(n-2)+...+1 的等差数列
 * 去掉常数，复杂度 O(n*n)
 * 
 */

function bubble(array) {
    if (!checkArray(array)) return
    let len = array.length
    for (let i = 1; i < len; i++) {
        for (let j = 1; j < len - 1; j++) {
            if (array[j] > array[j + 1]) {
                // array[j] = [array[j+1],(array[j+1] = array[j])][0]
                swap(array, i, j)
            }
        }
    }
    return array;
}

/**
 * 插入排序
 * 第一个元素默认是已排序元素，取出下一个元素和当前元素比较，如果当前元素大就交换位置。
 * 
 */

function insertion(array) {
    if (!checkArray(array)) return
    let len = array.length
    for (let i = 1; i < len; i++) {
        for (let j = len - 1; j > 0 && array[j] > array[j + 1]; j--) {
            swap(array, i, j)
        }
    }
}


/**
 * 选择排序
 * 遍历数组，设置最小值的索引为 0，如果取出的值比当前最小值小，就替换最小值索引，
 * 遍历完成后，将第一个元素和最小值索引上的值交换
 * 
 */

function selection(array) {
    if (!checkArray(array)) return
    let len = array.length
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < len; j++) {
            minIndex = array[minIndex] > array[j] ? j : minIndex
        }
        swap(array, i, minIndex);
    }

    return array;
}

/**
 * 归并排序
 * 分治算法
 * 递归的将数组两两分开直到最多包含两个元素，然后将数组排序合并，最终合并为排序好的数组。
 * 
 */

function sort(array) {
    if (!checkArray(array)) return
    mergeSort(array, 0, array.length - 1);
    return array;
}

function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return;
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1));
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);

  let help = [];
  let i = 0;
  let p1 = left;
  let p2 = mid + 1;
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while (p1 <= mid) {
    help[i++] = array[p1++];
  }
  while (p2 <= right) {
    help[i++] = array[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i];
  }
  return array;
}

/**
 * 快速排序
 * 随机选取一个数组中的值作为基准值，从左至右取值与基准值对比大小。
 * 比基准值小的放数组左边，大的放右边，对比完成后将基准值和第一个比基准值大的值交换位置。
 * 然后将数组以基准值的位置分为两部分，继续递归以上操作。
 * 
 */


function qsort(array) {
  if (!checkArray(array)) return
  quickSort(array, 0, array.length - 1);
  return array;
}

function quickSort(array, left, right) {
  if (left < right) {
    swap(array, left, right)
    // 随机取值，然后和末尾交换，这样做比固定取一个位置的复杂度略低
    let indexs = part(array, parseInt(Math.random() * (right - left + 1)) + left, right);
    quickSort(array, left, indexs[0]);
    quickSort(array, indexs[1] + 1, right);
  }
}
function part(array, left, right) {
  let less = left - 1;
  let more = right;
  while (left < more) {
    if (array[left] < array[right]) {
      // 当前值比基准值小，`less` 和 `left` 都加一
	   ++less;
       ++left;
    } else if (array[left] > array[right]) {
      // 当前值比基准值大，将当前值和右边的值交换
      // 并且不改变 `left`，因为当前换过来的值还没有判断过大小
      swap(array, --more, left);
    } else {
      // 和基准值相同，只移动下标
      left++;
    }
  }
  // 将基准值和比基准值大的第一个值交换位置
  // 这样数组就变成 `[比基准值小, 基准值, 比基准值大]`
  swap(array, right, more);
  return [less, more];
}



// 斐波那契
// 0，1，1，2，3，5，8，13，21，34，55，89....
// 递归
function fib(num){
	if(num<2&&num>=0) return num;
	return fib(num-1)+fib(num-2)
}

function xhFib(n){
	let val1=0,
	val2=1;
	for(let i=1;i<n;i++){
		val2 = [(val1+val2),(val1=val2)][0]
	}
	return val2;
}
// console.log(fib(30))
// console.log(xhFib(30))







