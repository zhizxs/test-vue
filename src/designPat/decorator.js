// 装饰器
// 被装饰者交给装饰器
// 类装饰器
function classDecorator(target) {
    target.hasDecorator = true
    return target
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}

// 方法装饰器
// 修饰的是实例
// target  此处变成 `Button.prototype`，即类的原型对象。
// name 修饰的目标属性属性名
// descriptor 对象属性描述 类似 Object.defineProperty(obj, prop, descriptor)
function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function() {
    console.log('我是Func的装饰器逻辑')
    return originalMethod.apply(this, arguments)
  }
  return descriptor
}

class Button {
    @funcDecorator
    onClick() { 
        console.log('我是Func的原有逻辑')
    }
}   

// 方法装饰器参数说明？
// 装饰器函数执行的时候，Button 实例还并不存在。这是因为实例是在我们的代码**运行时**动态生成的，
// 而装饰器函数则是在**编译阶段**就执行了。所以说装饰器函数真正能触及到的，就只有类这个层面上的对象。
