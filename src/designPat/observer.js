// 观察者模式
// **发布者直接触及到订阅者**

// 发布-订阅模式
// 必须经由事件中心，禁止一切“私下交易”！
// 
class Publisher {
    constructor() {
        this.observer = []
    }


    addObserver(obr) {
        this.observer.push(obr)
    }

    removeObserver(obr) {
        this.observer.some((item, i) => {
            if (item === obr) {
                this.observer.splice(i, 1)
            }
        })
    }

    notify() {
        this.observer.forEach(item => {
            observer.update(this)
        })
    }

}

class Observer {
    update() {
        console.log('更新啦！')
    }
}



// 实现Vuex核心功能
// observe方法遍历并包装对象属性
function vObserver(target) {
    if (target && typeof target === 'object') {
        Object.keys(target).forEach(key => {
            // defineReactive方法会给目标属性装上“监听器”
            defineReactive(target, key, val)
        })
    }
}

const defineReactive = (target, key, val) => {
    const dep = new Dep()
    // 属性值也可能是object类型，这种情况下需要调用observe进行递归遍历
    observe(val)
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get() {
            return val;
        },
        // 监听器函数
        set(value) {
            console.log(`${target}属性的${key}属性从${val}值变成了了${value}`)
            val = value
            dep.notify()
        }
    })
}

class Dep {
    constructor() {
        // 初始化订阅队列
        this.subs = []
    }

    addObserver(obv) {
        this.subs.push(obv)
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }

}

// EventEmitter

class EventEmitter {
    constructor() {
        // handlers是一个map，用于存储事件与回调之间的对应关系
        this.handlers = {}
    }

    // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
    on(eventName, cb) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = []
        }
        this.handlers[eventName].push(cb)
    }

    // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
    emit(eventName, ...arg) {
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach(handler => {
                handler(...args)
            })
        }
    }

    // 移除某个事件回调队列里的指定回调函数
    off(eventName, cb) {
        let callbacks = this.handlers[eventName]
        let index = callbacks.indexOf(cb)
        if (index !== -1) {
            callbacks.splice(index, 1)
        }
    }

    // 为事件注册单次监听器
    once(eventName,cb){
    	const wraper = (...args)=>{
    		cb.apply(...args)
    		this.off(eventName,cb)
    	}

    	this.on(eventName,wrapper)

    }
}
