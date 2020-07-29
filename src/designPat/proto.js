// 原型模式 编程范式 
// 原型？类？

class Dog {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    eat() {
        console.log('肉骨头真好吃')
    }
}

// 等价于

function Dog(name, age) {
    this.name = name
    this.age = age
}

Dog.prototype.eat = function() {
    console.log('肉骨头真好吃')
}


// 对象的深拷贝

// 1.JSON.stringify() +J SON.parse()

// 2.递归，注意边界问题
function deepClone(obj) {
    // 1.判断空
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    // 2.定义输出
    let copy = {}
    // 3.判断数组
    if (obj.constructor === Array) {
        copy = []
    }
    // 4.遍历 递归
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key])
        }
    }
    return copy;
}
