// 将创建对象的过程单独封装，可以无脑传参了...
// 有 构造函数 的地方，就要想到工厂模式
// 简单工厂

function User (name,age,career,work) {
	this.name = name
	this.age = age
	this.career = career
	this.work = work
}

function Factory(name,age,career){
	let wroks = {
		coder:['写代码','写系分', '修Bug'] ,
		'product manager': ['订会议室', '写PRD', '催更'],
		boss:['喝茶', '看报', '见客户']
	}

	return new User(name,age,career,works[career])
}


// 当以上出现权限分级，或者角色新增的时候，是直接修改原来的方法吗？
// 会带来过多的工作，测试需要重新测？
// 涉及原则：
// 对拓展开放，对修改封闭。软件实体（类、模块、函数）可以扩展，但是不可修改
// 
// 抽象工厂

// 该类定义一个规则 ，并不是直接生成实例
// 这个就是顶端的抽象工厂
// 抽象工厂 定规则  （不干活）
class MobilePhoneFactory {
	// 提供操作系统的接口
    createOS(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
    // 提供硬件的接口
    createHardWare(){
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！");
    }
}

// 具体工厂 继承子抽象工厂
// 具体工厂 来干活

class FakeStarFactory extends MobilePhoneFactory{
	createOS() {
        // 提供安卓系统实例
        return new AndroidOS()
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}


// 抽象产品类
// 定义操作系统这类产品的抽象产品类
class OS {
    controlHardWare() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件')
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件')
    }
}


// 定义手机硬件这类产品的抽象产品类
class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder() {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
    }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转')
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转')
    }
}



// 使用 
// 
// 这是我的手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardWare = myPhone.createHardWare()
// 启动操作系统(输出‘我会用安卓的方式去操作硬件’)
myOS.controlHardWare()
// 唤醒硬件(输出‘我会用高通的方式去运转’)
myHardWare.operateByOrder()

// 此时 再新增一个手机，是不会影响已有的功能 
// **对原有的系统不会造成任何潜在影响**，对修改关闭

class newStarFactory extends MobilePhoneFactory {
    createOS() {
        // 操作系统实现代码
        return new AppleOS()
        // 
    }
    createHardWare() {
        // 硬件实现代码
        return new QualcommHardWare()
    }
}





