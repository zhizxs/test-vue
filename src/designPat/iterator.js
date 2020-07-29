// 迭代器

// for of

let arr = [1, 2, 3]

let iterator = arr[Symbol.iterator]()

// 初始化一个迭代结果
let now = { done: false }

while (!now.donw) {
    now = iterator.next()
    if (!now.done) {
        console.log(`现在遍历到了${now.value}`)
    }
}


// 实现一个迭代器

function iteratorGenerator(list){
	var idx = 0;
	var len = list.length;

	return function (){
		let done = idx>=len
		var value = !done ? list[idx++] : undefined

		return {
			done:done,
			value:value
		}

	}


}
