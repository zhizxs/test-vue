// proxy 代理模式
// 以前见于 网页元素点击事件

// 未知妹子
const girl = {
    // 姓名
    name: '小美',
    // 自我介绍
    aboutMe: '...',
    // 年龄
    age: 24,
    // 职业
    career: 'teacher',
    // 假头像
    fakeAvatar: 'xxxx',
    // 真实头像
    avatar: 'xxxx',
    // 手机号
    phone: 123456,
}

// 规定礼物的数据结构由type和value组成
const present = {
    type: '巧克力',
    value: 60,
}



// 普通私密信息
const baseInfo = ['age', 'career']
// 最私密信息
const privateInfo = ['avatar', 'phone']

// 用户（同事A）对象实例
const user = {
    isValidated: true,
    isVIP: false,
}


const lover = new Proxy(girl, {
    get(girl, key) {
        if (baseInfo.indexOf(key) !== -1 && !user.isValidated) {
            alert('去认证吧')
            return；
        }


        if (privateInfo.indexOf(key) !== -1 && user.isValidated && !user.isVIP) {
            alert('赶紧去充值vip吧！')
            return;
        }
    }

    set(girl, key, val) {
        // 最近一次送来的礼物会尝试赋值给lastPresent字段
        if (key === 'lastPresent') {
            if (val.value < girl.bottomValue) {
                alert('sorry，您的礼物被拒收了')
                return
            }

            // 如果没有拒收，则赋值成功，同时并入presents数组
            girl[lastPresent] = val
            girl[presents] = [...presents, val]
        }
    }
})

// 事件代理 DOM + addEventListener

// 虚拟代理实现图片预加载
// 根据 单一责任 
// 1.设置图片
class PreLoadImage {
    constructor(imgNode) {
        // 获取真实的DOM节点
        this.imgNode = imgNode
    }
    // 设置节点
    setImgSrc(src) {
        this.imgNode.src = src
    }
}

// 2. 下载图片

class ProxyImage {
    // 站位图片URL
    static LOADING_URL = 'xxx'

    constructor(targetImage) {
        this.targetImage = targetImage
    }
    // 该方法主要操作虚拟Image，完成加载
    setSrc(targetUrl) {
        // 真实img节点初始化时展示的是一个占位图
        this.targetImage.setSrc(ProxyImage.LOADING_URL)
        // 创建一个帮我们加载图片的虚拟Image实例
        const virtualImage = new Image()
        // 监听目标图片加载的情况，完成时再将DOM上的真实img节点的src属性设置为目标图片的url
        virtualImage.onload = () => {
            this.targetImage.setSrc(targetUrl)
        }
        // 设置src属性，虚拟Image实例开始加载图片
        virtualImage.src = targetUrl
    }
}


// 缓存代理，空间换时间
// 其实就是利用闭包进行的函数记忆

// addAll方法会对你传入的所有参数做求和操作
const addAll = function() {
    console.log('进行了一次新计算')
    let result = 0
    const len = arguments.length
    for(let i = 0; i < len; i++) {
        result += arguments[i]
    }
    return result
}


// 为求和方法创建代理
const proxyAddAll = (function(){

  const resultCache = {}

  return function (){
      // 作为 key
      const args = Array.prototype.join.call(arguments,',')
      
      return (resultCache[args]||resultCache[args] = addAll(...arguments))
  }

})()



