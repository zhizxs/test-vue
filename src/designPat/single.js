// 单例模式
// 保证一个类仅有一个实例，并提供一个访问它的全局访问点
// 其实就是多次调用的时候，还是会给你返回第一次创建的类
// 构造函数需要存在 监测功能 『是否已经创建了一个实例』

class SingleDog {
    show() {
        console.log('我是一个单例对象')
    }
    static getInstance() {
        // 判断是否已经new过1个实例
        if (!SingleDog.instance) {
            // 若这个唯一的实例不存在，那么先创建它
            SingleDog.instance = new SingleDog()
        }
        // 如果这个唯一的实例已经存在，则直接返回
        return SingleDog.instance
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()

// true
// s1 === s2

// 闭包实现
SingleDog.getInstance = (()=>{
	let instance = null;
	return function (){
		if(!instance){
			instance = new SingleDog()
		}
		return instance
	}
})()

// VUEX 保持 store 的一致性

let Vue;

// ...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}

// vuex为什么需要单列？
// 后面不小心再安装会覆盖前面的数据

// 实现 storage

class Storage {
	static getInstance(){
		if(!Storage.instance){
			Storage.instance = new Storage()
		}
		return Storage.instance;
	}

	setItem(key,val){
		localStorage.setItem(key,val)
	}

	getItem(key){
		return localStorage.getItem(key)
	}

}

let st1 = Storage.getInstance()
st1.setItem('a',1)

// 闭包版
function StorageBase(){}

StorageBase.prototype.setItem = (key,val)=>{
	localStorage.setItem(key,val)
}

StorageBase.prototype.getItem = key=>{
	localStorage.getItem(key)
}

const storage  = (function(){
	let instance;
	return function (){
		if(!instance){
			instance = new StorageBase()
		}
		return instance;
	}
})()


const s1 = storage()

s1.setItem('b',2)




