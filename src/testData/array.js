// 1.  将数组 `[ 1, 2, 3, 4, 5 ]` 转换为 `[ 'a1', 'a2', 'a3', 'a4', 'a5' ]`；

function changeItem1(arr){
	return arr.map(item=>'a'+item)
}

let c1 = changeItem1([ 1, 2, 3, 4, 5 ])
console.log(c1)


// 2.  将数组 `[ 1, 2, 3, 4, 5 ]` 转换为 `[ 'a1', 'b2', 'c3', 'd4', 'e5' ]`；

function changeItem2(arr){
	return arr.map((item,index)=>String.fromCharCode(97+index)+item)
}
let c2 = changeItem2([ 1, 2, 3, 4, 5 ])
console.log(c2)


// 3.  将数组 `[ 1, 2, 3, 4, 5 ]` 转换为 `[ 1, 4, 9, 16, 25 ]`；
function changeItem3(arr){
	return arr.map(item=>Math.pow(item,2))
}
let c3 = changeItem3([ 1, 2, 3, 4, 5 ])
console.log(c3)

// 4.  查询 JavaScript 中 `Array.prototype.map` 方法的详细文档，并将数组 `[ 0, 0, 0, 0, 0 ]` 转换为 `[ 'A', 'B', 'C', 'D', 'E' ]`；
function changeItem4(arr){
	
}
let c4 = changeItem4([ 1, 2, 3, 4, 5 ])
console.log(c4)


// 5.  提取数组 `[ 1, 2, 3, 4, 5 ]` 中的 `[ 2, 3, 4 ]`。
function changeItem5(arr){
	return arr.filter(item=>item>1&&item<5)
}
let c5 = changeItem5([ 1, 2, 3, 4, 5 ])
console.log(c5)


