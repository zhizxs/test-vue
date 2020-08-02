/**
 
箭头函数的this指向第一次包裹的函数；多次bind，this指向第一个bind;

闭包，间接访问函数内部变量


 */


// 手写promise

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function myPromise(fn) {
    const that = this;
    that.state = PENDING;
    that.value = null;
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []

    function resolve(val) {
        // if(that.state === PENDING){
        // 	that.value = val;
        // 	that.state = RESOLVED;
        // 	that.resolvedCallbacks.forEach(cb=>cb(val))
        // }
        if (val instanceof myPromise) {
            return val.then(resolve, reject)
        }

        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = RESOLVED
                that.value = value
                that.resolvedCallbacks.forEach(cb => cb(that.value))
            }
        }, 0)
    }

    function reject(val) {
        // if(that.state === PENDING){
        // 	that.value = val;
        // 	that.state = REJECTED;
        // 	that.rejectedCallbacks.forEach(cb=>cb(val))
        // }
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = REJECTED
                that.value = value
                that.rejectedCallbacks.forEach(cb => cb(that.value))
            }
        }, 0)
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}


myPromise.prototype.then = function(onFulfilled, onRejected) {
    // 判断类型 不符合要求重新赋值
    const that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : v => { throw v };

    if (that.state === PENDING) {
        // that.resolvedCallbacks.push(onFulfilled)
        // that.rejectedCallbacks.push(onRejected)

    }

    if (that.state === RESOLVED) {
        onFulfilled(that.value)
    }

    if (that.state === REJECTED) {
        onRejected(that.value)
    }

}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
}).then(value => {
    console.log(value)
})


// 实现一个栈
// 先进后出

class Stack {
    constructor() {
        this.stack = []
    }

    push(item) {
        this.stack.push(item)
    }

    pop() {
        this.stack.pop(item)
    }

    peek() {
        return this.stack[this.getCount - 1]
    }

    getCount() {
        return this.stack.length
    }

    isEmpty() {
        return this.getCount === 0
    }
}

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。


function isVaild(str) {
    let map = {
        '(': -1,
        ')': 1,
        '[': -2,
        ']': 2,
        '{': -3,
        '}': 3
    }

    let stack = []

    for (let i = 0; i < str.length; i++) {
        let value = map[str[i]]
        if ( < 0) {
            stack.push(value)
        } else {
            let last = stack.pop()

            if (map + value !== 0) {
                return false;
            }
        }
    }
    if (stack.length > 0) return false
    return true
}


// 队列
// 单链队列 O(n)

class Queue {

    constructor() {
        this.queue = []
    }

    enQueue(item) {
        this.queue.push(item)
    }

    deQueue() {
        return this.queue.shift()
    }

    getHeader() {
        return this.queue[0]
    }

    getLength() {
        return this.queue.length
    }

    isEmpty() {
        return this.getLength() === 0
    }


}




// 循环队列


class SqQueue {

    constructor(length) {
        this.queue = new Array(length + 1)
        this.first = 0
        this.last = 0
        this.size = 0
    }

    // 增加
    enQueue(item) {
        // 判断队尾 + 1 是否为队头
        // 如果是就代表需要扩容数组
        // % this.queue.length 是为了防止数组越界

        if (this.first === (this.last + 1) % this.queue.length) {
            this.resize(this.getLength() * 2 + 1)
        }

        this.queue[this.last] = item
        this.size++
        this.last = (this.last + 1) % this.queue.length
    }

    deQueue() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }

        let r = this.queue[this.first]

        this.queue[this.first] = null

        this.first = (this.first + 1) * this.queue.length

        this.size--;

        // 判断当前队列大小是否过小
        // 为了保证不浪费空间，在队列空间等于总长度四分之一时
        // 且不为 2 时缩小总长度为当前的一半

        if (this.size === this.getLength() / 4 && this.getLength() % 2 !== 0) {
            this.resize(this.getLength() / 2)
        }

        return r;
    }

    getHeader() {
        if (this.isEmpty()) {
            throw Error('Queue is empty')
        }

        return this.queue[this.first]
    }

    getLength() {
        return this.queue.length - 1
    }

    isEmpty() {
        return this.first === this.last
    }

    resize(length) {
        let q = new Array(length)

        for (let i = 0; i < length; i++) {
            q[i] = this.queue[(i + this.first) % this.queue.length]
        }

        this.first = 0;
        this.queue = q;
        this.last = this.size;

    }
}


// 单链表

class Node {
    constructor(value, next) {
        this.value = value
        this.next = next

    }
}

class LinkList {
    constructor() {
        this.size = 0
        this.dummyNode = new Node(null, null)
    }

    // 查找
    find(header, index, currentIndex) {
        if (index === currentIndex) return header;
        return this.find(header.next, index, currentIndex + 1)
    }
    addNode(v, index) {
        this.checkIndex(index)
        // 当往链表末尾插入时，prev.next 为空
        // 其他情况时，因为要插入节点，所以插入的节点
        // 的 next 应该是 prev.next
        // 然后设置 prev.next 为插入的节点
        let prev = this.find(this.dummyNode, index, 0)
        prev.next = new Node(v, index)
        this.size++;
        return prev.next
    }

    insertNode(v, index) {
        return this.addNode(v, index)
    }

    addToFirst(v) {
        return this.addNode(v, 0)
    }

    addToLast(v) {
        return this.addNode(v, this.size)
    }

    removeNode(index, isLast) {
        this.checkIndex(index)

        index = isLast ? index - 1 : index

        let prev = this.find(this.dummyNode, index, 0)

        let node = prev.next

        prev.next = node.next;

        node.next = null;

        this.size--;

        return node;

    }

    removeFirstNode() {
        return this.removeNode(0)
    }
    removeLastNode() {
        return this.removeNode(this.size, true)
    }

    checkIndex(index) {
        if (index < 0 || index > this.size) throw Error('Index error')
    }
    getNode(index) {
        this.checkIndex(index)
        if (this.isEmpty()) return
        return this.find(this.dummyNode, index, 0).next
    }
    isEmpty() {
        return this.size === 0
    }
    getSize() {
        return this.size
    }

}


// 树的搜索 二分搜索

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}


class BST {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    getSize() {
        return this.size
    }

    isEmpty() {
        return this.size === 0
    }

    addNode(v) {
        this.root = this._addChild(this.root, v)
    }

    // 添加节点时，需要比较添加的节点值和当前
    // 节点值的大小
    _addChild(node, v) {
        if (!node) {
            this.size++
            return new Node(v)
        }

        if (node.value > v) {
            node.left = this._addChild(node.left, v)
        } else if (node.value < v) {
            node.right = this._addChild(node.right, v)
        }

        return node;
    }
}


// 深度遍历

// 先序遍历可用于打印树的结构
// 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
preTraversal() {
  this._pre(this.root)
}
_pre(node) {
  if (node) {
    console.log(node.value)
    this._pre(node.left)
    this._pre(node.right)
  }
}
// 中序遍历可用于排序
// 对于 BST 来说，中序遍历可以实现一次遍历就
// 得到有序的值
// 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
midTraversal() {
  this._mid(this.root)
}
_mid(node) {
  if (node) {
    this._mid(node.left)
    console.log(node.value)
    this._mid(node.right)
  }
}
// 后序遍历可用于先操作子节点
// 再操作父节点的场景
// 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
backTraversal() {
  this._back(this.root)
}
_back(node) {
  if (node) {
    this._back(node.left)
    this._back(node.right)
    console.log(node.value)
  }
}


// 广度遍历

breadthTraversal() {
  if (!this.root) return null
  let q = new Queue()
  // 将根节点入队
  q.enQueue(this.root)
  // 循环判断队列是否为空，为空
  // 代表树遍历完毕
  while (!q.isEmpty()) {
    // 将队首出队，判断是否有左右子树
    // 有的话，就先左后右入队
    let n = q.deQueue()
    console.log(n.value)
    if (n.left) q.enQueue(n.left)
    if (n.right) q.enQueue(n.right)
  }
}


// AVL
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.height = 1
  }
}

class AVL {
  constructor() {
    this.root = null
  }
  addNode(v) {
    this.root = this._addChild(this.root, v)
  }
  _addChild(node, v) {
    if (!node) {
      return new Node(v)
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v)
    } else if (node.value < v) {
      node.right = this._addChild(node.right, v)
    } else {
      node.value = v
    }
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    let factor = this._getBalanceFactor(node)
    // 当需要右旋时，根节点的左树一定比右树高度高
    if (factor > 1 && this._getBalanceFactor(node.left) >= 0) {
      return this._rightRotate(node)
    }
    // 当需要左旋时，根节点的左树一定比右树高度矮
    if (factor < -1 && this._getBalanceFactor(node.right) <= 0) {
      return this._leftRotate(node)
    }
    // 左右情况
    // 节点的左树比右树高，且节点的左树的右树比节点的左树的左树高
    if (factor > 1 && this._getBalanceFactor(node.left) < 0) {
      node.left = this._leftRotate(node.left)
      return this._rightRotate(node)
    }
    // 右左情况
    // 节点的左树比右树矮，且节点的右树的右树比节点的右树的左树矮
    if (factor < -1 && this._getBalanceFactor(node.right) > 0) {
      node.right = this._rightRotate(node.right)
      return this._leftRotate(node)
    }

    return node
  }
  _getHeight(node) {
    if (!node) return 0
    return node.height
  }
  _getBalanceFactor(node) {
    return this._getHeight(node.left) - this._getHeight(node.right)
  }
  // 节点右旋
  //           5                    2
  //         /   \                /   \
  //        2     6   ==>       1      5
  //       /  \               /       /  \
  //      1    3             new     3    6
  //     /
  //    new
  _rightRotate(node) {
    // 旋转后新根节点
    let newRoot = node.left
    // 需要移动的节点
    let moveNode = newRoot.right
    // 节点 2 的右节点改为节点 5
    newRoot.right = node
    // 节点 5 左节点改为节点 3
    node.left = moveNode
    // 更新树的高度
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    newRoot.height =
      1 +
      Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))

    return newRoot
  }
  // 节点左旋
  //           4                    6
  //         /   \                /   \
  //        2     6   ==>       4      7
  //             /  \         /   \      \
  //            5     7      2     5      new
  //                   \
  //                    new
  _leftRotate(node) {
    // 旋转后新根节点
    let newRoot = node.right
    // 需要移动的节点
    let moveNode = newRoot.left
    // 节点 6 的左节点改为节点 4
    newRoot.left = node
    // 节点 4 右节点改为节点 5
    node.right = moveNode
    // 更新树的高度
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
    newRoot.height =
      1 +
      Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))

    return newRoot
  }
}























